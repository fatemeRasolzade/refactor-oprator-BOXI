import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const serviceProvisionData=createApi({
    reducerPath:"service",
    baseQuery:fetchBaseQuery({
        baseUrl:Base_url4
    }),
    endpoints:(builder)=>({
        getService:builder.query({
            query:()=>`/users`
        })
    })
})

export const {useGetServiceQuery} = serviceProvisionData;