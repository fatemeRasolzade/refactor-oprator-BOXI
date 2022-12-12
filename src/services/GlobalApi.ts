import { DEL_ADDRESS, DEL_TELEPHONE, GET_ADDRESS_TYPE, GET_CITIES, GET_PHONETYPE, GET_PROVINCES, GET_REGIONS } from "./apiRoute";
import http from "./http_service";

export const getProvinces = async () => {
  const { data } = await http.get(GET_PROVINCES);
  return data.payload.content;
};

export const getCities = async () => {
  const { data } = await http.get(GET_CITIES);
  return data.payload.content;
};

export const getRegions = async () => {
  const { data } = await http.get(GET_REGIONS);
  return data.payload.content;
};

export const getAddressType = async () => {
  const { data } = await http.get(GET_ADDRESS_TYPE);
  return data.payload;
};

export const getPhoneType = async () => {
  const { data }= await http.get(GET_PHONETYPE)
  return data.payload
}

export const deleteAddress = async (id:any) => {
  const {data} = await http.delete(DEL_ADDRESS+id)
  return data
}

export const deletePhone = async (id:any) => {
  const {data} = await http.delete(DEL_TELEPHONE+id)
  return data
}

