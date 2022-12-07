import moment from "moment";
import "moment/locale/vi";
import { FC, memo, useEffect, useMemo, useState } from "react";
import {
  API_REVIEW_FIND_BY_ID,
  API_REVIEW_FIND_BY_REVIEW_AND_USER_ID,
  API_REVIEW_MEDIA_LIST_BY_REVIEW_ID,
} from "../../../../API/APIs";
import Article from "../../../../Components/Article/Article";
import { request } from "../../../../Constants/Constants";
import { useAppSelector } from "../../../../Redux/hooks";
import PhotoGallery from "./PhotoGallery/PhotoGallery";
import "./ReviewItem.css";
import ReviewItemSkeleton from "./ReviewItemSkeleton/ReviewItemSkeleton";
import ThumbAction from "./ThumbAction/ThumbAction";

const ReviewItem: FC<any> = (props) => {
  // Init
  const userReducer = useAppSelector((state) => state.userReducer);
  const userData = userReducer.userData;

  const { reviewId } = props;
  const [reviewData, setReviewData] = useState<any>(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // End init

  useEffect(() => {
    const urlRequest = userData?.id
      ? API_REVIEW_FIND_BY_REVIEW_AND_USER_ID + reviewId + "/" + userData?.id
      : API_REVIEW_FIND_BY_ID + reviewId;

    request({
      url: urlRequest,
      method: "GET",
    }).then((resReview) => {
      const review = resReview.data;
      setReviewData(review);

      request({
        url: API_REVIEW_MEDIA_LIST_BY_REVIEW_ID + review.id,
        method: "GET",
      }).then((resMedia) => {
        setImages(resMedia.data);
        setIsLoading(false);
      });
    });
  }, [reviewId, userData?.id, userData?.accessToken]);

  const Name = () => {
    return (
      <span className={"item-name"}>
        {reviewData?.userNickname
          ? reviewData.userNickname
          : reviewData?.username}
        &nbsp;
        {reviewData?.emojiIcon}
      </span>
    );
  };

  const Date = () => {
    return (
      <span className={"item-time"}>
        {moment.unix(reviewData?.created / 1000).fromNow()}
      </span>
    );
  };

  const memoizedGallery = useMemo(() => {
    if (images.length === 0) return null;

    return (
      <div className={"item-media"}>
        <PhotoGallery gallery={images} />
      </div>
    );
  }, [images]);

  const Comment = () => {
    return (
      <span className={"item-comment"}>
        <p>{reviewData?.comment}</p>
      </span>
    );
  };

  if (isLoading) return <ReviewItemSkeleton />;

  return (
    <Article className={"review-item"}>
      <div className={"review-item-header"}>
        <Name />
        <Date />
      </div>
      <div className={"review-item-body"}>
        {memoizedGallery}
        <Comment />
      </div>
      <div className={"review-item-footer"}>
        <ThumbAction
          reviewData={reviewData}
          handleUpdateReviewData={setReviewData}
        />
      </div>
    </Article>
  );
};

export default memo(ReviewItem);
