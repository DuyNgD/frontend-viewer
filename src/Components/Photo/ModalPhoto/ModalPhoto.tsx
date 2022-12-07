import { FC, memo, useLayoutEffect, useState } from "react";
import { API_MEDIA_FIND_BY_ID } from "../../../API/APIs";
import Photo from "../Photo";
import "./ModalPhoto.css";

const ModalPhoto: FC<any> = (props) => {
  // Init
  const { gallery } = props;
  const [photoSelected, setPhotoSelected] = useState<any>(null);
  // End init

  useLayoutEffect(() => {
    setPhotoSelected(props.photo);
  }, [props.photo]);

  const handleSelectPhoto = (photo: any) => {
    setPhotoSelected(photo);
  };

  const renderMedia = () => {
    return gallery.map((photo: any, idx: number) => {
      return (
        <span
          key={idx}
          className={"modal-photo-mini"}
          style={{ opacity: photo.id === photoSelected?.id ? "1" : "0.5" }}
        >
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

  return props.isShowing ? (
    <div className={"modal-photo"} ref={props.innerRef}>
      <span className={"btn-close"} onClick={props.handleClose}>
        ×
      </span>
      <div className={"modal-photo-item"}>
        <Photo
          type={photoSelected?.type}
          src={API_MEDIA_FIND_BY_ID + photoSelected?.id}
          name={photoSelected?.name}
          controls
        />
      </div>
      {gallery?.length > 1 ? (
        <div className={"modal-photo-list"}>{renderMedia()}</div>
      ) : null}
    </div>
  ) : null;
};

export default memo(ModalPhoto);
