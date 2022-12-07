import { FC, memo } from "react";
import { API_MEDIA_FIND_BY_ID } from "../../../API/APIs";
import Badget from "../../../Components/Badget/Badget";
import ImageText from "../../../Components/ImageText/ImageText";
import Photo from "../../../Components/Photo/Photo";
import Space from "../../../Components/Space/Space";
import "./RestaurantInfo.css";

const RestaurantInfo: FC<any> = (props) => {
  const { restaurant } = props;

  const RestaurantDescription = () => {
    if (!restaurant.description) return null;

    return (
      <div className={"restaurant-description"}>
        {restaurant.description}
        &nbsp;
        {restaurant.wikipedia ? (
          <a href={restaurant.wikipedia} target={"_blank"} rel={"noreferrer"}>
            Website
          </a>
        ) : null}
      </div>
    );
  };

  const RestaurantImgText = ({ restaurantData, restaurantImgSrc }: any) => {
    if (!restaurantData) return null;

    return <ImageText src={restaurantImgSrc} text={restaurantData} />;
  };

  return (
    <div className={"restaurant-info"}>
      <div className={"restaurant-info-header"}>
        <div className={"restaurant-image"}>
          <Photo
            type={"image"}
            src={API_MEDIA_FIND_BY_ID + restaurant.image}
            name={"RestaurantImage"}
          />
        </div>
        <div className={"restaurant-name"}>{restaurant.name}</div>
      </div>
      <div className={"restaurant-info-body"}>
        <RestaurantDescription />
        <RestaurantImgText
          restaurantData={restaurant.location}
          restaurantImgSrc={"./images/IconNavigator/Map.png"}
        />
        <RestaurantImgText
          restaurantData={restaurant.price}
          restaurantImgSrc={"./images/IconUI/Dollar.png"}
        />
        <RestaurantImgText
          restaurantData={restaurant.phone}
          restaurantImgSrc={"./images/IconMessage/Phone.png"}
        />
        <RestaurantImgText
          restaurantData={restaurant.time}
          restaurantImgSrc={"./images/IconTime/Time.png"}
        />
        <RestaurantImgText
          restaurantData={restaurant.founding}
          restaurantImgSrc={"./images/IconChart/Line_Up.png"}
        />
        <Space gap={0.25}>
          {restaurant.service.split(",").map((element: string, idx: number) => (
            <Badget key={idx}>{element}</Badget>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default memo(RestaurantInfo);
