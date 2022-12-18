import http from "./http_service";
import { CREATE_THIRDPARTY, EDIT_THIRDPARTY, GET_THIRDPARTY_CATEGORY, GET_THIRDPARTY_PARENT, GET_THIRDPARTY_TYPE } from "./apiRoute";

export const getThirdPartyType = async () => {
  const { data } = await http.get(GET_THIRDPARTY_TYPE);
  return data.payload;
};

export const getThirdPartyCategory = async () => {
  const { data } = await http.get(GET_THIRDPARTY_CATEGORY);
  return data.payload;
};

export const getThirdPartyParent = async () => {
  const { data } = await http.get(GET_THIRDPARTY_PARENT);
  return data.payload.content;
};

export const createThirdParty = async (body: object) => {
  const { data } = await http.post(CREATE_THIRDPARTY, body);
  return data;
};

export const editThirdParty = async (body: object) => {
  const { data } = await http.put(EDIT_THIRDPARTY, body);
  return data;
};
