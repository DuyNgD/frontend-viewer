import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App/App";
import "./index.css";
import { store } from "./Redux/store";

const container = document.getElementById("review-hang-quan")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer autoClose={1500} />
    </BrowserRouter>
  </Provider>
);
