import axios from "axios";
import { ErrorAlert } from "../global/alert/Alert";

import { useEffect } from "react";
import UserService from "./UserService";



export default () => {
	axios.defaults.baseURL = "http://boxi.local:40000/";
	axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("Authorization");
	// const { user } = useStore();
	const persianError = {
		"productgroup.duplicate": "کد محصول تکراری است",
	};
	useEffect(() => {
		axios.interceptors.response.use(
			(response) => response,
			function (error) {
				const message = error?.response?.data?.message;
				if (message) {
					// toast.error(message || error.toString(), toastConfig);
					return Promise.reject(error);
				}
				if (error?.response?.data?.errors?.message) {
					// console.log(persianError[error?.response?.data?.errors?.message]?)
					// toast.error(
					// 	persianError[error?.response?.data?.errors?.message]
					// 		? persianError[error?.response?.data?.errors?.message]
					// 		: error?.response?.data?.errors?.message,
					// 	toastConfig
					// );
					return Promise.reject(error);
				} else {
					// toast.error(error.toString(), toastConfig);
				}
  
				return error;
			}
		);

		axios.interceptors.request.use((config) => {
			console.log("run interceptor")
		if (UserService.isLoggedIn()) {
		  const cb = () => {
			config.headers.Authorization = `Bearer ${UserService.getToken()}`;
			return Promise.resolve(config);
		  };
		  return UserService.updateToken(cb);
		}
	  });

	}, []);
	return null;
};



export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
