import { useEffect } from "react";
import axios from "axios";
import UserService from "./userService";
// import { useStore } from "../context";
// import { parse, stringify } from "qs";

// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";

// const constants = {
// 	param1: "one",
// 	param2: "two",
// };

export default () => {
 
	// const { user } = useStore();
	const persianError = {
		"productgroup.duplicate": "کد محصول تکراری است",
	};
	useEffect(() => {
		axios.interceptors.request.use((config) => {
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

export const http= {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
