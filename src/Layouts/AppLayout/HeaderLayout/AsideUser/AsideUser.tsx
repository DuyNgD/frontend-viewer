import { FC, memo, useState } from "react";
import Loading from "../../../../Components/Loading/Loading";
import Photo from "../../../../Components/Photo/Photo";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { userLogout } from "../../../../Redux/UserRedux/UserReducer";
import "./AsideUser.css";
import UserEdit from "./UserEdit/UserEdit";
import UserImage from "./UserImage/UserImage";
import UserQuestion from "./UserQuestion/UserQuestion";
import UserView from "./UserView/UserView";

const AsideUser: FC<any> = ({ toggleAsideUser }) => {
  // Init
  const userReducer = useAppSelector((state) => state.userReducer);
  const userData = userReducer.userData;
  const dispatch = useAppDispatch();

  const [view, setView] = useState("userView");
  // End init

  const handleChangeView = (view: string) => {
    setView(view);
  };

  const RenderView = () => {
    if (view === "userQuestion") return <UserQuestion />;
    if (view === "userEdit")
      return (
        <UserEdit
          userData={userData}
          accessToken={userReducer.accessToken}
          onCancel={() => handleChangeView("userView")}
        />
      );

    return (
      <UserView userData={userData} accessToken={userReducer.accessToken} />
    );
  };

  const handleLogout = () => {
    dispatch(
      userLogout({
        accessToken: userReducer.accessToken,
        callback: () => {
          toggleAsideUser();
        },
      })
    );
  };

  return (
    <div className={"aside-user"}>
      <div className={"aside-user-header"}>
        <UserImage userData={userData} accessToken={userReducer.accessToken} />
        <span className={"username"}>{userData?.username}</span>
      </div>
      <RenderView />
      <div className={"aside-user-nav"}>
        <span
          className={"aside-btn"}
          onClick={() => handleChangeView("userEdit")}
        >
          <Photo
            type={"image"}
            src={"./images/IconUI/Setting_line.png"}
            name={"Setting"}
          />
        </span>
        <span
          className={"aside-btn"}
          onClick={() => handleChangeView("userQuestion")}
        >
          <Photo
            type={"image"}
            src={"./images/IconUI/Question.png"}
            name={"Question"}
          />
        </span>
        <span className={"aside-btn"} onClick={handleLogout}>
          {userReducer.isLogoutLoading ? (
            <div className={"logout-loading"}>
              <Loading />
            </div>
          ) : (
            <Photo
              type={"image"}
              src={"./images/IconLogin/Sign_out_squre.png"}
              name={"Logout"}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default memo(AsideUser);
