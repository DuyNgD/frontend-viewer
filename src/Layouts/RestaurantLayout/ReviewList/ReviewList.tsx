import { FC, memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { fetchReviewList } from "../../../Redux/ReviewRedux/ReviewReducer";
import ReviewItem from "./ReviewItem/ReviewItem";
import ReviewItemSkeleton from "./ReviewItem/ReviewItemSkeleton/ReviewItemSkeleton";
import "./ReviewList.css";

const ReviewList: FC<any> = (props) => {
  // Init
  const dispatch = useAppDispatch();
  const reviewReducer = useAppSelector((state) => state.reviewReducer);
  const reviewList = reviewReducer.list;

  const { restaurant } = props;
  // End init

  useEffect(() => {
    dispatch(fetchReviewList(restaurant.id));
  }, [dispatch, restaurant.id]);

  const renderReviewItem = () => {
    return reviewList.map((review: any) => {
      return <ReviewItem key={review.id} reviewId={review.id} />;
    });
  };

  if (reviewReducer.isLoading) return <ReviewItemSkeleton />;

  return <div className={"review-list"}>{renderReviewItem()}</div>;
};

export default memo(ReviewList);
