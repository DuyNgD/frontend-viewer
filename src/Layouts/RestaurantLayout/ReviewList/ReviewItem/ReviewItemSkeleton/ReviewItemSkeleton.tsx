import { FC, memo } from "react";
import Article from "../../../../../Components/Article/Article";
import "./ReviewItemSkeleton.css";

const ReviewItemSkeleton: FC<any> = () => {
  // Init
  // End init

  return (
    <Article className={"review-item"}>
      <div className={"review-item-header"}>
        <div className={"skeleton skeleton-text"} />
      </div>
      <div className={"review-item-body"}>
        <div className={"skeleton skeleton-text"} />
        <div className={"skeleton skeleton-text"} />
      </div>
      <div className={"review-item-footer"}>
        <div className={"skeleton skeleton-text"} />
      </div>
    </Article>
  );
};

export default memo(ReviewItemSkeleton);
