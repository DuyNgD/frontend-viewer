import { FC, memo } from "react";
import HomepageLayout from "../../Layouts/HomepageLayout/HomepageLayout";
import "./Homepage.css";

const Homepage: FC<any> = (props) => {
  return <HomepageLayout />;
};

export default memo(Homepage);
