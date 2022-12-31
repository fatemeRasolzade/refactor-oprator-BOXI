import { mainService } from "./MainService";

export const getAPI = async (url: string, tokenRequired: boolean = true) => {
  return await mainService({
    url: url,
    method: "GET",
    headers: tokenRequired
      ? {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        }
      : {},
  });
};

export const filterTableDataAPI = async (
  url: string,
  pageNumber: number,
  body: object,
  tokenRequired: boolean = true
) => {
  return await mainService({
    url: url + `?pageNumber=${pageNumber}&pageSize=10`,
    data: body,
    headers: tokenRequired
      ? {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        }
      : {},
  });
};

export const deleteDataAPI = async (
  url: string,
  id: number,
  tokenRequired: boolean = true
) => {
  return await mainService({
    url: url + `/${id}`,
    method: "DELETE",
    headers: tokenRequired
      ? {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        }
      : {},
  });
};

export const addDataAPI = async (
  url: string,
  method: "post" | "put",
  body: object,
  tokenRequired: boolean = true
) => {
  return await mainService({
    url: url,
    method,
    data: body,
    headers: tokenRequired
      ? {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        }
      : {},
  });
};

export const filterDataAPI = async (
  url: string,
  body: object,
  tokenRequired: boolean = true
) => {
  return await mainService({
    url: url,
    data: body,
    method: "post",
    headers: tokenRequired
      ? {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        }
      : {},
  });
};
