import { FC, memo, ReactNode, useLayoutEffect, useState } from "react";
import TabsContext from "./Context/TabsContext";
import "./Tabs.css";

const Tabs: FC<any> = (props) => {
  const [tabActive, setTabActive] = useState("");
  const [content, setContent] = useState<ReactNode>(null);

  useLayoutEffect(() => {
    const [firstChild] = props.children;

    setTabActive(firstChild.props.name);
    setContent(firstChild.props.children);
  }, [props.children]);

  const handleActive = (tab: string) => {
    setTabActive(tab);
  };

  const handleActiveContent = (content: ReactNode) => {
    setContent(content);
  };

  return (
    <div className={"tabs"}>
      <TabsContext.Provider
        value={{
          tabActive: tabActive,
          tabCallback: { handleActive, handleActiveContent },
        }}
      >
        <div className={"tab-panel"}>{props.children}</div>
        <div className={"tab-content"}>{content}</div>
      </TabsContext.Provider>
    </div>
  );
};

export default memo(Tabs);
