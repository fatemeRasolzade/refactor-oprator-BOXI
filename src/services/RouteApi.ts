import http from "./http_service";
import { GET_ROUTE } from "./apiRoute";

export const getRoute = async () => {
  const { data } = await http.get(GET_ROUTE);
  return data.payload.content;
};
