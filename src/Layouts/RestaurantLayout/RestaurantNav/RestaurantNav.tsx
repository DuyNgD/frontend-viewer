import { FC, memo } from "react";
import EmojiCount from "./EmojiCount/EmojiCount";
import "./RestaurantNav.css";

const RestaurantNav: FC<any> = (props) => {
  const { restaurant } = props;

  return (
    <div className={"restaurant-nav"}>
      <h1 className={"navigation-title"}>Review {restaurant.name}</h1>
      <EmojiCount restaurant={restaurant} />
    </div>
  );
};

export default memo(RestaurantNav);
