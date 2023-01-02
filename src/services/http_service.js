import axios from "axios";
import { toast } from "react-toastify";
import { ErrorAlert } from "../global/alert/Alert";
import UserService from "./keycloakService";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(null, (error) => {
  // const errorStatus = error?.response?.status;

  // if (errorStatus === 404) {
  //   ErrorAlert(error?.response?.data?.errors?.message);
  //   toast.error(
  //     error?.response?.data?.errors?.message || "مقدار مورد نظر یافت نشد"
  //   );
  //   return Promise.reject(error);
  // }

  
  if (error?.response?.status >= 500) {
    toast.error("مشکلی از سمت سرور رخ داده است.");
    Promise.reject(error);
    throw error;
  }
  if (error?.response?.status === 404) {
    if (error?.response?.data?.errors?.message) {
      toast.error(error?.response?.data.errors.message);
    } else {
      toast.error(".سرویس مورد نظر یافت شد ");
    }

    // return Promise.reject(error);
  }
  // if (error?.response?.status === 403 || 401) {
  //   toast.error("شما مجوز دستری ندارید ");
  //   return Promise.reject(error);
  // }
  //  else if (error?.response?.status === 401) {
  //   toast.error("شما مجوز دستری ندارید ");
  //   return Promise.reject(error);
  // }

 if ( error?.response?.data?.message) {
    toast.error( error?.response?.data?.message);
    return Promise.reject(error);
  }
 if (error?.response?.data?.errors?.message) {
    toast.error(error?.response?.data?.errors?.message);
    return Promise.reject(error);
  }
  if (error?.response?.status === 400) {
    toast.error("خطایی رخ داده است ");
    return Promise.reject(error);
  }
  // console.log("run error ",error?.response?.data?.errors?.message)
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
      axios.defaults.headers.common["Authorization"] = "Bearer " + UserService.getToken();
      const cb = () => {
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
