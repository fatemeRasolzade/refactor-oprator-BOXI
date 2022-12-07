import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Base_url4 } from "../../../../services/apiRoute";
import UserService from "../../../../services/UserService";
console.log("run");
export const serviceProvisionData = createApi({
  reducerPath: "service",

  baseQuery: fetchBaseQuery({
    baseUrl: Base_url4,
  }),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("userToken");
    console.log(token, "token");
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
//   endpoints: (builder) => ({
//     updateUser: builder.query({
//       query: () => ({
//         url: `/core-api/vendor/select?filter=`,
//         method: 'GET',
//         // headers: {
//         //     'content-type': 'text/plain',
//         // },
//       }),
//     }),
// })
  endpoints: (builder) => ({
    getService: builder.query({
      query: () => `/core-api/vendor/select?filter=`,
    }),
  }),
})

export const { useGetServiceQuery } = serviceProvisionData;
