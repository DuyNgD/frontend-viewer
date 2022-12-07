import { FC, memo, ReactNode, useContext } from "react";
import TabsContext from "../Context/TabsContext";
import "./Tab.css";

interface typeProps {
  name: string;
  children: ReactNode;
}

const Tab: FC<typeProps> = (props) => {
  const context = useContext(TabsContext);

  const handleActive = () => {
    context?.tabCallback.handleActive(props.name);
    context?.tabCallback.handleActiveContent(props.children);
  };

  return (
    <div
      className={context?.tabActive === props.name ? "tab active" : "tab"}
      onClick={handleActive}
    >
      {props.name}
    </div>
  );
};

export default memo(Tab);
