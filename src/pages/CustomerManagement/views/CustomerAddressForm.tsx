import React, { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
//  import { v4 as uuidv4 : any } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../../../global/Modal/Modal";
// import axios from "axios";
// import { Map } from "../../../../components/map";
// import Select from "../../../../components/Select";
// import Button from "../../../../components/Button";
// import { getAddressesKind } from "../../../../services/api";
// import FormGroup from "../../../../components/FormGroup";
// import { PostalCodeRegex } from "../../../../utilities/function";
// import CustomModal from "../../../../components/CustomModal";
// import CustomSwitch from "../../../../components/CustomSwitch";

const CustomerAddressForm = ({
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

  //get required data
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [addressKind, setAddressKind] = useState([]);

  // const getAddressKind = useCallback(() => {
  // 	getAddressesKind()
  // 		.then((response) => {
  // 			const options = response.data.payload.map(({ id: value, ...rest }) => ({
  // 				value,
  // 				...rest,
  // 			}));
  // 			const options1 = options.map(({ text: label, ...rest }) => ({
  // 				label,
  // 				...rest,
  // 			}));
  // 			setAddressKind(options1);
  // 		})
  // 		.catch((err) => {
  // 			console.log(err);
  // 		});
  // }, []);

  // const getProvince = useCallback(() => {
  // 	// getProvinces();
  // 	axios({ method: "GET", url: "http://192.168.1.153:8090/core-api/countryDevision?filter=" })

  // 		.then((response) => {
  // 			console.log(response);
  // 			console.log(response.data);
  // 			// const options = response.data.payload.content.map(({ id: value, ...rest }) => ({
  // 			// 	value,
  // 			// 	...rest,
  // 			// }));
  // 			// const options1 = options.map(({ text: label, ...rest }) => ({
  // 			// 	label,
  // 			// 	...rest,
  // 			// }));
  // 			// setProvinces(options1);
  // 		})
  // 		.catch((err) => {
  // 			console.log(err);
  // 		});
  // }, [provinces]);

  // const getCities = useCallback(() => {
  // 	// getProvincesCities()
  // 	// axios({ method: "GET", url: "http://192.168.1.153:8090/core-api/countryDevision/province/1/city?filter" })
  // 	axios({ method: "GET", url: "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter" })
  // 		.then((response) => {
  // 			const options = response.data.payload.content.map(({ id: value, ...rest }) => ({
  // 				value,
  // 				...rest,
  // 			}));
  // 			const options1 = options.map(({ text: label, ...rest }) => ({
  // 				label,
  // 				...rest,
  // 			}));
  // 			setCities(options1);
  // 		})
  // 		.catch((err) => {
  // 			console.log(err);
  // 		});
  // }, [cities]);

  // const getRegions = useCallback(() => {
  // 	// getCityLocations()
  // 	// axios({ method: "GET", url: "http://192.168.1.153:8090/core-api/countryDevision/city/2/loc?filter" })
  // 	axios({ method: "GET", url: "http://boxi.local:40000/core-api/countryDevision/city/2/loc?filter" })
  // 		.then((response) => {
  // 			const options = response.data.payload.content.map(({ id: value, ...rest }) => ({
  // 				value,
  // 				...rest,
  // 			}));
  // 			const options1 = options.map(({ text: label, ...rest }) => ({
  // 				label,
  // 				...rest,
  // 			}));
  // 			setRegions(options1);
  // 		})
  // 		.catch((err) => {
  // 			console.log(err);
  // 		});
  // }, [regions]);

  // useEffect(() => {
  // 	if (open) {
  // 		getAddressKind();
  // 		getProvince();
  // 		getCities();
  // 		getRegions();
  // 	}
  // }, [open]);

  // start fromik configurations
  const [checked, setChecked] = useState(false);
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
    unit: Yup.number().required().label("واحد"),
    // postalCode: Yup.string().matches(PostalCodeRegex, "کد پستی معتبر نیست"),
    isActive: Yup.boolean().nullable(),
    latitude: Yup.number().nullable(true).label("عرض"),
    longtitude: Yup.number().nullable(true).label("طول"),
    address: Yup.string().required().label("آدرس"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          // edit feilds
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
          selectAddressType: {},
          selectState: {},
          selectCity: {},
          selectRegion: {},
          pelak: "",
          unit: "",
          postalCode: "",
          isActive: true,
          latitude: 10.0,
          longtitude: 20.0,
          address: "",
          // telephones: [],
        },
    onSubmit: (values: any, { resetForm }) => {
      //   setState({ loading: true, error: false });
      console.log("This is true");
      if (currentData) {
        setOpen(false);
        resetForm({ values: "" });
        let newArray = [...value];
        let index = newArray.findIndex((a) => a.id === ID);
        newArray[index] = values;
        setValue("addresses", newArray);
        // setState({ loading: false, error: false });
      } else {
        // const id: string = uuidv4();
        setOpen(false);
        resetForm({ values: "" });
        // setValue("addresses", [...value, { ...values, id: `null${id}` }]);
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
        {/* <div className="formInputSection">
          <FormGroup
            required={true}
            error={
              touched.selectAddressType &&
              errors.selectAddressType &&
              errors.selectAddressType.id
            }
            label="نوع آدرس"
          >
            <Select
              name="selectAddressType"
              placeholder="نوع آدرس"
              value={{
                value: values?.selectAddressType?.id,
                label: values?.selectAddressType?.text,
              }}
              options={addressKind}
              onChange={(value) => {
                setFieldValue("selectAddressType", {
                  id: value.value,
                  text: value.label,
                });
              }}
            />
          </FormGroup>
          <FormGroup
            required={true}
            error={
              touched.selectState && errors.selectState && errors.selectState.id
            }
            label="استان"
          >
            <Select
              name="selectState"
              placeholder="استان"
              value={{
                value: values?.selectState?.id,
                label: values?.selectState?.text,
              }}
              options={provinces}
              onChange={(value) => {
                setFieldValue("selectState", {
                  id: value.value,
                  text: value.label,
                });
              }}
            />
          </FormGroup>

          <FormGroup
            required={true}
            error={
              touched.selectCity && errors.selectCity && errors.selectCity.id
            }
            label="شهر"
          >
            <Select
              name="selectCity"
              placeholder="شهر"
              value={{
                value: values?.selectCity?.id,
                label: values?.selectCity?.text,
              }}
              options={cities}
              onChange={(value) => {
                setFieldValue("selectCity", {
                  id: value.value,
                  text: value.label,
                });
              }}
            />
          </FormGroup>
        </div>
        <div className="formInputSection">
          <FormGroup
            required={true}
            error={
              touched.selectRegion &&
              errors.selectRegion &&
              errors.selectRegion.id
            }
            label="منطقه"
          >
            <Select
              name="selectRegion"
              placeholder="منطقه"
              value={{
                value: values?.selectRegion?.id,
                label: values?.selectRegion?.text,
              }}
              options={regions}
              onChange={(value) => {
                setFieldValue("selectRegion", {
                  id: value.value,
                  text: value.label,
                });
              }}
              isSearchable={true}
            />
          </FormGroup>

          <FormGroup
            required={true}
            error={touched.pelak && errors.pelak}
            input={{
              id: "pelak",
              name: "pelak",
              placeholder: "",
              value: values.pelak,
              onChange: handleChange,
            }}
            label="پلاک "
          />

          <FormGroup
            required={true}
            error={touched.unit && errors.unit}
            input={{
              id: "unit",
              name: "unit",
              placeholder: "",
              value: values.unit,
              onChange: handleChange,
            }}
            label="واحد "
          />
        </div>
        <div className="flex justify-between items-start mt-5">
          <div className="formInputSection">
            <FormGroup
              error={touched.postalCode && errors.postalCode}
              input={{
                id: "postalCode",
                name: "postalCode",
                placeholder: "",
                value: values.postalCode,
                onChange: handleChange,
              }}
              label="کد پستی "
            />
            <CustomSwitch
              type={"button"}
              dataName={"isActive"}
              formData={formik}
              setChecked={setChecked}
              checked={checked}
            />
          </div>
          <div className={" flex flex-col"}>
            <p className={"pr-4 text-sm"}>موقعیت روی نقشه</p>
            <Map formData={formik} long="longtitude" late="latitude" />
            <p className="pr-4 text-sm">
              موقعیت هاب را بر روی نقشه مشخص فرمایید
            </p>
          </div>
        </div>
        <div className="formInputSection">
          <FormGroup
            required={true}
            error={touched.address && errors.address}
            input={{
              id: "address",
              name: "address",
              placeholder: "",
              value: values.address,
              onChange: handleChange,
            }}
            label="آدرس"
            width="w-full"
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

export default CustomerAddressForm;
