import axios from "axios";
import { toast } from "react-toastify";
import { ErrorAlert } from "../global/alert/Alert";
import UserService from "./keycloakService";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("Authorization");
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(null, (error) => {
  const errorStatus = error.response.status;
  console.log("sd[vsp[dv", errorStatus);
  if (errorStatus === 404) {
    debugger;
    ErrorAlert(error?.response?.data?.errors?.message);
    toast.error(
      error?.response?.data?.errors?.message || "مقدار مورد نظر یافت نشد"
    );
    debugger;
    return Promise.reject(error);
  }
  if (errorStatus >= 500) {
    toast.error("مشکلی از سمت سرور رخ داده است.");
    return Promise.reject(error);
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
  return Promise.reject(error);
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
