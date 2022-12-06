import http from "./http_service";
import { Base_url2, Base_url3,Base_url4 } from "./apiRoute";


export const getDataFromServer = async (apiRoute: { apiRoute: string }) => {
  const { data } = await http.get(Base_url4 + apiRoute);
  return data;
};


export const postDataToServer = async (
  apiRoute: { apiRoute: string },
  body: { body: object }
) => {
  const { data } = await http.post(Base_url4 + apiRoute, body);
  return data;
};

export const postDataHeaderToServer = async (
  apiRoute: { apiRoute: string },
  body: { body: object },
  headers: { headers: object }
) => {
  const { data } = await http.post(Base_url4 + apiRoute, body, headers);
  return data;
};

export const PostDataParams = async (apiRoute: string, body: object) => {
  const { data } = await http.post( apiRoute, body);

  return data;
};
export const GetDataParams = async (apiRoute: string) => {
  const { data } = await http.get( apiRoute);
  return data;
};
export const DeleteDataParams = async (apiRoute: string) => {
  const { data } = await http.delete(apiRoute);
  return data;
};
export const selectDataFromServer = async (apiRoute: { apiRoute: string }) => {
  console.log("apiRoute",apiRoute)
  // @ts-ignore
 const { data } = await http.get(apiRoute);
 return data;
};

export const EditDataParams = async (apiRoute: string, body: object) => {
  const { data } = await http.put(apiRoute, body);
  return data;
};