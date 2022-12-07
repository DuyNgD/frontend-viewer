import { FC, memo } from "react";
import Tab from "../../../Components/Tabs/Tab/Tab";
import Tabs from "../../../Components/Tabs/Tabs";
import "./RestaurantList.css";
import RestaurantTopDislike from "./RestaurantTopDislike/RestaurantTopDislike";
import RestaurantTopLike from "./RestaurantTopLike/RestaurantTopLike";
import RestaurantTopReview from "./RestaurantTopReview/RestaurantTopReview";

const RestaurantList: FC<any> = () => {
  // Init
  // End init

  return (
    <div className={"restaurant-list"}>
      <Tabs>
        <Tab name={"Quán được yêu thích"}>
          <RestaurantTopLike />
        </Tab>
        <Tab name={"Quán nhiều review"}>
          <RestaurantTopReview />
        </Tab>
        <Tab name={"Quán bị chê nhiều"}>
          <RestaurantTopDislike />
        </Tab>
      </Tabs>
    </div>
  );
};

export default memo(RestaurantList);
