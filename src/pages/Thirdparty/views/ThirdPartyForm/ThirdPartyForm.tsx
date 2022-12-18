import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../../../global/Modal/Modal";
import AddExcel from "../../../../components/exel/AddExcel";
import AddButton from "../../../../global/addButton/AddButton";
import { ThirdPartyExcel } from "../../../../tools/services/ExcelInfoFile";
import ThirdPartyBasicInformation from "./ThirdPartyBasicInformation";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import ThirdPartyAddressForm from "./ThirdPartyCommunicationInformation/ThirdPartyAddressForm";
import ThirdPartyTelephoneForm from "./ThirdPartyCommunicationInformation/ThirdPartyTelephoneForm";
import { EconomicCodeValidate, NationalCodeValidator, NationalIDValidator } from "../../../../tools/validations/ErrorHelper";
import { ThirdPartyFormCurrentValues, ThirdPartyFormInitialValues, ThirdPartyFormValidation } from "./ThirdPartyFormVariable";
import ThirdPartyCommunicationInformation from "./ThirdPartyCommunicationInformation/ThirdPartyCommunicationInformation";
import { createThirdParty, editThirdParty } from "../../../../services/ThirdPartyApi";
import { thirdPartyData } from "../../../../redux/ThirdParty/ThirdPartyData";

type CustomerFormProps = {
  currentData?: any;
};

const ThirdPartyForm = ({ currentData }: CustomerFormProps) => {
  const [open, setOpen] = useState(false);
  const [OpenAddresses, setOpenAddresses] = useState(false);
  const [OpenPhones, setOpenPhones] = useState(false);
  const [OpenExcel, setOpenExcel] = useState(false);
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

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ThirdPartyFormValidation,
    initialValues: currentData ? ThirdPartyFormCurrentValues(currentData) : ThirdPartyFormInitialValues,
    validate: (values) => {
      const errors = {};
      if (values.selectThirdPartyType?.id === 0) {
        const [isValidNC, errNC] = NationalCodeValidator(values.nationalCode, true);
        if (!isValidNC) {
          // @ts-ignore
          errors.nationalCode = errNC;
        }
      }
      if (values.selectThirdPartyType?.id === 1) {
        const [isValidNI, errNI] = NationalIDValidator(values.nationalId, true);
        if (!isValidNI) {
          // @ts-ignore
          errors.nationalId = errNI;
        }
        const [isValidEC, errEC] = EconomicCodeValidate(values.economicCode, true);
        if (values.selectThirdPartyType?.id === 1 && !isValidEC) {
          // @ts-ignore
          errors.economicCode = errEC;
        }
      }
      return errors;
    },
    onSubmit: (values: any) => {
      setLoading(true);
      if (currentData) {
        editThirdParty({
          ...values,
          id: currentData.id,
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
          .then((response) => {
            dispatch(thirdPartyData({}) as any);
            setOpen(false);
            response.status && toast.success("شخصیت ویرایش شد ");
          })
          .catch((error) => {})
          .finally(() => setLoading(false));
      } else {
        createThirdParty({
          ...values,
          addresses: values.addresses.map((a: any) => {
            return { ...a, id: undefined };
          }),
          telephones: values.telephones.map((a: any) => {
            return { ...a, id: undefined };
          }),
        })
          .then(() => {
            dispatch(thirdPartyData({}) as any);
            setOpen(false);
            toast.success("شخصیت افزوده شد ");
          })
          .finally(() => setLoading(false));
      }
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;
  const handleOpenModal = () => setOpen(true);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن شخصیت" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const handleCloseCustomerForm = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <>
      {currentData ? (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={handleOpenModal}>
          <AiOutlineEdit className="w-[20px] h-[20px]" size={15} />
        </button>
      ) : (
        <AddButton ToggleOptions={ToggleOptions} />
      )}
      <AddExcel excelInfo={ThirdPartyExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} />
      <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش مشتری" : "افزودن مشتری"}>
        <form onSubmit={handleSubmit}>
          <ThirdPartyBasicInformation formik={formik} open={open} currentData={currentData} />
          <ThirdPartyCommunicationInformation formik={formik} handleOpenAddress={handleOpenAddress} handleOpenPhone={handleOpenPhone} />
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={handleCloseCustomerForm} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton loading={Loading} type="submit" text={currentData ? "ویرایش" : "افزودن"} className="full-tomato-btn" />
          </div>
        </form>
        <ThirdPartyAddressForm
          setValue={setFieldValue}
          value={values.addresses}
          open={OpenAddresses}
          setOpen={setOpenAddresses}
          currentData={addressModalInfo.kind === 2 ? addressModalInfo.data : undefined}
          ID={addressModalInfo.kind === 2 ? addressModalInfo.id : undefined}
        />
        <ThirdPartyTelephoneForm
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

export default ThirdPartyForm;
