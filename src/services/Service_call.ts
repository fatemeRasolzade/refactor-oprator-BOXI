import http from "./http_service";
import UserService from './keycloakService';


const localData= localStorage.getItem("myToken") !== null




export const getDataFromServer = async (apiRoute: string) => {
  const { data } = await http.get(apiRoute);
  return data.payload;
};

export const getDataHeaderServer = async (apiRoute: string) => {
  const { data } = await http.get(apiRoute, {
    headers:{
      "Authorization":"Bearer " + localStorage.getItem("myToken")
    }
  });
  return data;
};

export const postDataToServer = async (apiRoute: string, body: object) => {
  const { data } = await http.post(apiRoute, body);
  return data;
};

export const postDataHeaderToServer = async (apiRoute: string, body: object) => {
  const { data } = await http.post(apiRoute, body, {
    headers:{"Authorization":"Bearer " + localStorage.getItem("myToken")}
  });
 
  return data;
};

export const PostDataParams = async (apiRoute: string, body: object) => {
  const { data } = await http.post(apiRoute, body);

  return data;
};
export const GetDataParams = async (apiRoute: string) => {
  const { data } = await http.get(apiRoute);
  return data;
};
export const DeleteDataParams = async (apiRoute: string) => {
  const { data } = await http.delete(apiRoute);
  return data;
};
export const selectDataFromServer = async (apiRoute: { apiRoute: string }) => {
  console.log("apiRoute", apiRoute);
  // @ts-ignore
  const { data } = await http.get(apiRoute);
  return data;
};

export const selectDataFromServerWithHeader = async (apiRoute: string) => {
  // console.log("apiRoute",apiRoute)
  // @ts-ignore
  const { data } = await http.get(apiRoute, {
    headers:{"Authorization":"Bearer " + localStorage.getItem("myToken")}
  });
  return data;
};

export const selectHubFromServerWithHeader = async (
  apiRoute: string,
  headers?: object,
  body?:any
) => {
  // console.log("apiRoute",apiRoute)
  // @ts-ignore
  const { data } = await http.post(apiRoute,body,headers);
  return data;
};

export const EditDataParams = async (apiRoute: string, body: object) => {
  const { data } = await http.put(apiRoute, body);
  return data;
};

export const DeleteWithHeader=async(apiRoute: string)=>{
  const { data } = await http.delete(apiRoute,{
    headers: { Authorization: "Bearer " + localStorage.getItem("myToken") }
    }); 
  return data;
}
export const PutWithHeader=async(apiRoute: string,body:object)=>{
  const { data } = await http.put(apiRoute,body,{
    headers: { Authorization: "Bearer " + localStorage.getItem("myToken") }
  });
  return data;
}
