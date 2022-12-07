import { FC, Fragment, memo, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../../Components/Article/Article";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import LoginForm from "./LoginForm/LoginForm";
import "./LoginLayout.css";
import RegisterForm from "./RegisterForm/RegisterForm";

const LoginLayout: FC<any> = () => {
  // Init
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.userReducer);
  const userData = userReducer.userData;

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoginError, setIsLoginError] = useState<boolean>(false);
  // End init

  useLayoutEffect(() => {
    if (userData?.id) return navigate("/");
  }, [dispatch, userData?.id, navigate]);

  const handleToggleNav = () => {
    setIsLogin(!isLogin);
    setIsLoginError(false);
  };

  const renderForm = () => {
    if (isLogin) {
      return (
        <Fragment>
          <div className={"login-title"}>Đăng nhập vào Review Hàng Quán</div>
          {renderLoginError()}
          <LoginForm handleLoginError={setIsLoginError} />
          <div className={"login-nav"}>
            Chưa có tài khoản?&nbsp;
            <span className={"nav-btn"} onClick={handleToggleNav}>
              Tạo tài khoản
            </span>
          </div>
        </Fragment>
      );
    } else
      return (
        <Fragment>
          <div className={"login-title"}>
            Đăng ký tài khoản Review Hàng Quán
          </div>
          <RegisterForm />
          <div className={"login-nav"}>
            Đã có tài khoản?&nbsp;
            <span className={"nav-btn"} onClick={handleToggleNav}>
              Đăng nhập
            </span>
          </div>
        </Fragment>
      );
  };

  const renderLoginError = () => {
    if (!isLoginError) return null;

    return (
      <div className={"login-error"}>
        <strong>Không thể đăng nhập</strong>
        <span>
          Nếu bạn chưa có tài khoản bạn có thể chọn{" "}
          <span className={"nav-btn"} onClick={handleToggleNav}>
            Tạo tài khoản.
          </span>
        </span>
        <span>
          Hoặc liên hệ qua email <span className={"nav-btn"}>...</span> nếu bạn
          đang gặp vấn đề về tài khoản của bạn.
        </span>
      </div>
    );
  };

  return <Article className={"login-layout"}>{renderForm()}</Article>;
};

export default memo(LoginLayout);
