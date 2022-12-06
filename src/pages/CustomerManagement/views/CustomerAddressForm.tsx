import { useState } from "react";
//  import { v4 as uuidv4 : any } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../../../global/Modal/Modal";
import InputSelect from "../../../global/InputSelect/InputSelect";
import InputText from "../../../global/InputText/InputText";
import CustomSwitch from "../../../global/Switch/Switch";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { PostalCodeRegex } from "../../../tools/validations/ErrorHelper";
import { VALIDPOSTALCODE } from "../../../tools/validations/ErrorKeywords";
// import { Map } from "../../../../components/map";
// import { PostalCodeRegex } from "../../../../utilities/function";

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
        <div className="inputRow">
          <InputSelect
            important
            options={[]}
            label="نوع آدرس"
            name="selectAddressType"
            values={values.selectAddressType}
            error={touched.selectAddressType && errors.selectAddressType}
            handleChange={(value: any) => {
              setFieldValue("selectAddressType", {
                id: value.value,
                text: value.label,
              });
            }}
          />
          <InputSelect
            important
            options={[]}
            label=" استان"
            name="selectState"
            values={values.selectState}
            error={touched.selectState && errors.selectState}
            handleChange={(value: any) => {
              setFieldValue("selectState", {
                id: value.value,
                text: value.label,
              });
            }}
          />

          <InputSelect
            important
            options={[]}
            label=" شهر"
            name="selectState"
            values={values.selectCity}
            error={touched.selectCity && errors.selectCity}
            handleChange={(value: any) => {
              setFieldValue("selectCity", {
                id: value.value,
                text: value.label,
              });
            }}
          />
        </div>
        <div className="inputRow">
          <InputSelect
            important
            options={[]}
            label=" منطقه"
            name="selectRegion"
            values={values.selectRegion}
            error={touched.selectRegion && errors.selectRegion}
            handleChange={(value: any) => {
              setFieldValue("selectRegion", {
                id: value.value,
                text: value.label,
              });
            }}
          />
          <InputText
            important
            label=" پلاک"
            values={values.pelak}
            name="pelak"
            handleChange={handleChange}
            error={touched.pelak && errors.pelak}
          />
          <InputText
            important
            label="واحد"
            values={values.unit}
            name="unit"
            handleChange={handleChange}
            error={touched.unit && errors.unit}
          />
        </div>
        <div className="flex-between-center">
          <InputText
            important
            label="کد پستی"
            values={values.postalCode}
            name="postalCode"
            handleChange={handleChange}
            error={touched.postalCode && errors.postalCode}
          />
          <CustomSwitch
            active={values.isActive}
            handleChange={() => setFieldValue("isActive", !values.isActive)}
          />
          <div className="flex-start-start flex-col">
            <p>موقعیت روی نقشه</p>
            <p>MAP</p>
            {/* <Map formData={formik} long="longtitude" late="latitude" /> */}
            <p>موقعیت هاب را بر روی نقشه مشخص فرمایید</p>
          </div>
        </div>
        <InputText
          className="mt-8"
          important
          label="آدرس"
          values={values.address}
          name="address"
          handleChange={handleChange}
          error={touched.address && errors.address}
        />
        <div className="flex-end-center gap-3">
          <SimpleButton className="full-lightTomato-btn w-20" text="لغو" />
          <SimpleButton
            className="full-tomato-btn w-20"
            text={currentData ? "ویرایش" : "افزودن"}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CustomerAddressForm;
