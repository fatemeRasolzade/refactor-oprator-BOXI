import InputText from "../../../global/InputText/InputText";
import Modal from "../../../global/Modal/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { NationalCodeRegex } from "../../../tools/validations/ErrorHelper";
import { VALIDNATIONALCODE } from "../../../tools/validations/ErrorKeywords";
import InputSelect from "../../../global/InputSelect/InputSelect";
import Checkbox from "../../../components/checkbox/Checkbox";
import CustomSwitch from "../../../global/Switch/Switch";
import { useEffect, useState } from "react";
import CustomerTelephoneElements from "./CustomerTelephoneElements";
import CustomerAddressElements from "./CustomerAddressElements";
import { ReverseArray } from "../../../tools/functions/Methods";
import CustomerAddressForm from "./CustomerAddressForm";
import CustomerTelephoneForm from "./CustomerTelephoneForm";
import { GetCustomerType } from "../../../services/SelectApi";
import { apiRoute } from "../../../services/apiRoute";

type CustomerFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  currentData?: any;
};

const CustomerForm = ({ open, setOpen, currentData }: CustomerFormProps) => {
  const [OpenAddresses, setOpenAddresses] = useState(false);
  const [OpenPhones, setOpenPhones] = useState(false);
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
      //    deleteAddress(id)
      //      .then(() => {
      //        const filtered = values.addresses.filter((a) => a.id !== id);
      //        setFieldValue("addresses", filtered);
      //      })
      //      .catch(() => {
      //        toast.error("حذف آدرس با مشکل مواجه شده است");
      //      });
    }
  };

  const handleDeleteTelephonesElements = (id: any) => {
    if (id.toString().includes("null")) {
      const filtered = values.telephones.filter((t: any) => t.id !== id);
      setFieldValue("telephones", filtered);
    } else {
      //  Call delete customer phone api
      //  deletePhones(id)
      //    .then(() => {
      //      const filtered = values.telephones.filter((t) => t.id !== id);
      //      setFieldValue("telephones", filtered);
      //    })
      //    .catch(() => {
      //      toast.error("حذف تلفن با مشکل مواجه شده است");
      //    });
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

  useEffect(() => {
    // console.log(GetCustomerType(apiRoute().get.GET_CUSTOMER_TYPE));
    // GetCustomerType(apiRoute().get.GET_CUSTOMER_TYPE);
  }, []);

  const validation = Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    selectCustomerType: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    nationalCode: Yup.string()
      .matches(NationalCodeRegex, VALIDNATIONALCODE)
      .required(),
    selectParentCustomer: Yup.object().nullable(true).shape({
      text: Yup.string(),
      id: Yup.number(),
    }),
    email: Yup.string().email(),
    currentCredit: Yup.number().label(""),
    creditLimit: Yup.number().label(""),
    initialCredit: Yup.number().label(""),

    username: Yup.string().required(),
    // password:
    // 	!currentData &&
    // 	Yup.string().min(8, "حداقل هشت کاراکتر").matches(justENGRegex,  "رمز عبور باید شامل اعداد و حروف لاتین باشد").required(),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "رمز عبور مطابقت ندارد")
    //   .required(),
    extendGlobalVirtualSeries: Yup.boolean().nullable(),
    dynamicPickupAllocation: Yup.boolean().nullable(),

    smsNotification: Yup.boolean().nullable(),
    emailNotification: Yup.boolean().nullable(),
    pickupPaperWithEmail: Yup.boolean().nullable(),
    isActive: Yup.boolean().nullable(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          // edit feilds
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
        }
      : {
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
        },
    onSubmit: (values, { resetForm }) => {
      // setState({ loading: true, error: false });
      if (currentData) {
        // console.log(a.id.toString().includes("null"));
        // editCustomer({
        // 	...values,
        // 	id: currentData.id,
        // 	password: undefined,
        // 	confirmPassword: undefined,
        // 	addresses: values.addresses.map((a) => {
        // 		return { ...a, id: a.id.toString().includes("null") ? undefined : a.id };
        // 	}),
        // 	telephones: values.telephones.map((t) => {
        // 		return { ...t, id: t.id.toString().includes("null") ? undefined : t.id };
        // 	}),
        // })
        // 	.then((response) => {
        // 		setState({ loading: false, error: false });
        // 		action({
        // 			type: REFRESH,
        // 			payload: !refresh,
        // 		});
        // 		resetForm({ values: "" });
        // 		closeModal();
        // 		response.status && toast.success("مشتری ویرایش شد ");
        // 	})
        // 	.catch((error) => {
        // 		setState({ loading: false, error: error.response.data.message });
        // 	});
      } else {
        // delete values.id;
        // createCustomer({
        // 	...values,
        // 	currentCredit: parseInt(values.currentCredit),
        // 	creditLimit: parseInt(values.creditLimit),
        // 	initialCredit: parseInt(values.initialCredit),
        // 	confirmPassword: undefined,
        // 	addresses: values.addresses.map((a) => {
        // 		return { ...a, id: undefined };
        // 	}),
        // 	telephones: values.telephones.map((a) => {
        // 		return { ...a, id: undefined };
        // 	}),
        // })
        // 	.then((response) => {
        // 		setState({ loading: false, error: false });
        // 		action({
        // 			type: REFRESH,
        // 			payload: !refresh,
        // 		});
        // 		resetForm({ values: "" });
        // 		closeModal();
        // 		response.status && toast.success("مشتری افزوده شد ");
        // 	})
        // 	.catch((error) => {
        // 		setState({ loading: false, error: error.response.data.message });
        // 	});
      }
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: any = formik;

  return (
    <Modal
      visible={open}
      setVisible={setOpen}
      title={currentData ? "ویرایش مشتری" : "افزودن مشتری"}
    >
      <form onSubmit={handleSubmit}>
        <div className="border rounded-lg px-5 pt-10">
          <div className="inputRow">
            <InputText
              important
              label="کد مشتری"
              values={values.code}
              name="code"
              handleChange={handleChange}
              error={touched.code && errors.code}
            />
            <InputText
              important
              label="نام مشتری"
              values={values.name}
              name="name"
              handleChange={handleChange}
              error={touched.name && errors.name}
            />
            <InputSelect
              options={[]}
              important
              label="نوع مشتری"
              values={values.selectCustomerType}
              name="selectCustomerType"
              handleChange={handleChange}
              error={touched.selectCustomerType && errors.selectCustomerType}
            />
            <InputText
              important
              label="کد ملی"
              values={values.nationalCode}
              name="nationalCode"
              handleChange={handleChange}
              error={touched.nationalCode && errors.nationalCode}
            />
          </div>
          <div className="inputRow">
            <InputSelect
              options={[]}
              label="مشتری والد"
              values={values.selectParentCustomer}
              name="selectParentCustomer"
              handleChange={handleChange}
              error={
                touched.selectParentCustomer && errors.selectParentCustomer
              }
            />
            <InputText
              label="پست الکترونیکی"
              values={values.email}
              name="email"
              handleChange={handleChange}
              error={touched.email && errors.email}
              placeholder="example@example.com"
            />
            <InputText
              readOnly
              label="اعتبار جاری"
              values={values.currentCredit}
              name="currentCredit"
              handleChange={handleChange}
              error={touched.currentCredit && errors.currentCredit}
            />
            <InputText
              readOnly
              label="سقف اعتبار"
              values={values.creditLimit}
              name="creditLimit"
              handleChange={handleChange}
              error={touched.creditLimit && errors.creditLimit}
            />
            <InputText
              readOnly
              label="اعتبار اولیه"
              values={values.initialCredit}
              name="initialCredit"
              handleChange={handleChange}
              error={touched.initialCredit && errors.initialCredit}
            />
          </div>
        </div>
        <div className="inputRow">
          <div className="border rounded-lg px-5 pt-10 mt-10 relative">
            <span className="absolute -top-3 right-8 z-10 px-2 bg-light text-darkGray">
              اطلاعات کاربری
            </span>
            <div className="inputRow">
              <InputText
                important
                label="نام کاربری"
                values={values.username}
                name="username"
                handleChange={handleChange}
                error={touched.username && errors.username}
              />
              <InputText
                important
                label="گذر واژه "
                values={values.password}
                name="password"
                handleChange={handleChange}
                error={touched.password && errors.password}
              />
              <InputText
                important
                label="تایید گذرواژه"
                values={values.confirmPassword}
                name="confirmPassword"
                handleChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </div>
          </div>
          <div className="inputRow mt-16">
            <Checkbox
              handleChange={handleChange}
              name="extendGlobalVirtualSeries"
              values={values.extendGlobalVirtualSeries}
              title="استفاده از منبع بارکد عمومی"
            />
            <Checkbox
              handleChange={handleChange}
              name="dynamicPickupAllocation"
              values={values.dynamicPickupAllocation}
              title="تخصیص خودکار جمع آوری"
            />
          </div>
        </div>

        <div className="inputRow">
          <div className="border rounded-lg px-5 pt-8 mt-5 relative">
            <span className="absolute -top-3 right-8 z-10 px-2 bg-light text-darkGray">
              اطلاع رسانی جمع آوری از طریق
            </span>
            <div className="inputRow">
              <Checkbox
                handleChange={handleChange}
                name="emailNotification"
                values={values.emailNotification}
                title="پست الکترونیک  "
              />
              <Checkbox
                handleChange={handleChange}
                name="smsNotification"
                values={values.smsNotification}
                title="پیامک"
              />
              <Checkbox
                handleChange={handleChange}
                name="pickupPaperWithEmail"
                values={values.pickupPaperWithEmail}
                title="دریافت رسید تحویل از طریق پست الکترونیک"
              />
            </div>
          </div>
          <div className="centering w-6/12 mt-5">
            <CustomSwitch />
          </div>
        </div>
        <div className="flex justify-between items-start gap-10 ">
          <div className="border rounded-lg px-4 py-8 mt-5 relative w-full">
            <span className="absolute -top-3 right-8 z-10 px-2 bg-light text-darkGray">
              آدرس{" "}
            </span>
            <p
              className="text-tomato text-sm cursor-pointer mb-5"
              onClick={() => handleOpenAddress(1)}
            >
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
            <span className="absolute -top-3 right-8 z-10 px-2 bg-light text-darkGray">
              اطلاعات تماس{" "}
            </span>
            <p
              className="text-tomato text-sm cursor-pointer mb-5"
              onClick={() => handleOpenPhone(1)}
            >
              + افزودن اطلاعات تماس جدید
            </p>
            {values.telephones.length > 0 &&
              ReverseArray(values.telephones).map((phone: any) => (
                <>
                  <CustomerTelephoneElements
                    phone={phone}
                    handleEdit={() => handleOpenPhone(2, phone, phone.id)}
                    handleDelete={() =>
                      handleDeleteTelephonesElements(phone.id)
                    }
                  />
                </>
              ))}
          </div>
        </div>
        <div className="flex-end-center mt-5 gap-3">
          <SimpleButton text="لغو" className="full-lightTomato-btn w-20" />
          <SimpleButton text="افزودن" className="full-tomato-btn w-20" />
        </div>
        {/* <button type={"submit"}>hwsjfsdf</button> */}
      </form>
      <CustomerAddressForm
        setValue={setFieldValue}
        value={values.addresses}
        open={OpenAddresses}
        setOpen={setOpenAddresses}
        currentData={
          addressModalInfo.kind === 2 ? addressModalInfo.data : undefined
        }
        ID={addressModalInfo.kind === 2 ? addressModalInfo.id : undefined}
      />
      <CustomerTelephoneForm
        setValue={setFieldValue}
        value={values.telephones}
        open={OpenPhones}
        setOpen={setOpenPhones}
        currentData={
          phonesModalInfo.kind === 2 ? phonesModalInfo.data : undefined
        }
        ID={phonesModalInfo.kind === 2 ? phonesModalInfo.id : undefined}
      />
    </Modal>
  );
};

export default CustomerForm;
