import { FC, memo } from "react";
import RestaurantLayout from "../../Layouts/RestaurantLayout/RestaurantLayout";
import "./RestaurantPage.css";

const RestaurantPage: FC<any> = () => {
  return <RestaurantLayout />;
};

export default memo(RestaurantPage);
