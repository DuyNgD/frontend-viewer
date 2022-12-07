import { FC, memo } from "react";
import "./InputSelect.css";

const InputSelect: FC<any> = (props) => {
  const renderOptions = () => {
    return props.options.map((opt: any) => {
      return (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      );
    });
  };

  return <select {...props.defaultOption}>{renderOptions()}</select>;
}

export default memo(InputSelect);
