import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../../../../../global/Modal/Modal";
import InputText from "../../../../../global/InputText/InputText";
import CustomSwitch from "../../../../../global/Switch/Switch";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import { PostalCodeRegex } from "../../../../../tools/validations/ErrorHelper";
import { VALIDPOSTALCODE } from "../../../../../tools/validations/RegexKeywords";
import { getAddressType, getCities, getProvinces, getRegions } from "../../../../../services/GlobalApi";

const CustomerAddressForm = ({ open, setOpen, currentData, setValue, value, ID }: any) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [addressKind, setAddressKind] = useState([]);

  const initAddressKind = () => {
    getAddressType().then((res) => {
      setAddressKind(res);
    });
  };

  const initCities = () => {
    getCities().then((res) => {
      setCities(res);
    });
  };

  const initRegions = () => {
    getRegions().then((res) => {
      setRegions(res);
    });
  };

  const initProvinces = () => {
    getProvinces().then((res) => {
      setProvinces(res);
    });
  };

  useEffect(() => {
    if (open) {
      initAddressKind();
      initCities();
      initRegions();
      initProvinces();
    }
  }, [open]);

  const validation = Yup.object().shape({
    selectAddressType: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    selectState: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    selectCity: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    selectRegion: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    pelak: Yup.string().required(),
    unit: Yup.number().required(),
    postalCode: Yup.string().matches(PostalCodeRegex, VALIDPOSTALCODE),
    isActive: Yup.boolean().nullable(),
    latitude: Yup.number().nullable(true),
    longtitude: Yup.number().nullable(true),
    address: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData.id,
          selectAddressType: currentData.selectAddressType,
          selectState: currentData.selectState,
          selectCity: currentData.selectCity,
          selectRegion: currentData.selectRegion,
          pelak: currentData.pelak,
          unit: currentData.unit,
          postalCode: currentData.postalCode,
          isActive: currentData.isActive,
          latitude: currentData.latitude,
          longtitude: currentData.longtitude,
          address: currentData.address,
        }
      : {
          selectAddressType: undefined,
          selectState: undefined,
          selectCity: undefined,
          selectRegion: undefined,
          pelak: "",
          unit: "",
          postalCode: "",
          isActive: true,
          latitude: 10.0,
          longtitude: 20.0,
          address: "",
        },
    onSubmit: (values: any, { resetForm }) => {
      if (currentData) {
        let newArray = [...value];
        let index = newArray.findIndex((a) => a.id === ID);
        newArray[index] = values;
        setValue("addresses", newArray);
        setOpen(false);
      } else {
        const id: string = uuid();
        setValue("addresses", [...value, { ...values, id: `null${id}` }]);
        setOpen(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue, resetForm } = formik;

  useEffect(() => {
    resetForm({ values: "" });
  }, [resetForm, open]);

  return (
    <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش آدرس" : "افزودن آدرس"}>
      <form onSubmit={handleSubmit}>
        <div className="inputRow">
          <InputSelect
            important
            options={addressKind}
            label="نوع آدرس"
            name="selectAddressType"
            values={values.selectAddressType}
            error={touched.selectAddressType && errors.selectAddressType}
            handleChange={setFieldValue}
          />
          <InputSelect
            important
            options={provinces}
            label=" استان"
            name="selectState"
            values={values.selectState}
            error={touched.selectState && errors.selectState}
            handleChange={setFieldValue}
          />

          <InputSelect
            important
            options={cities}
            label=" شهر"
            name="selectCity"
            values={values.selectCity}
            error={touched.selectCity && errors.selectCity}
            handleChange={setFieldValue}
          />
        </div>
        <div className="inputRow">
          <InputSelect
            important
            options={regions}
            label=" منطقه"
            name="selectRegion"
            values={values.selectRegion}
            error={touched.selectRegion && errors.selectRegion}
            handleChange={setFieldValue}
          />
          <InputText important label=" پلاک" values={values.pelak} name="pelak" handleChange={handleChange} error={touched.pelak && errors.pelak} />
          <InputText important label="واحد" values={values.unit} name="unit" handleChange={handleChange} error={touched.unit && errors.unit} />
        </div>
        <div className="flex-between-center">
          <InputText
            label="کد پستی"
            values={values.postalCode}
            name="postalCode"
            handleChange={handleChange}
            error={touched.postalCode && errors.postalCode}
          />
          <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
          <div className="flex-start-start flex-col">
            <p>موقعیت روی نقشه</p>
            <p>MAP</p>
            {/* <Map formData={formik} long="longtitude" late="latitude" /> */}
            <p>موقعیت هاب را بر روی نقشه مشخص فرمایید</p>
          </div>
        </div>
        <InputText
          wrapperClassName="mt-8"
          important
          label="آدرس"
          values={values.address}
          name="address"
          handleChange={handleChange}
          error={touched.address && errors.address}
        />
        <div className="flex-end-center gap-3">
          <SimpleButton className="full-lightTomato-btn" text="لغو" handelClick={() => setOpen(false)} />
          <SimpleButton type="submit" className="full-tomato-btn" text={currentData ? "ویرایش" : "افزودن"} />
        </div>
      </form>
    </Modal>
  );
};

export default CustomerAddressForm;
