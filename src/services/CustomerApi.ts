import http from "./http_service";
import { apiRoute } from "./apiRoute";

export const getCustomerType = async () => {
  const { data } = await http.get(apiRoute().get.GET_CUSTOMER_TYPE);
  return data.payload;
};

export const getCustomerParent = async () => {
  const { data } = await http.get(apiRoute().get.GET_CUSOTMER_PARENT);
  return data.payload.content;
};

export const createCustomer = async (body: object) => {
  const { data } = await http.post(apiRoute().post.CREATE_CUSTOMER, body);
  return data;
};

export const editCustomer = async (body: object) => {
  const { data } = await http.post(apiRoute().edit.EDIT_CUSTOMER, body);
  return data;
};
