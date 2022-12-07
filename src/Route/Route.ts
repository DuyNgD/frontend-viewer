import Homepage from "../Pages/Homepage/Homepage";
import RestaurantPage from "../Pages/RestaurantPage/RestaurantPage";
import LoginPage from "../Pages/LoginPage/LoginPage";

export const ROUTE_HOMEPAGE = {
  route: "/",
  pageName: "Homepage",
};
export const ROUTE_RESTAURANT_PAGE = {
  route: "/:id",
  pageName: "Restaurant Page",
};
export const ROUTE_LOGIN_PAGE = {
  route: "/login",
  pageName: "Login",
};

export const ROUTE_LIST = [
  {
    path: ROUTE_HOMEPAGE.route,
    exact: true,
    props: {
      pageName: ROUTE_HOMEPAGE.pageName,
    },
    component: Homepage,
  },
  {
    path: ROUTE_RESTAURANT_PAGE.route,
    exact: true,
    props: {
      pageName: ROUTE_RESTAURANT_PAGE.pageName,
    },
    component: RestaurantPage,
  },
  {
    path: ROUTE_LOGIN_PAGE.route,
    exact: true,
    props: {
      pageName: ROUTE_LOGIN_PAGE.pageName,
    },
    component: LoginPage,
  },
];
