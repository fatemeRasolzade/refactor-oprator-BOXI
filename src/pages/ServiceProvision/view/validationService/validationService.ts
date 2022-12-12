import * as Yup from "yup"

export const serviceProvitionSchema =Yup.object().shape({
    code:Yup.string().required("نوشتن این فیلدالزامی می باشد"),
    name:Yup.string().required("نوشتن این فیلدالزامی می باشد"),
    discountPercent:Yup.string(),
    type:Yup.object().nullable(true).shape({
        id:Yup.number(),
        text:Yup.string()
    }),
    description:Yup.string(),
    validDateFrom:Yup.object().shape({
        day: Yup.string(),
      month: Yup.string(),
      year: Yup.string()
    }),
    validDateTo:Yup.object().shape({
        day: Yup.string(),
      month: Yup.string(),
      year: Yup.string()
    }),
    service:Yup.object().shape({
        id:Yup.number(),
        text:Yup.string()
    }),
    // saleschannels:Yup.array().of(Yup.object().nullable(true).shape({
    //     id:Yup.number(),
    //     text:Yup.string()
    // })),
    // customerSegments:Yup.array().of(Yup.object().shape({
    //     id:Yup.number(),
    //     text:Yup.string()
    // })),
    // serviceDeliveryCustomers:Yup.array().of(Yup.object().shape({
    //     id:Yup.number(),
    //     text:Yup.string()
    // })),
})


// Yup.array().of(
//         Yup.object().shape({
//           label: Yup.string().required(),
//           value: Yup.string().required(),
//         })
//       ),