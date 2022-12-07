import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { API_MEDIA_FIND_BY_ID } from "../../../API/APIs";
import { useShowing } from "../../../API/Hooks/useShowing";
import Article from "../../../Components/Article/Article";
import Aside from "../../../Components/Aside/Aside";
import Button from "../../../Components/Button/Button";
import Photo from "../../../Components/Photo/Photo";
import SearchInput from "./SearchInput/SearchInput";
import { useAppSelector } from "../../../Redux/hooks";
import AsideUser from "./AsideUser/AsideUser";
import "./HeaderLayout.css";

const HeaderLayout: FC<any> = () => {
  // Init
  const userReducer = useAppSelector((state) => state.userReducer);
  const userData: any = userReducer.userData;

  const [isShowingAsideUser, toggleAsideUser, innerRef] = useShowing();

  const navigate = useNavigate();
  // End init

  const renderHeaderUser = () => {
    if (userData?.id)
      return (
        <nav className={"header-user-login"} onClick={toggleAsideUser}>
          <span className={"user-image"}>
            <Photo
              type={"image"}
              src={API_MEDIA_FIND_BY_ID + userData.image}
              name={"UserImage"}
            />
          </span>
        </nav>
      );

    return <Button onClick={() => navigate("/login")}>Đăng nhập</Button>;
  };

  return (
    <Article className={"header-layout"}>
      <div className={"header-nav"}>
        <span className={"header-logo"} onClick={() => navigate("/")}>
          Review Hàng Quán
        </span>
        <span className={"header-user"}>{renderHeaderUser()}</span>
      </div>
      <div className={"header-search"}>
        <span className={"title"}>Bạn muốn tìm review quán nào?</span>
        <SearchInput />
      </div>
      <Aside isShowing={isShowingAsideUser} right innerRef={innerRef}>
        <AsideUser userId={userData?.id} toggleAsideUser={toggleAsideUser} />
      </Aside>
    </Article>
  );
};

export default memo(HeaderLayout);
