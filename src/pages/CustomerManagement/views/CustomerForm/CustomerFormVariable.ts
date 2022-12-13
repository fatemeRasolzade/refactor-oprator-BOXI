import * as Yup from "yup";

import { JustEngPasswordRegex, NationalCodeRegex } from "../../../../tools/validations/ErrorHelper";
import { UNMATCHPASSWORD, VALIDENGPASSWORD, VALIDNATIONALCODE } from "../../../../tools/validations/RegexKeywords";

export const CustomerFormValidation = () => {
  const CustomerAddValidation = Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    selectCustomerType: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    nationalCode: Yup.string().matches(NationalCodeRegex, VALIDNATIONALCODE).required(),
    selectParentCustomer: Yup.object().nullable(true).shape({
      text: Yup.string(),
      id: Yup.number(),
    }),
    email: Yup.string().email(),
    currentCredit: Yup.number(),
    creditLimit: Yup.number(),
    initialCredit: Yup.number(),

    username: Yup.string().required(),
    password: Yup.string().min(8).matches(JustEngPasswordRegex, VALIDENGPASSWORD).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], UNMATCHPASSWORD)
      .required(),
    extendGlobalVirtualSeries: Yup.boolean().nullable(),
    dynamicPickupAllocation: Yup.boolean().nullable(),

    smsNotification: Yup.boolean().nullable(),
    emailNotification: Yup.boolean().nullable(),
    pickupPaperWithEmail: Yup.boolean().nullable(),
    isActive: Yup.boolean().nullable(),
  });

  const CustomerEditValidation = Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    selectCustomerType: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    nationalCode: Yup.string().matches(NationalCodeRegex, VALIDNATIONALCODE).required(),
    selectParentCustomer: Yup.object().nullable(true).shape({
      text: Yup.string(),
      id: Yup.number(),
    }),
    email: Yup.string().email(),
    currentCredit: Yup.number().nullable(),
    creditLimit: Yup.number().nullable(),
    initialCredit: Yup.number().nullable(),

    username: Yup.string().required(),
    extendGlobalVirtualSeries: Yup.boolean().nullable(),
    dynamicPickupAllocation: Yup.boolean().nullable(),

    smsNotification: Yup.boolean().nullable(),
    emailNotification: Yup.boolean().nullable(),
    pickupPaperWithEmail: Yup.boolean().nullable(),
    isActive: Yup.boolean().nullable(),
  });
  return [CustomerAddValidation, CustomerEditValidation];
};

export const CusotmerFormInitialValues = {
  code: "",
  name: "",
  selectCustomerType: {},
  nationalCode: "",

  selectParentCustomer: undefined,
  email: "",
  currentCredit: 0,
  creditLimit: 0,
  initialCredit: 0,

  username: "",
  password: "",
  confirmPassword: "",
  extendGlobalVirtualSeries: false,
  dynamicPickupAllocation: false,

  smsNotification: false,
  emailNotification: false,
  pickupPaperWithEmail: false,
  isActive: true,

  telephones: [],
  addresses: [],

  nationalId: "",
  economicCode: "",
};

export const CustomerFormCurrentValues = (currentData: any) => {
  return {
    code: currentData.code,
    name: currentData.name,
    selectCustomerType: currentData.selectCustomerType,
    nationalCode: currentData.nationalCode,

    selectParentCustomer: currentData.selectParentCustomer,
    email: currentData.email ? currentData.email : "",
    currentCredit: currentData.currentCredit,
    creditLimit: currentData.creditLimit,
    initialCredit: currentData.initialCredit,

    username: currentData.username,
    password: currentData.password,
    confirmPassword: "-",
    extendGlobalVirtualSeries: currentData.extendGlobalVirtualSeries,
    dynamicPickupAllocation: currentData.dynamicPickupAllocation,

    smsNotification: currentData.smsNotification,
    emailNotification: currentData.emailNotification,
    pickupPaperWithEmail: currentData.pickupPaperWithEmail,
    isActive: currentData.isActive,

    telephones: currentData.telephones,
    addresses: currentData.addresses,

    nationalId: currentData.nationalCode,
    economicCode: currentData.economicCode,
  };
};
