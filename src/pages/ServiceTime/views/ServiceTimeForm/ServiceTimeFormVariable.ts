import * as Yup from "yup";

export const ServiceTimeFormValidation = () =>
  Yup.object().shape({
    name: Yup.string().required(),
    from: Yup.number().min(0).required(),
    to: Yup.number().min(0).required(),
    isActive: Yup.boolean().nullable(),
    description: Yup.string().nullable(),
    selecttedtimeUnit: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
  });

export const ServiceTimeFormInitialValues = {
  selecttedtimeUnit: {
    id: "",
    text: "",
  },
  from: "",
  to: "",
  name: "",
  description: "",
  isActive: true,
};

export const ServiceTimeFormCurrentValues = (currentData: any) => {
  return {
    id: currentData?.id,
    selecttedtimeUnit: {
      id: currentData.selecttedtimeUnit?.id,
      text: currentData.selecttedtimeUnit?.text,
    },
    from: currentData?.from,
    to: currentData?.to,
    name: currentData?.name,
    description: currentData?.description,
    isActive: currentData?.isActive,
  };
};
