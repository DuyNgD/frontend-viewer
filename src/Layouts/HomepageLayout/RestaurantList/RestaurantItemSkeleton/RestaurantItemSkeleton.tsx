import { FC, memo } from "react";
import "./RestaurantItemSkeleton.css";

const RestaurantItemSkeleton: FC<any> = () => {
  return (
    <div className={"restaurant-item"}>
      <div className={"item-name"}>
        <span className={"item-image skeleton"} />
        <div className={"skeleton skeleton-text"} />
      </div>
      <div className={"skeleton skeleton-text"} />
      <div className={"skeleton skeleton-text"} />
      <div className={"skeleton skeleton-text"} />
    </div>
  );
};

export default memo(RestaurantItemSkeleton);
