import { FC, memo, useEffect, useRef } from "react";
import Label from "../../../Label/Label";
import Photo from "../../../Photo/Photo";
import "./InputFile.css";

const InputFile: FC<any> = (props) => {
  // Init
  const { defaultOption, accept, multiple, files, handleRemoveFile } = props;
  const urlsRef = useRef<string[]>([]);
  // End init

  useEffect(() => {
    const urlsRefValue = urlsRef.current;

    return () => {
      urlsRefValue.forEach((url: string) => URL.revokeObjectURL(url));
    };
  }, []);

  const renderFilePreview = () => {
    return files.map((file: File, idx: number) => {
      const fileUrl = URL.createObjectURL(file);

      // To clean up after load image
      urlsRef.current.push(fileUrl);

      return (
        <span
          key={idx}
          className={`input-file-preview ${
            props.errorFile === file ? "error" : ""
          }`}
        >
          <span className="btn-close" onClick={() => handleRemoveFile(file)}>
            ×
          </span>
          <Photo type={file.type} src={fileUrl} name={file.name} />
        </span>
      );
    });
  };

  return (
    <span className={"input-file"}>
      {renderFilePreview()}
      <span className={"input-file-layout"}>
        <Label className={"input-upload"} htmlFor={defaultOption.id}>
          <img src={"./images/IconDownload/Upload.png"} alt={"Upload"} />
        </Label>
        <input
          {...defaultOption}
          value={""}
          accept={accept}
          multiple={multiple}
        />
      </span>
    </span>
  );
};

export default memo(InputFile);
