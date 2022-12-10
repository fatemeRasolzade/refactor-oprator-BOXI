import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import * as Yup from "yup";
import { useFormik } from "formik";
// import { v4 as uuidv4 } from "uuid";

import Modal from "../../../global/Modal/Modal";
import InputSelect from "../../../global/InputSelect/InputSelect";
import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

const CustomerTelephoneForm = ({
  open,
  setOpen,
  currentData,
  setValue,
  value,
  ID,
}: any) => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    response: null,
  });

  const [phoneKind, setPhoneKind] = useState([]);

  //get required data
const initPhoneType = () => {
  
}

     useEffect(() => {
       if (open) {
         initPhoneType();
       }
     }, [open]);

  // start fromik configurations
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
          // edit feilds
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
        resetForm({ values: "" });
        let newArray = [...value];
        let index = newArray.findIndex((a) => a.id === ID);
        newArray[index] = values;
        setValue("telephones", newArray);
      } else {
        const id: string = uuid();
        setOpen(false);
        resetForm({ values: "" });
        setValue("telephones", [...value, { ...values, id: `null${id}` }]);
      }
    },
  });
  // end formik configuration

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    formik;

  const handleCloseModal = (e: any) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <Modal
      visible={open}
      setVisible={setOpen}
      title={currentData ? "ویرایش آدرس" : "افزودن آدرس"}
    >
      <form onSubmit={handleSubmit}>
        <div className="inputRow">
          <InputSelect
            important
            options={[]}
            label="تماس از طریق"
            values={{
              value: values?.selectPhoneType?.id,
              label: values?.selectPhoneType?.text,
            }}
            name="selectPhoneType"
            handleChange={handleChange}
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
          <InputText
            important
            label=" پیش شماره"
            values={values.telephonePrefix}
            name="telephonePrefix"
            handleChange={handleChange}
            error={touched.telephonePrefix && errors.telephonePrefix}
          />
        </div>
        <div className="flex-end-center gap-3">
          <SimpleButton
            text="لغو"
            className="full-lightTomato-btn"
            handelClick={() => setOpen(false)}
          />
          <SimpleButton
            type="submit"
            className="full-tomato-btn"
            text={currentData ? "ویرایش" : "افزودن"}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CustomerTelephoneForm;
