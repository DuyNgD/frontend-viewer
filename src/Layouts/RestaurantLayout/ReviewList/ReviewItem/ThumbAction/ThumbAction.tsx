import { FC, Fragment, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_REVIEW_FIND_BY_ID,
  API_REVIEW_FIND_BY_REVIEW_AND_USER_ID,
  API_REVIEW_LIKE_INSERT
} from "../../../../../API/APIs";
import Loading from "../../../../../Components/Loading/Loading";
import { request } from "../../../../../Constants/Constants";
import { useAppSelector } from "../../../../../Redux/hooks";
import "./ThumbAction.css";
import ThumbDownBtn from "./ThumbDownBtn/ThumbDownBtn";
import ThumbUpBtn from "./ThumbUpBtn/ThumbUpBtn";

const ThumbAction: FC<any> = ({ reviewData, handleUpdateReviewData }) => {
  // Init
  const navigate = useNavigate();
  const userReducer = useAppSelector((state) => state.userReducer);
  const userData = userReducer.userData;

  const [isThumbLoading, setIsThumbLoading] = useState<boolean>(false);
  // End init

  const handleThumbAction = (action: number) => {
    if (!userReducer.userData?.id) return navigate("/login");

    setIsThumbLoading(true);

    const urlRequest = userData?.id
      ? API_REVIEW_FIND_BY_REVIEW_AND_USER_ID +
        reviewData.id +
        "/" +
        userData?.id
      : API_REVIEW_FIND_BY_ID + reviewData.id;

    request({
      url: API_REVIEW_LIKE_INSERT,
      method: "POST",
      accessToken: userReducer.accessToken,
      body: { review: reviewData.id, isLike: action },
    }).then(() => {
      request({
        url: urlRequest,
        method: "GET",
      }).then((resReview) => {
        handleUpdateReviewData(resReview.data);
        setIsThumbLoading(false);
      });
    });
  };

  return (
    <Fragment>
      {isThumbLoading ? (
        <div className={"thumb-loading"}>
          <Loading />
        </div>
      ) : null}
      <ThumbUpBtn review={reviewData} thumbAction={handleThumbAction} />
      <ThumbDownBtn review={reviewData} thumbAction={handleThumbAction} />
    </Fragment>
  );
};

export default memo(ThumbAction);
