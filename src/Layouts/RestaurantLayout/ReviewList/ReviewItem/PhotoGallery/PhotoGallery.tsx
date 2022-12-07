import { FC, memo, useState } from "react";
import { API_MEDIA_FIND_BY_ID } from "../../../../../API/APIs";
import { useShowing } from "../../../../../API/Hooks/useShowing";
import ModalPhoto from "../../../../../Components/Photo/ModalPhoto/ModalPhoto";
import Photo from "../../../../../Components/Photo/Photo";
import "./PhotoGallery.css";

const PhotoGallery: FC<any> = (props) => {
  // Init
  const { gallery } = props;

  const [photo, setPhoto] = useState(null);
  const [isShowModal, toggleModal, innerRef] = useShowing();
  // End init

  const handleSelectPhoto = (photo: any) => {
    setPhoto(photo);

    toggleModal();
  };

  const renderMediaList = () => {
    return gallery?.map((photo: any) => {
      return (
        <span key={photo.id} className={"media"}>
          <Photo
            type={photo.type}
            src={API_MEDIA_FIND_BY_ID + photo.id}
            name={photo.name}
            onClick={() => handleSelectPhoto(photo)}
          />
        </span>
      );
    });
  };

  return (
    <div className={"photo-gallery"}>
      {renderMediaList()}
      <ModalPhoto
        isShowing={isShowModal}
        handleClose={toggleModal}
        innerRef={innerRef}
        gallery={gallery}
        photo={photo}
      />
    </div>
  );
};

export default memo(PhotoGallery);
