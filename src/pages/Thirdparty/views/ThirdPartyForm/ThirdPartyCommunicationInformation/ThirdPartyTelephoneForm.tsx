import { useEffect, useState } from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import Modal from "../../../../../global/Modal/Modal";
import InputText from "../../../../../global/InputText/InputText";
import { getPhoneType } from "../../../../../services/GlobalApi";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";

const ThirdPartyTelephoneForm = ({ open, setOpen, currentData, setValue, value, ID }: any) => {
  const [PhoneType, setPhoneType] = useState([]);

  const initPhoneType = () => {
    getPhoneType().then((res) => setPhoneType(res));
  };

  useEffect(() => {
    if (open) initPhoneType();
  }, [open]);

  const validation = Yup.object().shape({
    selectPhoneType: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    telNumber: Yup.number().required(),
    telephonePrefix: Yup.number().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData.id,
          telNumber: currentData.telNumber,
          telephonePrefix: currentData.telephonePrefix,
          selectPhoneType: currentData.selectPhoneType,
        }
      : {
          telNumber: "",
          telephonePrefix: "",
          selectPhoneType: {} as any,
        },
    onSubmit: (values: any, { resetForm }) => {
      if (currentData) {
        // edit
        setOpen(false);
        let newArray = [...value];
        let index = newArray.findIndex((a) => a.id === ID);
        newArray[index] = { ...values, telephonePrefix: values.selectPhoneType.id === 1 ? value.telephonePrefix : "" };
        setValue("telephones", newArray);
      } else {
        const id: string = uuid();
        setOpen(false);
        setValue("telephones", [
          ...value,
          { ...values, id: `null${id}`, telephonePrefix: values.selectPhoneType.id === 1 ? value.telephonePrefix : "" },
        ]);
      }
    },
  });
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

  useEffect(() => {
    resetForm({ values: "" });
  }, [resetForm, open]);

  return (
    <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش اطلاعات تماس" : "افزودن اطلاعات تماس"}>
      <form onSubmit={handleSubmit}>
        <div className="inputRow">
          <InputSelect
            important
            options={PhoneType}
            label="تماس از طریق"
            values={values.selectPhoneType}
            name="selectPhoneType"
            handleChange={setFieldValue}
            error={touched.selectPhoneType && errors.selectPhoneType}
          />

          <InputText
            important
            label=" تلفن"
            values={values.telNumber}
            name="telNumber"
            handleChange={handleChange}
            error={touched.telNumber && errors.telNumber}
          />
          {values.selectPhoneType.id !== 1 && (
            <InputText
              important
              label=" پیش شماره"
              values={values.telephonePrefix}
              name="telephonePrefix"
              handleChange={handleChange}
              error={touched.telephonePrefix && errors.telephonePrefix}
            />
          )}
        </div>
        <div className="flex-end-center gap-3">
          <SimpleButton text="لغو" className="full-lightTomato-btn" handelClick={() => setOpen(false)} />
          <SimpleButton type="submit" className="full-tomato-btn" text={currentData ? "ویرایش" : "افزودن"} />
        </div>
      </form>
    </Modal>
  );
};

export default ThirdPartyTelephoneForm;
