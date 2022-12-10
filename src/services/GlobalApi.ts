import { apiRoute } from "./apiRoute";
import http from "./http_service";

export const getProvinces = async () => {
  const { data } = await http.get(apiRoute().get.GET_PROVINCES);
  return data.payload.content;
};

export const getCities = async () => {
  const { data } = await http.get(apiRoute().get.GET_CITIES);
  return data.payload.content;
};

export const getRegions = async () => {
  const { data } = await http.get(apiRoute().get.GET_REGIONS);
  return data.payload.content;
};

export const getAddressType = async () => {
  const { data } = await http.get(apiRoute().get.GET_ADDRESS_TYPE);
  return data.payload;
};
