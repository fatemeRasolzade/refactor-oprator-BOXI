import http from "./http_service";
import { Base_url3 } from './apiRoute';

 export const getDataFromServer= async (apiRoute:{apiRoute:string}) => {
    const {data} = await http.get(Base_url3+ apiRoute );
    return data;
  };

  export const postDataToServer = async (apiRoute:{apiRoute:string},body:{body:object}) => {
    const {data} = await http.post(Base_url3 + apiRoute ,body);
     return data
};
 
  export const postDataHeaderToServer =async (apiRoute:{apiRoute:string},body:{body:object},headers:{headers:object}) => {
  const {data} = await http.post( Base_url3 + apiRoute,body,headers);
   return data
 };
 
export const PostDataParams=async (apiRoute:{apiRoute:string},params:{params:string},body:{body:object})=>{
 
  const {data}=await http.post(Base_url3 + apiRoute + params,body)
  return data
 
 }