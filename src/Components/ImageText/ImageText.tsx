import { FC, memo } from "react";
import Photo from "../Photo/Photo";
import "./ImageText.css";

const ImageText: FC<any> = (props) => {
  return (
    <div className={"image-text"}>
      <span className={"image-text-image"}>
        <Photo type={"image"} src={props.src} name={"ImageText"} />
      </span>
      <span className={`image-text-text ${props.textBold ? "bold" : ""}`}>
        {props.text}
      </span>
    </div>
  );
};

export default memo(ImageText);
