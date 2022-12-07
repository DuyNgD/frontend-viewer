import { FC, memo } from "react";
import "./EmojiCountSkeleton.css";

const EmojiCountSkeleton: FC<any> = () => {
  return (
    <div className={"emoji-count-skeleton"}>
      <div className={"skeleton skeleton-text"} />
    </div>
  );
};

export default memo(EmojiCountSkeleton);
