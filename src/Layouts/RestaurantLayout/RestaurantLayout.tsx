import { FC, memo, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Article from "../../Components/Article/Article";
import { request } from "../../Constants/Constants";
import { resetEmojiList } from "../../Redux/EmojiRedux/EmojiReducer";
import { useAppDispatch } from "../../Redux/hooks";
import { resetReviewList } from "../../Redux/ReviewRedux/ReviewReducer";
import Layout from "../Layout";
import * as APIs from "./../../API/APIs";
import RestaurantInfo from "./RestaurantInfo/RestaurantInfo";
import "./RestaurantLayout.css";
import RestaurantLayoutSkeleton from "./RestaurantLayoutSkeleton/RestaurantLayoutSkeleton";
import RestaurantNav from "./RestaurantNav/RestaurantNav";
import ReviewList from "./ReviewList/ReviewList";

const RestaurantLayout: FC<any> = () => {
  // Init
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [restaurant, setRestaurant] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // End init

  // Reset restaurant layout data
  useLayoutEffect(() => {
    dispatch(resetEmojiList());
    dispatch(resetReviewList());
  }, [dispatch]);

  useEffect(() => {
    request({
      url: APIs.API_RESTAURANT_FIND_BY_ID + id!,
      method: "GET",
    }).then((resData) => {
      setRestaurant(resData.data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <RestaurantLayoutSkeleton />;

  return (
    <Layout>
      <Article className={"restaurant-layout"}>
        <div className={"restaurant-review-list"}>
          <RestaurantNav restaurant={restaurant} />
          <ReviewList restaurant={restaurant} />
        </div>
        <div className={"restaurant-info-side"}>
          <RestaurantInfo restaurant={restaurant} />
        </div>
      </Article>
    </Layout>
  );
};

export default memo(RestaurantLayout);
