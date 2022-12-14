import http from "./http_service";
import { CREATE_ADMVEHICLE, EDIT_ADMVEHICLE, GET_VEHICLEMAKE } from "./apiRoute";

export const getVehicleMake = async () => {
  const { data } = await http.get(GET_VEHICLEMAKE);
  return data.payload.content;
};

export const createADMVehicle = async (body: object) => {
  const { data } = await http.post(CREATE_ADMVEHICLE, body);
  return data;
};

export const editADMVehicle = async (body: object) => {
  const { data } = await http.put(EDIT_ADMVEHICLE, body);
  return data;
};
