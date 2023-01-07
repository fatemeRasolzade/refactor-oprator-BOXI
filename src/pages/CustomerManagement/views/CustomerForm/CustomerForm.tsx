import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../../../../global/Modal/Modal";
import CustomerAddressForm from "./CustomerCommunicationInformation/CustomerAddressForm";
import CustomerTelephoneForm from "./CustomerCommunicationInformation/CustomerTelephoneForm";
import CustomerBasicInformation from "./CustomerBasicInformation";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { createCustomer, editCustomer } from "../../../../services/CustomerApi";
import CustomerUsernameInformation from "./CustomerUsernameInformation";
import CustomerNotificationInformation from "./CustomerNotificationInformation";
import CustomerCommunicationInformation from "./CustomerCommunicationInformation/CustomerCommunicationInformation";
import { customerData } from "../../../../redux/CustomerManagement/CustomerManagementData";
import { CusotmerFormInitialValues, CustomerFormCurrentValues, CustomerFormValidation } from "./CustomerFormVariable";
import { EconomicCodeValidate, NationalCodeValidator, NationalIDValidator } from "../../../../tools/validations/ErrorHelper";

type CustomerFormProps = {
  currentData?: any;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CustomerForm = ({ currentData, open, setOpen }: CustomerFormProps) => {
  const [OpenAddresses, setOpenAddresses] = useState(false);
  const [OpenPhones, setOpenPhones] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [addressModalInfo, setAddressModalInfo] = useState({
    kind: 1,
    data: undefined,
    id: undefined,
  });
  const [phonesModalInfo, setPhonesModalInfo] = useState({
    kind: 1,
    data: undefined,
    id: undefined,
  });
  const handleOpenAddress = (kind?: any, data?: any, id?: any) => {
    setAddressModalInfo({ kind, data, id });
    setOpenAddresses(true);
  };
  const handleOpenPhone = (kind?: any, data?: any, id?: any) => {
    setPhonesModalInfo({ kind, data, id });
    setOpenPhones(true);
  };
  const [CustomerAddValidation, CustomerEditValidation] = CustomerFormValidation();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: currentData ? CustomerEditValidation : CustomerAddValidation,
    initialValues: currentData ? CustomerFormCurrentValues(currentData) : CusotmerFormInitialValues,
    validate: (values) => {
      const errors = {};
      if (values.selectCustomerType?.id === 0) {
        const [isValidNC, errNC] = NationalCodeValidator(values.nationalCode, true);
        if (!isValidNC) {
          // @ts-ignore
          errors.nationalCode = errNC;
        }
      }
      if (values.selectCustomerType?.id === 1) {
        const [isValidNI, errNI] = NationalIDValidator(values.nationalId, true);
        if (!isValidNI) {
          // @ts-ignore
          errors.nationalId = errNI;
        }
        const [isValidEC, errEC] = EconomicCodeValidate(values.economicCode, true);
        if (values.selectCustomerType?.id === 1 && !isValidEC) {
          // @ts-ignore
          errors.economicCode = errEC;
        }
      }
      // alert("HERE1");

      return errors;
    },
    onSubmit: (values: any) => {
      setLoading(true);
      if (currentData) {
        // alert("HERE2");
        editCustomer({
          ...values,
          id: currentData.id,
          password: undefined,
          confirmPassword: undefined,
          nationalCode: values.selectThirdPartyType?.id === 0 ? values.nationalCode : "",
          nationalId: values.selectThirdPartyType?.id === 1 ? values.nationalId : "",
          economicCode: values.selectThirdPartyType?.id === 1 ? values.economicCode : "",
          addresses: values.addresses.map((a: any) => {
            return {
              ...a,
              id: a.id.toString().includes("null") ? undefined : a.id,
            };
          }),
          telephones: values.telephones.map((t: any) => {
            return {
              ...t,
              id: t.id.toString().includes("null") ? undefined : t.id,
            };
          }),
        })
          .then(() => {
            dispatch(customerData({}) as any);
            setOpen(false);
            toast.success("مشتری ویرایش شد ");
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        // alert("thiis is true");
        createCustomer({
          ...values,
          nationalCode: values.selectThirdPartyType?.id === 0 ? values.nationalCode : "",
          nationalId: values.selectThirdPartyType?.id === 1 ? values.nationalId : "",
          economicCode: values.selectThirdPartyType?.id === 1 ? values.economicCode : "",
          currentCredit: parseInt(values.currentCredit),
          creditLimit: parseInt(values.creditLimit),
          initialCredit: parseInt(values.initialCredit),
          confirmPassword: undefined,
          addresses: values.addresses.map((a: any) => {
            return { ...a, id: undefined };
          }),
          telephones: values.telephones.map((a: any) => {
            return { ...a, id: undefined };
          }),
        })
          .then(() => {
            dispatch(customerData({}) as any);
            setOpen(false);
            toast.success("مشتری افزوده شد ");
          })
          .finally(() => setLoading(false));
      }
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;

  const handleCloseCustomerForm = () => setOpen(false);

  useEffect(() => {
    handleReset();
  }, [handleReset, open]);

  return (
    <>
      {/* <AddExcel excelInfo={CustomerExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} /> */}
      <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش مشتری" : "افزودن مشتری"}>
        <form onSubmit={handleSubmit}>
          <CustomerBasicInformation formik={formik} open={open} currentData={currentData} />
          <CustomerUsernameInformation formik={formik} currentData={currentData} />
          <CustomerNotificationInformation formik={formik} />
          <CustomerCommunicationInformation formik={formik} handleOpenAddress={handleOpenAddress} handleOpenPhone={handleOpenPhone} />
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={handleCloseCustomerForm} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton loading={Loading} type="submit" text={currentData ? "ویرایش" : "افزودن"} className="full-tomato-btn" />
          </div>
        </form>
        <CustomerAddressForm
          setValue={setFieldValue}
          value={values.addresses}
          open={OpenAddresses}
          setOpen={setOpenAddresses}
          currentData={addressModalInfo.kind === 2 ? addressModalInfo.data : undefined}
          ID={addressModalInfo.kind === 2 ? addressModalInfo.id : undefined}
        />
        <CustomerTelephoneForm
          setValue={setFieldValue}
          value={values.telephones}
          open={OpenPhones}
          setOpen={setOpenPhones}
          currentData={phonesModalInfo.kind === 2 ? phonesModalInfo.data : undefined}
          ID={phonesModalInfo.kind === 2 ? phonesModalInfo.id : undefined}
        />
      </Modal>
    </>
  );
};

export default CustomerForm;
