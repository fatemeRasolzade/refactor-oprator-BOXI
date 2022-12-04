import InputText from "../../../global/InputText/InputText";
import Modal from "../../../global/Modal/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { NationalCodeRegex } from "../../../tools/validations/ErrorHelper";
import { VALIDNATIONALCODE } from "../../../tools/validations/ErrorKeywords";
import InputSelect from "../../../global/InputSelect/InputSelect";

type CustomerFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  currentData?: any;
};

const CustomerForm = ({ open, setOpen, currentData }: CustomerFormProps) => {
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
      alert(values.code);
      console.log("***************");
      console.log(values.code);

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
            // important
            label="کد ملی"
            values={values.selectCustomerType}
            name="selectCustomerType"
            handleChange={handleChange}
            // error={touched.selectCustomerType && errors.selectCustomerType}
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
          <InputText
            important
            label="پست الکترونیکی"
            values={values.email}
            name="email"
            handleChange={handleChange}
            error={touched.email && errors.email}
          />
          <InputText
            important
            label="اعتبار جاری"
            values={values.currentCredit}
            name="currentCredit"
            handleChange={handleChange}
            error={touched.currentCredit && errors.currentCredit}
          />
          <InputText
            important
            label="سقف اعتبار"
            values={values.creditLimit}
            name="creditLimit"
            handleChange={handleChange}
            error={touched.creditLimit && errors.creditLimit}
          />
          <InputText
            important
            label="اعتبار اولیه"
            values={values.initialCredit}
            name="initialCredit"
            handleChange={handleChange}
            error={touched.initialCredit && errors.initialCredit}
          />
        </div>

        <button type={"submit"}>hwsjfsdf</button>
      </form>
    </Modal>
  );
};

export default CustomerForm;
