
import { useEffect,useState } from "react";
import {  selectDataFromServerWithHeader } from "../../services/Service_call";
import { ErrorAlert } from "../alert/Alert";


export const useGetOptions=(url:string)=>{
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

    } catch (error) {
      ErrorAlert("دریافت دیتا با خطلا مواجه شد");
    }
   },[])
   return {options}
}
