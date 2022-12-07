import { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShowing } from "../../../../API/Hooks/useShowing";
import { fetchEmojiList } from "../../../../Redux/EmojiRedux/EmojiReducer";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import "./EmojiCount.css";
import EmojiCountSkeleton from "./EmojiCountSkeleton/EmojiCountSkeleton";
import ModalReviewAdd from "./ModalReviewAdd/ModalReviewAdd";

const EmojiCount: FC<any> = (props) => {
  // Init
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userReducer: any = useAppSelector((state) => state.userReducer);
  const emojiReducer: any = useAppSelector((state) => state.emojiReducer);
  const emojiList = emojiReducer.list;

  const { restaurant } = props;
  const [emojiSelected, setEmojiSelected] = useState({});
  const [isShowModal, toggleModal] = useShowing();
  // End init

  useEffect(() => {
    dispatch(fetchEmojiList(restaurant.id));
  }, [dispatch, restaurant]);

  const handleSelectEmoji = (emoji: any) => {
    if (!userReducer.userData?.id) return navigate("/login");

    setEmojiSelected(emoji);
    toggleModal();
  };

  if (emojiReducer.isLoading) return <EmojiCountSkeleton />;

  return (
    <div className={"emoji-count"}>
      {emojiList.map((emoji: any) => {
        return (
          <div
            key={emoji.id}
            className={"emoji-count-item"}
            onClick={() => handleSelectEmoji(emoji)}
          >
            <span className={"emoji-icon"}>{emoji.icon}</span>
            <span className={"emoji-count"}>{emoji.emojiCount}</span>
          </div>
        );
      })}
      <ModalReviewAdd
        isShowing={isShowModal}
        handleClose={toggleModal}
        restaurant={restaurant}
        emoji={emojiSelected}
      />
    </div>
  );
};

export default memo(EmojiCount);
