import { FC, memo } from "react";
import Label from "../../Label/Label";
import "./Input.css";
import InputCheckbox from "./InputCheckbox/InputCheckbox";
import InputDate from "./InputDate/InputDate";
import InputEmail from "./InputEmail/InputEmail";
import InputFile from "./InputFile/InputFile";
import InputPassword from "./InputPassword/InputPassword";
import InputSelect from "./InputSelect/InputSelect";
import InputText from "./InputText/InputText";
import InputTextarea from "./InputTextarea/InputTextarea";

const Input: FC<any> = (props) => {
  const defaultOption = {
    id: props.id ?? undefined,
    name: props.name ?? undefined,
    type: props.type ?? "text",
    placeholder: props.placeholder ?? "Nhập ở đây...",
    value: props.value ?? undefined,
    onChange: props.onChange ?? undefined,
    disabled: props.disabled ?? false,
    autoComplete: "off",
  };

  const renderInput = () => {
    switch (props.type) {
      case "password":
        return <InputPassword defaultOption={defaultOption} />;
      case "email":
        return <InputEmail defaultOption={defaultOption} />;
      case "textarea":
        return <InputTextarea defaultOption={defaultOption} />;
      case "checkbox":
        return <InputCheckbox defaultOption={defaultOption} />;
      case "select":
        return (
          <InputSelect
            defaultOption={defaultOption}
            options={props.options ?? undefined}
          />
        );
      case "date":
        return <InputDate defaultOption={defaultOption} />;
      case "file":
        return (
          <InputFile
            defaultOption={defaultOption}
            accept={props.accept ?? undefined}
            multiple={props.multiple ?? undefined}
            files={props.files ?? undefined}
            handleRemoveFile={props.handleRemoveFile ?? undefined}
            errorFile={props.errorFile}
          />
        );
      default:
        return <InputText defaultOption={defaultOption} />;
    }
  };

  const renderError = () => {
    if (!props.error) return null;

    return <div className={"input-error"}>{props.error}</div>;
  };

  return (
    <div
      className={`input-field ${props.className} ${props.error ? "error" : ""}`}
    >
      <Label htmlFor={props.id}>
        {props.label}&nbsp;{props.suffix}
      </Label>
      {renderInput()}
      {renderError()}
    </div>
  );
};

export default memo(Input);
