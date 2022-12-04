import axios from "axios";
import { ErrorAlert } from "../global/alert/Alert";
import UserService from "./UserService";
import { useEffect } from 'react';






axios.defaults.headers.common["Content-Type"] = "application/json";


export default ()=>{
useEffect(()=>{

  axios.interceptors.request.use((config) => {

    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return Promise.resolve(config);
      };
      return UserService.updateToken(cb);
    }
  
    
  
  
    const expectedErrors =
    config.response &&
    config.response.status >= 400 &&
    config.response.status < 500;
    if (!expectedErrors) {
      ErrorAlert("مشکلی از سمت سرور رخ داده است.");
    }
  
    return Promise.reject(config);
  
   
  
  
  });

  axios.interceptors.request.use(function (config) {
    const 	token=localStorage.getItem("Authorization");
    config.headers.Authorization="Bearer "+token;
    return config;
   });

},[])
}


export const http= {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
