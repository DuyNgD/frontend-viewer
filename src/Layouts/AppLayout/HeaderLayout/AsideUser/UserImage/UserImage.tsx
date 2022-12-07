import { ChangeEvent, FC, memo } from "react";
import {
  API_MEDIA_FIND_BY_ID,
  API_MEDIA_INSERT,
  API_USER_UPDATE,
} from "../../../../../API/APIs";
import { useShowing } from "../../../../../API/Hooks/useShowing";
import Label from "../../../../../Components/Label/Label";
import ModalPhoto from "../../../../../Components/Photo/ModalPhoto/ModalPhoto";
import Photo from "../../../../../Components/Photo/Photo";
import { request, requestFile } from "../../../../../Constants/Constants";
import { useAppDispatch } from "../../../../../Redux/hooks";
import { fetchUserData } from "../../../../../Redux/UserRedux/UserReducer";
import "./UserImage.css";

const UserImage: FC<any> = ({ userData, accessToken }) => {
  // Init
  const dispatch = useAppDispatch();
  const [isShowModal, toggleModal, innerRef] = useShowing();
  // End init

  const handleUploadMedia = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files?.length) return;

    const [file]: any = event.target.files;

    let formData = new FormData();
    formData.append("file", file);

    requestFile({
      url: API_MEDIA_INSERT,
      method: "POST",
      accessToken: accessToken,
      body: formData,
    }).then((resData) => {
      const [imageId] = resData.data;

      request({
        url: API_USER_UPDATE,
        method: "PUT",
        accessToken: accessToken,
        body: { ...userData, image: imageId.value },
      }).then(() => {
        dispatch(fetchUserData(userData.id));
      });
    });
  };

  return (
    <div className={"user-image"}>
      <Photo
        type={"image"}
        src={API_MEDIA_FIND_BY_ID + userData?.image}
        name={"UserImage"}
      />
      <div className={"user-image-nav"}>
        <div className={"nav-item"} onClick={toggleModal}>
          Xem ảnh
        </div>
        <div className={"nav-item"}>
          <Label htmlFor={"user-image"}>Tải ảnh lên</Label>
          <input
            id={"user-image"}
            type={"file"}
            accept={".png, .jpg, .jpeg"}
            value={""}
            onChange={handleUploadMedia}
          />
        </div>
      </div>
      <ModalPhoto
        isShowing={isShowModal}
        handleClose={toggleModal}
        innerRef={innerRef}
        photo={{
          type: "image",
          id: userData?.image,
          name: "UserImage",
        }}
      />
    </div>
  );
};

export default memo(UserImage);
