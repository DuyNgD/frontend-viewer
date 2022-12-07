import { FC, memo } from "react";
import ImageText from "../../../../../Components/ImageText/ImageText";
import "./UserQuestion.css";

const UserQuestion: FC<any> = () => {
  return (
    <div className={"user-question"}>
      <div className={"user-question-title"}>Góc Q&A</div>
      <ImageText
        src={"./images/IconUI/Question.png"}
        text={"Review Hàng Quán là gì?"}
      />
      <ImageText
        src={"./images/IconUI/Question.png"}
        text={"Mình không muốn nhìn thấy review nào đó!"}
      />
    </div>
  );
};

export default memo(UserQuestion);
