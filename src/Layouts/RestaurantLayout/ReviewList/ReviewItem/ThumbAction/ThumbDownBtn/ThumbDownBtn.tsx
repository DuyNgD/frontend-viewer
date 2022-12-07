import { FC, memo, useLayoutEffect, useState } from "react";
import "./ThumbDownBtn.css";

const ThumbDownBtn: FC<any> = (props) => {
  // Init
  const { review, thumbAction } = props;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // End init

  useLayoutEffect(() => {
    setIsLiked(review.userIsLiked === 2);
  }, [review]);

  return (
    <div
      className={`item-thumb-btn ${isLiked ? "isLiked" : ""}`}
      onClick={() => thumbAction(2)}
    >
      {review?.dislikeCount}&nbsp;👎
    </div>
  );
};

export default memo(ThumbDownBtn);
