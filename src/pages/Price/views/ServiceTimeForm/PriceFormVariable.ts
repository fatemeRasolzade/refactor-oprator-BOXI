import * as Yup from "yup";

export const PriceFormValidation = () =>
  Yup.object().shape({
    priceListCode: Yup.number().required(),
    priceListName: Yup.string().required(),
    priceListDate: Yup.string().required(),
    validDateFrom: Yup.string().required(),
    validDateTo: Yup.string().required(),
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
