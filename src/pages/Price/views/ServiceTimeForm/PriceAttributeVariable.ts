import * as Yup from "yup";

export const PriceAttributeFormValidation = () =>
  Yup.object().shape(
    {
      product: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      consignmentType: Yup.string()
        .ensure()
        .when("isParametric", (val: any, schema: any) => {
          if (val === false) {
            return Yup.object().required();
          } else {
            return Yup.string().nullable(true);
          }
        }),
      isParametric: Yup.boolean(),
      // customDevision: Yup.string().ensure()
      // .when("classification", {
      // is: (classification) =>(classification?.id === "1"  ? true : false),
      // then: Yup.string().nullable(true).required(),
      // otherwise: Yup.string(), // unnecessary
      // }),
      // customDevision: Yup.string()
      //   .ensure()
      //   .when("classification", (val: any, schema: any) => {
      //     console.log("VAL************", val);

      //     if (val.id === 1) {
      //       return Yup.object().required();
      //     }
          
      //     else {
      //       return Yup.string().nullable(true);
      //     }
      //   }),
      fromDestinationState: Yup.string()
        .ensure()
        .when("classification", {
          is: (classification: any) => (classification?.id === "2" ? true : false),
          then: Yup.string().required(),
        }),
      fromSourceState: Yup.string().when("fromDestinationState", {
        is: (value: any) => value,
        then: Yup.string().required(),
      }),
      fromDestinationCity: Yup.string()
        .ensure()
        .when("fromSourceCity", {
          is: (value: any) => value,
          then: Yup.string().nullable().required(),
        }),
      fromSourceCity: Yup.string()
        .ensure()
        .when("fromDestinationCity", {
          is: (value: any) => value,
          then: Yup.string().nullable().required(),
        }),
      fromDestinationLocation: Yup.string()
        .ensure()
        .when("fromSourceLocation", {
          is: (value: any) => value,
          then: Yup.string().nullable().required(),
        }),
      fromSourceLocation: Yup.string()
        .ensure()
        .when("fromDestinationLocation", {
          is: (value: any) => value,
          then: Yup.string().nullable().required(),
        }),
      price: Yup.number()
        .min(0)
        .when("fixedPrice", {
          is: false,
          then: Yup.number().nullable(true).default(null).required(),
        }),
      fromWeight: Yup.number().min(0),
      toWeight: Yup.number().min(0),
      fromValue: Yup.number().min(0),
      toValue: Yup.number().min(0),
      fromNumber: Yup.number().min(0),
      toNumber: Yup.number().min(0),
    },
    [
      ["fromSourceCity", "fromDestinationCity"],
      ["fromSourceLocation", "fromDestinationLocation"],
      ["fromWeight", "isParametric"],
      ["toWeight", "isParametric"],
      ["fromNumber", "isParametric"],
      ["toNumber", "isParametric"],
      ["isParametric", "toValue"],
      ["isParametric", "fromValue"],
      ["price", "fixedPrice"],
    ]
  );

export const PriceAttributeFormInitialValues = {
  product: "",
  priceFormule: "",
  price: "",
  fixedPrice: false,
  isParametric: true,
  fromWeight: "",
  toWeight: "",
  fromDim: "",
  toDimension: "",
  fromValue: "",
  toValue: "",
  fromNumber: "",
  toNumber: "",
  consignmentType: undefined,
  priceList: null,
  customDevision: null,
  isActive: true,
  priceDetailDevisions: [],
  classification: { id: "", text: "" },
  totalWight: { from: "", to: "" },
  totalDim: { from: "", to: "" },
  totalValue: { from: "", to: "" },
  totalNumber: { from: "", to: "" },
};
