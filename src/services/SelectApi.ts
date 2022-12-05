import { http } from "./http_service";

export const GetCustomerType = async (apiRoute: string) => {
    const { data } = await http.get( apiRoute);
    return data.data;
  };