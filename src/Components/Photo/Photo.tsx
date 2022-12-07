import { FC, Fragment, memo, useState } from "react";
import "./Photo.css";

const Photo: FC<any> = (props) => {
  // Init
  const { type, src, name, onClick, controls } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // End init

  const handleMediaLoaded = () => {
    setIsLoading(false);
  };

  const renderMedia = () => {
    if (type === "video/mp4")
      return (
        <video
          className={"photo"}
          onClick={onClick}
          controls={controls ?? false}
        >
          <source src={src} type={"video/mp4"} onLoad={handleMediaLoaded} />
        </video>
      );

    return (
      <img
        style={{ display: isLoading ? "none" : "block" }}
        className={"photo"}
        src={src}
        alt={name}
        onClick={onClick}
        onLoad={handleMediaLoaded}
      />
    );
  };

  return (
    <Fragment>
      {isLoading && <div className={"photo skeleton"} />}
      {renderMedia()}
    </Fragment>
  );
};

export default memo(Photo);
