import { ChangeEvent, FC, memo, useLayoutEffect, useState } from "react";
import { API_MEDIA_INSERT, API_REVIEW_INSERT } from "../../../../../API/APIs";
import Button from "../../../../../Components/Button/Button";
import Form from "../../../../../Components/Form/Form";
import Input from "../../../../../Components/Form/Input/Input";
import Modal from "../../../../../Components/Modal/Modal";
import ModalBody from "../../../../../Components/Modal/ModalBody/ModalBody";
import ModalFooter from "../../../../../Components/Modal/ModalFooter/ModalFooter";
import ModalHeader from "../../../../../Components/Modal/ModalHeader/ModalHeader";
import Space from "../../../../../Components/Space/Space";
import { request, requestFile } from "../../../../../Constants/Constants";
import { fetchEmojiList } from "../../../../../Redux/EmojiRedux/EmojiReducer";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hooks";
import { fetchReviewList } from "../../../../../Redux/ReviewRedux/ReviewReducer";
import "./ModalReviewAdd.css";

const ModalReviewAdd: FC<any> = (props) => {
  // Init
  const userReducer = useAppSelector((state) => state.userReducer);
  const userData: any = userReducer.userData;

  const dispatch = useAppDispatch();

  const { restaurant, emoji } = props;
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>(null);
  // End init

  useLayoutEffect(() => {
    setValues({
      restaurant: restaurant.id,
      comment: "",
      media: [],
      emoji: emoji.value,
      confirm: false,
      isSubmitLoading: false,
    });
  }, [props, emoji, restaurant.id, userData?.id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files?.length) return;

    const files = event.target.files;
    const images: any = values.media;

    for (let i = 0; i < Math.min(5, files.length); i++) {
      images.unshift(files[i]);

      if (images.length > 5) images.pop();
    }

    setValues((prevValues: any) => ({
      ...prevValues,
      media: images,
    }));
  };

  const handleRemoveFile = (file: File) => {
    const gallery: File[] = values.media.filter(
      (photo: File) => photo !== file
    );

    setValues((prevValues: any) => ({
      ...prevValues,
      media: gallery,
    }));
  };

  const handleReviewConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      confirm: event.target.checked,
    }));
  };

  const handleUploadFile = (reviewId: string) => {
    let formData = new FormData();
    formData.append("review", reviewId);

    for (let i = 0; i < values.media.length; i++) {
      formData.append("file", values.media[i]);
    }

    return requestFile({
      url: API_MEDIA_INSERT,
      method: "POST",
      accessToken: userReducer.accessToken,
      body: formData,
    });
  };

  const validateForm = () => {
    setErrors(null);

    if (!values.comment) {
      setErrors({ comment: "Review không được bỏ trống" });
      return false;
    }
    for (let i = 0; i < values.media.length; i++) {
      if (values.media[i].size > 104857600) {
        setErrors({
          media: "Kích thước hình ảnh hoặc video phải nhỏ hơn 100mb",
          file: values.media[i],
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setValues((prevValues: any) => ({
        ...prevValues,
        isSubmitLoading: true,
      }));

      request({
        url: API_REVIEW_INSERT,
        method: "POST",
        accessToken: userReducer.accessToken,
        body: { ...values },
      })
        .then((resReview) => {
          if (values.media.length === 0) {
            dispatch(fetchEmojiList(restaurant.id));
            dispatch(fetchReviewList(restaurant.id));
            props.handleClose();
          } else {
            handleUploadFile(resReview.data.id).then((resFile) => {
              dispatch(fetchEmojiList(restaurant.id));
              dispatch(fetchReviewList(restaurant.id));
              props.handleClose();
            });
          }
        })
        .catch(() => {
          setValues((prevValues: any) => ({
            ...prevValues,
            isSubmitLoading: false,
          }));
        });
    }
  };

  return (
    <Modal
      isShowing={props.isShowing}
      handleClose={props.handleClose}
      innerRef={props.innerRef}
    >
      <ModalHeader>
        <strong>
          {emoji.label}
          &nbsp;
          {emoji.icon}
        </strong>
      </ModalHeader>
      <ModalBody>
        <Form className={"form-preview-add"}>
          <Input
            id={"comment"}
            label={"Review:"}
            suffix={<span className={"required"}>(Bắt buộc)</span>}
            name={"comment"}
            type={"textarea"}
            placeholder={"Mình viết review ở đây nha"}
            value={values.comment}
            onChange={handleInputChange}
            error={errors?.comment}
          />
          <Input
            id={"file"}
            label={"Hình ảnh hoặc video:"}
            type={"file"}
            accept={".png, .jpg, .jpeg, .mp4"}
            multiple
            files={values.media}
            onChange={handleChangeFile}
            handleRemoveFile={handleRemoveFile}
            error={errors?.media}
            errorFile={errors?.file}
          />
          <Input
            className={"horizontal-reverse"}
            id={"previewConfirm"}
            label={"Tôi chịu trách nhiệm về tính xác thực của nội dung."}
            type={"checkbox"}
            onChange={handleReviewConfirm}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Space gap={0.5}>
          <Button
            disabled={!(values.comment?.length > 0 && values.confirm)}
            loading={values.isSubmitLoading}
            onClick={handleSubmit}
          >
            Đăng review
          </Button>
          <Button type="grey" onClick={props.handleClose}>
            Hủy
          </Button>
        </Space>
      </ModalFooter>
    </Modal>
  );
};

export default memo(ModalReviewAdd);
