import { apiRoute } from "./apiRoute";
import http from "./http_service";

export const getCustomerType = async () => {
  console.log(apiRoute, "111111111111111111111111111111");
  const { data } = await http.get(apiRoute().get.GET_CUSTOMER_TYPE);
  return data.payload;
};