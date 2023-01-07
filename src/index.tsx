import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/Store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";
import UserService from "./services/keycloakService";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  // // <ReactKeycloakProvider authClient={keycloakConfigs}>
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer closeButton={false} autoClose={3000} toastClassName="rounded-md p-4 font-medium" />
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
  //  </ReactKeycloakProvider>
);

UserService.initKeycloak(root);

reportWebVitals();
