import * as Yup from "yup";

export const ThirdPartyFormValidation = () =>
  Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    selectThirdPartyType: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    selectThirdPartyCategory: Yup.object().nullable(true).shape({
      text: Yup.string(),
      id: Yup.number(),
    }),
    selectParentThirdParty: Yup.object().nullable(true).shape({
      text: Yup.string(),
      id: Yup.number(),
    }),
    email: Yup.string().email(),
    isActive: Yup.boolean().nullable(),
  });

export const ThirdPartyFormInitialValues = {
  code: "",
  name: "",
  selectThirdPartyType: {},
  nationalCode: "",
  nationalId: "",
  economicCode: "",
  selectThirdPartyCategory: undefined,
  selectParentThirdParty: undefined,
  email: "",
  isActive: true,
  telephones: [],
  addresses: [],
};

export const ThirdPartyFormCurrentValues = (currentData: any) => {
  return {
    code: currentData.code,
    name: currentData.name,
    selectThirdPartyType: currentData.selectThirdPartyType,
    nationalCode: currentData.nationalCode,
    nationalId: currentData.nationalId,
    economicCode: currentData.economicCode,
    selectThirdPartyCategory: currentData.selectThirdPartyCategory,
    selectParentThirdParty: currentData.selectParentThirdParty,
    email: currentData.email ? currentData.email : "",
    isActive: currentData.isActive,
    telephones: currentData.telephones,
    addresses: currentData.addresses,
  };
};
