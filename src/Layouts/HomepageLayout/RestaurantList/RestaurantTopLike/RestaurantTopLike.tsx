import { FC, Fragment, memo, useEffect, useState } from "react";
import { API_RESTAURANT_LIST_TOP_LIKE } from "../../../../API/APIs";
import { request } from "../../../../Constants/Constants";
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import RestaurantItemSkeleton from "../RestaurantItemSkeleton/RestaurantItemSkeleton";
import "./RestaurantTopLike.css";

const RestaurantTopLike: FC<any> = () => {
  // Init
  const [restaurantList, setRestaurantList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // End init

  useEffect(() => {
    request({
      url: API_RESTAURANT_LIST_TOP_LIKE,
      method: "GET",
    }).then((resData) => {
      setRestaurantList(resData.data);
      setIsLoading(false);
    });
  }, []);

  const renderRestaurantList = () => {
    if (isLoading) return <RestaurantItemSkeleton />;

    return restaurantList?.map((restaurant: any) => {
      return (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          emojiCount={restaurant.emojiIcon + " " + restaurant.emojiCount}
        />
      );
    });
  };

  return <Fragment>{renderRestaurantList()}</Fragment>;
};

export default memo(RestaurantTopLike);
