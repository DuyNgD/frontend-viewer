import { FC, memo, useLayoutEffect, useState } from "react";
import "./ThumbUpBtn.css";

const ThumbUpBtn: FC<any> = (props) => {
  // Init
  const { review, thumbAction } = props;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // End init

  useLayoutEffect(() => {
    setIsLiked(review.userIsLiked === 1);
  }, [review.userIsLiked]);

  return (
    <div
      className={`item-thumb-btn ${isLiked ? "isLiked" : ""}`}
      onClick={() => thumbAction(1)}
    >
      {review?.likeCount}&nbsp;👍
    </div>
  );
};

export default memo(ThumbUpBtn);
