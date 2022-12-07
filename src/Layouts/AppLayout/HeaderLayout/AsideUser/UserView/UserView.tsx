import { FC, memo } from "react";
import ImageText from "../../../../../Components/ImageText/ImageText";
import Space from "../../../../../Components/Space/Space";
import "./UserView.css";

const UserView: FC<any> = ({ userData }) => {
  return (
    <div className={"user-view"}>
      <Space gap={0.5} direction={"column"}>
        <ImageText
          src={"./images/IconUser/User_box.png"}
          text={userData?.name ?? "Chưa có"}
          textBold
        />
        <ImageText
          src={"./images/IconPhone/Phone.png"}
          text={userData?.phone ?? "Chưa có"}
          textBold
        />
        <ImageText
          src={"./images/IconMessage/Message.png"}
          text={userData?.email ?? "Chưa có"}
          textBold
        />
        <ImageText
          src={"./images/IconMessage/Message.png"}
          text={"Điểm tích lũy"}
          textBold
        />
        <ImageText
          src={"./images/IconUI/Reward.png"}
          text={"Giải thưởng của bạn"}
          textBold
        />
      </Space>
    </div>
  );
};

export default memo(UserView);
