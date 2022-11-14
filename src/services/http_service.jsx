import axios from "axios";
import { ErrorAlert } from "../global/alert/Alert";
import { API_CONSIGNMENT } from "./apiRoute";

axios.defaults.baseURL = API_CONSIGNMENT;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.interceptors.response.use(null, (error) => {
  // const accessToken = Cookies.get()
  const errorStatus = error.response.status;

  if (errorStatus === 401) {
  }

  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    ErrorAlert("مشکلی از سمت سرور رخ داده است.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
