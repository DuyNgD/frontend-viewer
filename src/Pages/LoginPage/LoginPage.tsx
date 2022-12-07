import { FC, memo } from "react";
import Layout from "../../Layouts/Layout";
import LoginLayout from "../../Layouts/LoginLayout/LoginLayout";
import "./LoginPage.css";

const LoginPage: FC<any> = () => {
  return (
    <Layout className={"login-page"}>
      <LoginLayout />
    </Layout>
  );
};

export default memo(LoginPage);
