import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../../../../global/Modal/Modal";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomerTelephoneElements from "../CustomerTelephoneElements";
import CustomerAddressElements from "../CustomerAddressElements";
import { ReverseArray } from "../../../../tools/functions/Methods";
import CustomerAddressForm from "../CustomerAddressForm";
import CustomerTelephoneForm from "../CustomerTelephoneForm";
import { createCustomer, editCustomer } from "../../../../services/CustomerApi";
import { customerData } from "../../../../redux/CustomerManagement/CustomerManagementData";
import { deleteAddress, deletePhone } from "../../../../services/GlobalApi";
import { AiOutlineEdit } from "react-icons/ai";
import AddButton from "../../../../global/addButton/AddButton";
import AddExcel from "../../../../components/exel/AddExcel";
import { CustomerExcel } from "../../../../tools/services/ExcelInfoFile";
import { CusotmerFormInitialValues, CustomerFormCurrentValues, CustomerFormVariable } from "./CustomerFormVariable";
import CustomerBasicInformation from "./CustomerBasicInformation";
import CustomerUsernameInformation from "./CustomerUsernameInformation";
import CustomerNotificationInformation from "./CustomerNotificationInformation";

type CustomerFormProps = {
  currentData?: any;
};

const CustomerForm = ({ currentData }: CustomerFormProps) => {
  const [open, setOpen] = useState(false);
  const [OpenAddresses, setOpenAddresses] = useState(false);
  const [OpenPhones, setOpenPhones] = useState(false);
  const [OpenExcel, setOpenExcel] = useState(false);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleOpenAddress = (kind?: any, data?: any, id?: any) => {
    setAddressModalInfo({ kind, data, id });
    setOpenAddresses(true);
  };

  const handleOpenPhone = (kind?: any, data?: any, id?: any) => {
    setPhonesModalInfo({ kind, data, id });
    setOpenPhones(true);
  };

  const handleDeleteAddressElements = (id?: any) => {
    if (id.toString().includes("null")) {
      const filtered = values.addresses.filter((a: any) => a.id !== id);
      setFieldValue("addresses", filtered);
    } else {
      deleteAddress(id)
        .then(() => {
          const filtered = values.addresses.filter((a: any) => a.id !== id);
          setFieldValue("addresses", filtered);
        })
        .catch(() => {
          toast.error("حذف آدرس با مشکل مواجه شده است");
        });
    }
  };

  const handleDeleteTelephonesElements = (id: any) => {
    if (id.toString().includes("null")) {
      const filtered = values.telephones.filter((t: any) => t.id !== id);
      setFieldValue("telephones", filtered);
    } else {
      deletePhone(id)
        .then(() => {
          const filtered = values.telephones.filter((t: any) => t.id !== id);
          setFieldValue("telephones", filtered);
        })
        .catch(() => {
          toast.error("حذف تلفن با مشکل مواجه شده است");
        });
    }
  };

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

  const [CustomerAddValidation, CustomerEditValidation] = CustomerFormVariable();
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: currentData ? CustomerEditValidation : CustomerAddValidation,
    initialValues: currentData ? CustomerFormCurrentValues(currentData) : CusotmerFormInitialValues,
    // validate: (values) => {
    //   const errors = {};
    //   const [isValidNC, errNC] = NationalCodeValidator(
    //     values.nationalCode,
    //     true
    //   );
    //   if (values.selectCustomerType?.id === 0 && !isValidNC) {
    //     errors.nationalCode = errNC;
    //   }
    //   if (values.selectCustomerType?.id === 1) {
    //     const [isValidNI, errNI] = NationalIDValidator(values.nationalId, true);
    //     if (values.selectCustomerType?.id === 1 && !isValidNI) {
    //       errors.nationalId = errNI;
    //     }
    //     const [isValidEC, errEC] = EconomicCodeValidate(
    //       values.economicCode,
    //       true
    //     );
    //     if (values.selectCustomerType?.id === 1 && !isValidEC) {
    //       errors.economicCode = errEC;
    //     }
    //   }
    //   return errors;
    // },
    onSubmit: (values: any, { resetForm }) => {
      setLoading(true);
      if (currentData) {
        editCustomer({
          ...values,
          id: currentData.id,
          password: undefined,
          confirmPassword: undefined,
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
            dispatch(customerData({}) as any);
            setOpen(false);
            response.status && toast.success("مشتری ویرایش شد ");
          })
          .catch((error) => {})
          .finally(() => setLoading(false));
      } else {
        createCustomer({
          ...values,
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
  const { values, handleSubmit, setFieldValue }: any = formik;

  const handleOpenModal = () => setOpen(true);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن مشتری" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  return (
    <>
      {currentData ? (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={handleOpenModal}>
          <AiOutlineEdit className="w-[20px] h-[20px]" size={15} />
        </button>
      ) : (
        <AddButton ToggleOptions={ToggleOptions} />
      )}
      <AddExcel excelInfo={CustomerExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} />
      <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش مشتری" : "افزودن مشتری"}>
        <form onSubmit={handleSubmit}>
          <CustomerBasicInformation formik={formik} open={open} />
          <CustomerUsernameInformation formik={formik} currentData={currentData} />
          <CustomerNotificationInformation formik={formik} />
          <div className="flex justify-between items-start gap-10 ">
            <div className="border rounded-lg px-4 py-8 mt-5 relative w-full">
              <span className="absolute -top-3 right-8 z-10 px-2 bg-light text-darkGray">آدرس </span>
              <p className="text-tomato text-sm cursor-pointer mb-5 text-right" onClick={() => handleOpenAddress(1)}>
                + افزودن آدرس جدید
              </p>
              {values.addresses.length > 0 &&
                ReverseArray(values.addresses).map((address: any) => (
                  <>
                    <CustomerAddressElements
                      address={address}
                      handleEdit={() => handleOpenAddress(2, address, address.id)}
                      handleDelete={() => handleDeleteAddressElements(address.id)}
                    />
                  </>
                ))}
            </div>
            <div className="border rounded-lg px-4 py-8 mt-5 relative w-full">
              <span className="absolute -top-3 right-8 z-10 px-2 bg-light text-darkGray">اطلاعات تماس </span>
              <p className="text-tomato text-sm cursor-pointer mb-5 text-right" onClick={() => handleOpenPhone(1)}>
                + افزودن اطلاعات تماس جدید
              </p>
              {values.telephones.length > 0 &&
                ReverseArray(values.telephones).map((phone: any) => (
                  <>
                    <CustomerTelephoneElements
                      phone={phone}
                      handleEdit={() => handleOpenPhone(2, phone, phone.id)}
                      handleDelete={() => handleDeleteTelephonesElements(phone.id)}
                    />
                  </>
                ))}
            </div>
          </div>
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={() => setOpen(false)} text="لغو" className="full-lightTomato-btn" />
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
