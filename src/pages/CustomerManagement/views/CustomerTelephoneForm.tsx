import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { v4 as uuidv4 } from "uuid";

import Modal from "../../../global/Modal/Modal";
import InputSelect from "../../../global/InputSelect/InputSelect";

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
  //   const getPhoneKind = useCallback(() => {
  //     getTelePhonesKind()
  //       .then((response) => {
  //         const options = response.data.payload.map(({ id: value, ...rest }) => ({
  //           value,
  //           ...rest,
  //         }));
  //         const options1 = options.map(({ text: label, ...rest }) => ({
  //           label,
  //           ...rest,
  //         }));
  //         setPhoneKind(options1);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     if (open) {
  //       getPhoneKind();
  //     }
  //   }, [open]);

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
          selectPhoneType: {},
        },
    onSubmit: (values: any, { resetForm }) => {
      //   setState({ loading: true, error: false });
      if (currentData) {
        // edit
        setOpen(false);
        resetForm({ values: "" });
        let newArray = [...value];
        let index = newArray.findIndex((a) => a.id === ID);
        newArray[index] = values;
        setValue("telephones", newArray);
        // setState({ loading: false, error: false });
      } else {
        setOpen(false);
        resetForm({ values: "" });
        setValue("telephones", [
          ...value,
          //   { ...values, id: `null${uuidv4()}` },
        ]);
        // setState({ loading: false, error: false });
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
            name="selectPhoneType"
            values={values.selectPhoneType}
            error={touched.selectPhoneType && errors.selectPhoneType}
            handleChange={(value: any) => {
              setFieldValue("selectPhoneType", {
                id: value.value,
                text: value.label,
              });
            }}
          />
        <InputSelect
            important
            options={[]}
            label="تلفن"
            name="telNumber"
            values={values.telNumber}
            error={touched.telNumber && errors.telNumber}
            handleChange={(value: any) => {
              setFieldValue("telNumber", {
                id: value.value,
                text: value.label,
              });
            }}
          />
        </div>
        {/* <div className="formInputSection">
          


          <FormGroup
            required={true}
            error={touched.telephonePrefix && errors.telephonePrefix}
            input={{
              id: "telephonePrefix",
              name: "telephonePrefix",
              placeholder: "",
              value: values.telephonePrefix,
              onChange: handleChange,
            }}
            label="پیش شماره "
          />
        </div>

        <div className="btnsection">
          <Button theme="secondarypopUpButton" onClick={handleCloseModal}>
            لغو
          </Button>
          <Button theme="mainpopUpButton">
            {currentData ? "ویرایش" : "افزودن"}
            {state.loading && (
              <ClipLoader
                className="inline-flex items-center"
                size={24}
                loading={true}
                color="#FFF"
              />
            )}
          </Button>
        </div> */}
      </form>
    </Modal>
  );
};

export default CustomerTelephoneForm;
