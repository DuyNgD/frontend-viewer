import { FC, memo } from "react";
import Article from "../../Components/Article/Article";
import Layout from "../Layout";
import "./HomepageLayout.css";
import RestaurantList from "./RestaurantList/RestaurantList";

const HomepageLayout: FC<any> = (props) => {
  return (
    <Layout>
      <Article className={"homepage-layout"}>
        <RestaurantList />
      </Article>
    </Layout>
  );
};

export default memo(HomepageLayout);
