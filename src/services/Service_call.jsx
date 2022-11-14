import http from "./http_service";
import { Base_url } from './apiRoute';

 export const getDataFromServer = async (apiRoute) => {  
    const {data} = await http.get(Base_url+ apiRoute );
    return data;
  };

  export const postDataToServer = async (apiRoute,body) => {
    const {data} = await http.post(Base_url + apiRoute  ,body);
     return data
};
 
  export const postDataHeaderToServer = async (apiRoute,body,headers) => {
  const {data} = await http.post( Base_url + apiRoute,body,headers);
   return data
 };
 
 