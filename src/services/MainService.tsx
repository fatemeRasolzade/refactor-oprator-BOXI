import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.data = {};
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

/////////// Request API ///////////

const requestInstance = axios.create();

requestInstance.interceptors.request.use(
  (config) => {
    // if want to send token any request
    // config.headers.Authorization = getToken()
    return config;
  },
  (error) => {
    const errorStatus = error?.response?.status;

    if (errorStatus >= 500) {
      toast.error("مشکلی از سمت سرور رخ داده است.");
      Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

requestInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 404) {
      // ErrorAlert(error?.response?.data?.errors?.message);
      toast.error(
        error?.response?.data?.errors?.message || "مقدار مورد نظر یافت نشد"
      );
      return Promise.reject(error);
    }
    if (error?.response?.status >= 500) {
      toast.error("مشکلی از سمت سرور رخ داده است.");
      Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const mainService = requestInstance;
export default requestInstance;
