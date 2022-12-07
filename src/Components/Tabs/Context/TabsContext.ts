import { createContext } from "react";

interface AppContextInterface {
  tabActive: string;
  tabCallback: any;
}

const TabsContext = createContext<AppContextInterface | null>(null);

export default TabsContext;
