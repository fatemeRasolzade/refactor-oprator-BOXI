import { useEffect,useState } from "react";
import {  selectDataFromServerWithHeader } from "../../../../services/Service_call";
console.log("run");
// export const serviceProvisionData = createApi({
//   reducerPath: "service",

//   baseQuery: fetchBaseQuery({
//     baseUrl: Base_url4,
//   }),
//   prepareHeaders: (headers) => {
//     const token = localStorage.getItem("userToken");
//     console.log(token, "token");
//     // If we have a token set in state, let's assume that we should be passing it.
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// //   endpoints: (builder) => ({
// //     updateUser: builder.query({
// //       query: () => ({
// //         url: `/core-api/vendor/select?filter=`,
// //         method: 'GET',
// //         // headers: {
// //         //     'content-type': 'text/plain',
// //         // },
// //       }),
// //     }),
// // })
//   endpoints: (builder) => ({
//     getService: builder.query({
//       query: () => `/core-api/vendor/select?filter=`,
//     }),
//   }),
// })

// export const { useGetServiceQuery } = serviceProvisionData;



export const useGetOptions=(url)=>{
   const [options,setOptions]=useState([])
   useEffect(()=>{
    try {
      selectDataFromServerWithHeader(url,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
      })
      .then((res) => {
        if (res.status === "OK") setOptions(res?.payload?.content);
      });
      // getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
    } catch (error) {
      // ErrorAlert("دریافت دیتا با خطلا مواجه شد");
    }
   },[])

   return {options}
}



// export const productData=createAsyncThunk('productlists',async(body:any)=>{
//   console.log("body",body)

//   const params = `/filter?pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`;
//   var data = {};
//   try {
//       data = await postDataHeaderToServer(apiRoute().post.product + params, {
//         code:body.code,
//         name:body.name,
//         isActive:body.isActive
//       },{
//           headers: { Authorization: "Bearer " + localStorage.getItem("myToken") },
//         });
//     } catch (error) {
//       console.log("error ", error);
//     }


//   return data;
// })