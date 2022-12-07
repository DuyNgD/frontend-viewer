import { FC, memo } from "react";
import "./Space.css";

const Space: FC<any> = (props) => {
  const defaultStyle = {
    gap: props.gap + "rem" ?? null,
    flexDirection: props.direction ?? "row",
  };

  return (
    <div className="space" style={defaultStyle}>
      {props.children}
    </div>
  );
};

export default memo(Space);
