import http from "./http_service";
import { CREATE_CUSTOMER, EDIT_CUSTOMER, GET_CUSTOMER_PARENT, GET_CUSTOMER_TYPE } from "./apiRoute";

export const getCustomerType = async () => {
  const { data } = await http.get(GET_CUSTOMER_TYPE);
  return data.payload;
};

export const getCustomerParent = async () => {
  const { data } = await http.get(GET_CUSTOMER_PARENT);
  return data.payload.content;
};

export const createCustomer = async (body: object) => {
  const { data } = await http.post(CREATE_CUSTOMER, body);
  return data;
};

export const editCustomer = async (body: object) => {
  const { data } = await http.put(EDIT_CUSTOMER, body);
  return data;
};
