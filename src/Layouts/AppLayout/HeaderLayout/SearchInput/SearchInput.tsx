import {
  ChangeEvent,
  FC,
  memo,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  API_MEDIA_FIND_BY_ID,
  API_RESTAURANT_FIND_BY_NAME,
} from "../../../../API/APIs";
import { request } from "../../../../Constants/Constants";
import Loading from "../../../../Components/Loading/Loading";
import Photo from "../../../../Components/Photo/Photo";
import "./SearchInput.css";

const SearchInput: FC<any> = () => {
  // Init
  const navigate = useNavigate();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState("");
  const [retaurantList, setRetaurantList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  // End init

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  useLayoutEffect(() => {
    if (searchKey !== "") {
      setIsLoading(true);

      request({
        url: API_RESTAURANT_FIND_BY_NAME + searchKey.toLocaleLowerCase(),
        method: "GET",
      })
        .then((resData) => {
          setRetaurantList(resData.data);
        })
        .catch((error) => {
          setRetaurantList([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else setRetaurantList([]);
  }, [searchKey]);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!inputRef.current || inputRef.current.contains(event.target as Node))
        return;

      setIsFocus(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSelectResult = (restaurantId: string) => {
    setIsFocus(false);
    navigate("/" + restaurantId);
  };

  const renderResult = () => {
    if (retaurantList.length === 0) return null;

    if (isFocus) {
      return (
        <div className={"search-result"}>
          {retaurantList.map((restaurant: any) => {
            return (
              <div
                key={restaurant.id}
                className={"restaurant-result"}
                onClick={() => handleSelectResult(restaurant.id)}
              >
                <span className={"restaurant-image"}>
                  <Photo
                    type={"image"}
                    src={API_MEDIA_FIND_BY_ID + restaurant.image}
                    name={"RestaurantImage"}
                  />
                </span>
                <span className={"restaurant-name"}>{restaurant.name}</span>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={"search-input"} ref={inputRef}>
      <form className={"search-form"}>
        <span className={"search-icon"}>
          {isLoading ? (
            <div className={"search-loading"}>
              <Loading />
            </div>
          ) : (
            <Photo
              type={"image"}
              src={"./images/IconUI/Search.png"}
              name={"Search"}
            />
          )}
        </span>
        <input
          type={"text"}
          value={searchKey}
          onChange={handleSearch}
          placeholder={"Tìm quán..."}
          onFocus={handleFocus}
        />
      </form>
      {renderResult()}
    </div>
  );
};

export default memo(SearchInput);
