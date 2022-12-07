import { FC, memo } from "react";
import Loading from "../Loading/Loading";
import "./Button.css";

const Button: FC<any> = (props) => {
  const defaultOption = {
    type: props.type ?? "normal",
    onClick: props.onClick ?? null,
    disabled: props.disabled ?? false,
    loading: props.loading ?? false,
  };

  return (
    <button
      className={`btn ${defaultOption.type}`}
      onClick={defaultOption.onClick}
      disabled={defaultOption.disabled || defaultOption.loading}
    >
      {defaultOption.loading ? <Loading /> : null}
      {props.children}
    </button>
  );
};

export default memo(Button);
