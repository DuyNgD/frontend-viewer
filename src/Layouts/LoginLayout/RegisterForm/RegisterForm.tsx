import jwtDecode from "jwt-decode";
import { ChangeEvent, FC, memo, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_USER_REGISTER } from "../../../API/APIs";
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
import "./RegisterForm.css";

const RegisterForm: FC<any> = (props) => {
  // Init
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState<any>({
    username: "",
    password: "",
    rePassword: "",
    isSubmitLoading: false,
  });
  const [errors, setErrors] = useState<any>(null);
  // End init

  useLayoutEffect(() => {
    setValues({
      username: "",
      password: "",
      rePassword: "",
      isSubmitLoading: false,
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
    if (!values.rePassword) {
      setErrors({ rePassword: "Mật khẩu nhập lại không được trống" });
      return false;
    }
    if (values.password !== values.rePassword) {
      setErrors({
        password: "Mật khẩu không đúng",
        rePassword: "Mật khẩu nhập lại không đúng",
      });
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
        url: API_USER_REGISTER,
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
          setValues((prevValues: any) => ({
            ...prevValues,
            isSubmitLoading: false,
          }));
        });
    }
  };

  return (
    <div className={"register-form"}>
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
          <Input
            id={"rePassword"}
            name={"rePassword"}
            type={"password"}
            label={"Nhập lại mật khẩu:"}
            placeholder={"Nhập lại mật khẩu"}
            value={values.rePassword}
            onChange={handleInputChange}
            error={errors?.rePassword}
          />
          <Button onClick={handleSubmit} loading={values.isSubmitLoading}>
            Đăng ký
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default memo(RegisterForm);
