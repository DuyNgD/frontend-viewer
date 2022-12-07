import { FC, memo } from "react";
import Article from "../../../Components/Article/Article";
import "./RestaurantLayoutSkeleton.css";

const RestaurantLayoutSkeleton: FC<any> = () => {
  // Init
  // End init

  return (
    <Article className={"restaurant-layout-skeleton"}>
      <div className={"restaurant-review-list"}>
        <div className={"restaurant-nav"}>
          <div className={"skeleton skeleton-text"} />
          <div className={"skeleton skeleton-text"} />
        </div>
      </div>
      <div className={"restaurant-info-side"}>
        <div className={"restaurant-info"}>
          <div className={"restaurant-info-header"}>
            <div className={"restaurant-image skeleton"} />
            <div className={"skeleton skeleton-text"} />
          </div>
          <div className={"restaurant-info-body"}>
            <div className={"skeleton skeleton-text"} />
            <div className={"skeleton skeleton-text"} />
            <div className={"skeleton skeleton-text"} />
            <div className={"skeleton skeleton-text"} />
            <div className={"skeleton skeleton-text"} />
          </div>
        </div>
      </div>
    </Article>
  );
};

export default memo(RestaurantLayoutSkeleton);
