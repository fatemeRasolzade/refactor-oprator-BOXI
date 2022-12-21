import * as Yup from "yup";

export const PriceFormValidation = () =>
  Yup.object().shape({
    priceListCode: Yup.number().required(),
    priceListName: Yup.string().required(),
    priceListDate: Yup.object().required(),
    validDateFrom: Yup.object().required(),
    validDateTo: Yup.object().required(),
  });

export const PriceFormInitialValues = {
  priceListCode: "",
  priceListName: "",
  priceListDate: "",
  validDateFrom: "",
  validDateTo: "",
  priceListDetails: "",
  isActive: true,
};

export const PriceFormCurrentValues = (currentData: any) => {
  return {
    id: currentData?.id,
    priceListCode: currentData?.priceListCode,
    priceListName: currentData?.priceListName,
    priceListDate: currentData?.priceListDate,
    validDateFrom: currentData?.validDateFrom,
    validDateTo: currentData?.validDateTo,
    priceListDetails: currentData?.priceListDetails,
    isActive: currentData?.isActive,
  };
};
