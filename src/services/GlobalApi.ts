import { apiRoute } from "./apiRoute";
import http from "./http_service";

export const getProvinces = async () => {
  // console.log(apiRoute, "*11111111111111111111111111111");
  const { data } = await http.get(apiRoute().get.GET_PROVINCES);
  return data;
};

export const getCities = async () => {
  // console.log(apiRoute, "*22222222222222222222222");
  const { data } = await http.get(apiRoute().get.GET_CITIES);
  return data;
};

export const getRegions = async () => {
  // console.log(apiRoute, "*33333333333333333333333");
  const { data } = await http.get(apiRoute().get.GET_REGIONS);
  return data;
};
