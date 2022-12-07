import jwtDecode from "jwt-decode";
import { createElement, FC, Fragment, memo, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Main from "../../Components/Main/Main";
import { Cookies } from "../../Constants/Constants";
import { MyToken } from "../../Constants/Interface";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import { useAppDispatch } from "../../Redux/hooks";
import {
  fetchUserData,
  setAccessToken,
  userLogout,
} from "../../Redux/UserRedux/UserReducer";
import * as ConstantsRoute from "../../Route/Route";
import "./AppLayout.css";
import HeaderLayout from "./HeaderLayout/HeaderLayout";

const AppLayout: FC<any> = (props) => {
  // Init
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // End init

  useEffect(() => {
    const accessToken = Cookies.getCookie("accessToken");

    if (accessToken) {
      try {
        const decoded = jwtDecode<MyToken>(accessToken);

        dispatch(setAccessToken(accessToken));
        dispatch(fetchUserData(decoded.data.id));
      } catch (error: any) {
        dispatch(userLogout(null));
      }
    } else {
      dispatch(userLogout(null));
    }
  }, [dispatch, navigate]);

  if (location.pathname === ConstantsRoute.ROUTE_LOGIN_PAGE.route)
    return <LoginPage {...props} {...ConstantsRoute.ROUTE_LOGIN_PAGE} />;

  return (
    <Fragment>
      <Header>
        <HeaderLayout />
      </Header>
      <Main>
        <Routes>
          {ConstantsRoute.ROUTE_LIST.map((r) => {
            return (
              <Route
                key={r.path}
                path={r.path}
                element={createElement(r.component, { ...r.props })}
              />
            );
          })}
        </Routes>
      </Main>
      <Footer></Footer>
    </Fragment>
  );
};

export default memo(AppLayout);
