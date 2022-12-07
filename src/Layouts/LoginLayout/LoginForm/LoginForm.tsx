import jwtDecode from "jwt-decode";
import { ChangeEvent, FC, memo, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_USER_LOGIN } from "../../../API/APIs";
import Button from "../../../Components/Button/Button";
import Form from "../../../Components/Form/Form";
import Input from "../../../Components/Form/Input/Input";
import Space from "../../../Components/Space/Space";
import {
  Cookies,
  hasSpecialChar,
  hasUpperCase,
  request
} from "../../../Constants/Constants";
import { MyToken } from "../../../Constants/Interface";
import { useAppDispatch } from "../../../Redux/hooks";
import { setAccessToken } from "../../../Redux/UserRedux/UserReducer";
import "./LoginForm.css";

const LoginForm: FC<any> = (props) => {
  // Init
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { handleLoginError } = props;
  const [values, setValues] = useState<any>({
    username: "",
    password: "",
    isSubmitLoading: false,
    isLoginError: false,
  });
  const [errors, setErrors] = useState<any>(null);
  // End init

  useLayoutEffect(() => {
    setValues({
      username: "",
      password: "",
      isSubmitLoading: false,
      isLoginError: false,
    });
  }, [props]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    setErrors(null);

    if (!values.username) {
      setErrors({ username: "Tên đăng nhập không được trống" });
      return false;
    }
    if (hasSpecialChar(values.username)) {
      setErrors({
        username: "Tên đăng nhập không chứa khoảng trắng, ký tự đặc biệt",
      });
      return false;
    }
    if (hasUpperCase(values.username)) {
      setErrors({ username: "Tên đăng nhập không viết hoa" });
      return false;
    }
    if (!values.password) {
      setErrors({ password: "Mật khẩu không được trống" });
      return false;
    }

    return true;
  };

  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (validateForm()) {
      setValues((prevValues: any) => ({
        ...prevValues,
        isSubmitLoading: true,
      }));

      request({
        url: API_USER_LOGIN,
        method: "POST",
        body: { ...values },
      })
        .then((resData) => {
          const decoded = jwtDecode<MyToken>(resData.data.accessToken);

          Cookies.setCookie(
            "accessToken",
            resData.data.accessToken,
            decoded.exp
          );
          dispatch(setAccessToken(resData.data.accessToken));
          navigate("/");
        })
        .catch((error) => {
          handleLoginError(true);

          setValues((prevValues: any) => ({
            ...prevValues,
            isSubmitLoading: false,
          }));
        });
    }
  };

  return (
    <div className={"login-form"}>
      <Form onSubmit={handleSubmit}>
        <Space gap={0.5} direction={"column"}>
          <Input
            id={"username"}
            name={"username"}
            label={"Tên đăng nhập:"}
            placeholder={"Tên đăng nhập"}
            value={values.username}
            onChange={handleInputChange}
            error={errors?.username}
          />
          <Input
            id={"password"}
            name={"password"}
            type={"password"}
            label={"Mật khẩu:"}
            placeholder={"Mật khẩu"}
            value={values.password}
            onChange={handleInputChange}
            error={errors?.password}
          />
          <Button onClick={handleSubmit} loading={values.isSubmitLoading}>
            Đăng nhập
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default memo(LoginForm);
