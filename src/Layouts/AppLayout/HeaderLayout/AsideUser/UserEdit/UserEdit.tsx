import { ChangeEvent, FC, memo, useLayoutEffect, useState } from "react";
import { API_USER_UPDATE } from "../../../../../API/APIs";
import Button from "../../../../../Components/Button/Button";
import Form from "../../../../../Components/Form/Form";
import Input from "../../../../../Components/Form/Input/Input";
import { regexEmail, request } from "../../../../../Constants/Constants";
import { useAppDispatch } from "../../../../../Redux/hooks";
import { fetchUserData } from "../../../../../Redux/UserRedux/UserReducer";
import "./UserEdit.css";

const UserEdit: FC<any> = ({ userData, accessToken, onCancel }) => {
  // Init
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<any>(userData);
  const [errors, setErrors] = useState<any>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  // End init

  useLayoutEffect(() => {
    setValues(userData);
  }, [userData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    setErrors(null);

    if (values.name && values.name.length > 20) {
      setErrors({ name: "Tối đa 20 ký tự" });
      return false;
    }
    if (values.email && !regexEmail(values.email)) {
      setErrors({ email: "Email không hợp lệ. Vd: abc@abc.com" });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitLoading(true);

      request({
        url: API_USER_UPDATE,
        method: "PUT",
        accessToken: accessToken,
        body: { ...values },
      }).then(() => {
        dispatch(fetchUserData(values.id));
        setIsSubmitLoading(false);
        onCancel();
      });
    }
  };

  return (
    <div className={"user-edit"}>
      <Form>
        <Input
          id={"name"}
          name={"name"}
          label={"Biệt danh:"}
          placeholder={"Biệt danh tùy thích"}
          value={values?.name ?? ""}
          onChange={handleInputChange}
          error={errors?.name}
        />
        <Input
          id={"phone"}
          name={"phone"}
          label={"Số điện thoại:"}
          placeholder={"Số điện thoại"}
          value={values?.phone ?? ""}
          onChange={handleInputChange}
          error={errors?.phone}
        />
        <Input
          id={"email"}
          name={"email"}
          label={"Email:"}
          type={"email"}
          placeholder={"Email"}
          value={values?.email ?? ""}
          onChange={handleInputChange}
          error={errors?.email}
        />
      </Form>
      <Button onClick={handleSubmit} loading={isSubmitLoading}>
        Cập nhật
      </Button>
      <Button type="grey" onClick={onCancel}>
        Hủy
      </Button>
    </div>
  );
};

export default memo(UserEdit);
