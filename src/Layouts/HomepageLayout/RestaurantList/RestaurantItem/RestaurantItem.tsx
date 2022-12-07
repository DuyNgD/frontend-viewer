import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { API_MEDIA_FIND_BY_ID } from "../../../../API/APIs";
import Badget from "../../../../Components/Badget/Badget";
import ImageText from "../../../../Components/ImageText/ImageText";
import Photo from "../../../../Components/Photo/Photo";
import Space from "../../../../Components/Space/Space";
import "./RestaurantItem.css";

const RestaurantItem: FC<any> = (props) => {
  // Init
  const navigate = useNavigate();
  const { restaurant, emojiCount } = props;
  // End Init

  const handleClick = () => {
    navigate("/" + restaurant.id);
  };

  return (
    <div className={"restaurant-item"} onClick={handleClick}>
      <div className={"item-name"}>
        <span className={"item-image"}>
          <Photo
            type={"image"}
            src={API_MEDIA_FIND_BY_ID + restaurant.image}
            name={"RestaurantImage"}
          />
        </span>
        {restaurant.name}
        &nbsp;
        {emojiCount}
      </div>
      <div className={"item-info"}>
        <ImageText
          src={"./images/IconNavigator/Map.png"}
          text={restaurant.location}
        />
        <ImageText src={"./images/IconTime/Time.png"} text={restaurant.time} />
      </div>
      <div className={"item-service"}>
        <Space gap={0.25}>
          {restaurant.service.split(",").map((element: string, idx: number) => (
            <Badget key={idx}>{element}</Badget>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default memo(RestaurantItem);
