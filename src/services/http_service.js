import axios from "axios";
import UserService from "./UserService";

axios.defaults.baseURL = "http://boxi.local:40000/";

const configure = () => {
  axios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("myToken")}`;
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
