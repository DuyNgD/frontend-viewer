export const API_USER_LOGIN = process.env.REACT_APP_API + "/user/login";
export const API_USER_REGISTER = process.env.REACT_APP_API + "/user/register";
export const API_USER_LOGOUT = process.env.REACT_APP_API + "/user/logout";

export const API_USER_FIND_BY_ID =
  process.env.REACT_APP_API + "/user/selectById/";
export const API_USER_UPDATE = process.env.REACT_APP_API + "/user/update";

export const API_RESTAURANT_LIST_TOP_LIKE =
  process.env.REACT_APP_API + "/restaurant/selectAllTopLike";
export const API_RESTAURANT_LIST_TOP_REVIEW =
  process.env.REACT_APP_API + "/restaurant/selectAllTopReview";
export const API_RESTAURANT_LIST_TOP_DISLIKE =
  process.env.REACT_APP_API + "/restaurant/selectAllTopDislike";
export const API_RESTAURANT_FIND_BY_ID =
  process.env.REACT_APP_API + "/restaurant/selectById/";
export const API_RESTAURANT_FIND_BY_NAME =
  process.env.REACT_APP_API + "/restaurant/selectByName/";

export const API_REVIEW_LIST_BY_RESTAURANT_ID =
  process.env.REACT_APP_API + "/review/selectAllByRestaurantId/";
export const API_REVIEW_FIND_BY_ID =
  process.env.REACT_APP_API + "/review/selectById/";
export const API_REVIEW_FIND_BY_REVIEW_AND_USER_ID =
  process.env.REACT_APP_API + "/review/selectByReviewAndUserId/";
export const API_REVIEW_INSERT = process.env.REACT_APP_API + "/review/insert";

export const API_REVIEW_MEDIA_LIST_BY_REVIEW_ID =
  process.env.REACT_APP_API + "/reviewMedia/selectAllByReviewId/";

export const API_REVIEW_LIKE_INSERT =
  process.env.REACT_APP_API + "/reviewLike/insert";

export const API_MEDIA_INSERT = process.env.REACT_APP_API + "/media/insert";
export const API_MEDIA_FIND_BY_ID =
  process.env.REACT_APP_API + "/media/selectById/";

export const API_EMOJI_LIST_ALL_BY_RESTAURANT_ID =
  process.env.REACT_APP_API + "/emoji/selectAllByRestaurantId/";
