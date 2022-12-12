import axios from "axios";
import { toast } from "react-toastify";
import { ErrorAlert } from "../global/alert/Alert";
import UserService from "./keycloakService";




axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("Authorization")
axios.defaults.baseURL = "http://boxi.local:40000/";
axios.interceptors.response.use(null, (error) => {
  const errorStatus = error.response.status;

  if (errorStatus === 404) {
    ErrorAlert(error.response.data.errors.message);
    throw error;
  }
  if (errorStatus >= 500) {
    ErrorAlert("مشکلی از سمت سرور رخ داده است.");
    throw error;
  }

  //   const expectedErrors =
  //     error.response &&
  //     error.response.status >= 400 &&
  //     error.response.status < 500;
  //   if (!expectedErrors) {
  //     toast.error("مشکلی از سمت سرور رخ داده است.", {
  //       position: "top-right",
  //       closeOnClick: true,
  //     });
  //   }

  throw error;
});
const configure = () => {
  axios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "myToken"
        )}`;
        return Promise.resolve(config);
      };
      return UserService.updateToken(cb);
    }
  });
};

export default {
  config: configure,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
