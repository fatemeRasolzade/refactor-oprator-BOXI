import { useFormik } from "formik";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { getDataFromServer } from "../../../../services/Service_call";
import { GET_PRODUCT_SELECT } from "../../../../services/apiRoute";
import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import { PriceAttributeFormInitialValues, PriceAttributeFormValidation } from "./PriceAttributeVariable";
import MultiLineText from "../../../../global/MultiLineText/MultiLineText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import PriceParameters from "./PriceParameters";
import StaticTable from "../../../../components/staticTable/StaticTable";
import { PriceAttributeColumn } from "./PriceAttributeColumn";
import { REQUIRED } from "../../../../tools/validations/RegexKeywords";

const PriceAttributeForm = () => {
  const [Product, setProduct] = useState([]);
  const [Attributes, setAttributes] = useState<any>([]);

  const initProduct = () => {
    getDataFromServer(GET_PRODUCT_SELECT).then((res) => setProduct(res.content));
  };

  useEffect(() => {
    initProduct();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: PriceAttributeFormValidation,
    initialValues: PriceAttributeFormInitialValues,
    // currentData ? ServiceTimeFormCurrentValues(currentData) : ServiceTimeFormInitialValues,
    validate: (values) => {
      const errors = {};
      if (values.isParametric === false) {
        if (!values.classification.id) {
          //@ts-ignore
          errors.classification = REQUIRED;
        }
        if (!values.customDevision) {
          //@ts-ignore
          errors.customDevision = REQUIRED;
        }
      }

      return errors;
    },
    onSubmit: (values: any, { resetForm }) => {
      alert("true");
      if (values.isParametric) {
        let data = {
          id: values?.id,
          product: values.product,
          priceFormule: values.priceFormule,
          price: values.price,
        };
        values = { ...formik.initialValues, ...data };
      } else {
        // values.fromDestinationState && values.fromDestinationState.length !== 0 && childRefUpdateData.current.updateData();
        values.totalWight = { from: values.fromWeight, to: values.toWeight };
        values.totalDim = { from: values.fromDim, to: values.toDimension };
        values.totalValue = { from: values.fromValue, to: values.toValue };
        values.totalNumber = { from: values.fromNumber, to: values.toNumber };
        values.priceDetailDevisions = values.attributeDivition ? values.attributeDivition : [];
      }

      delete values.id;
      setAttributes([...Attributes, values]);
      // resetForm({ values: "" });

      // if (!edit) {
      // 	delete values.id;
      // 	const type = attribute ? attribute : [];
      // 	action({
      // 		type: SET,
      // 		path: "attribute",
      // 		payload: [...type, temp],
      // 	});
      // } else {
      // const findData = Attributes.findIndex((item, index) => index === editData);
      // const copyAttributeProducts = [...attribute];
      // copyAttributeProducts[findData] = temp;

      // }
      // setEdit(false);
      // resetForm({ values: "" });
    },
  });

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit }: any = formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputRow">
        <InputSelect
          important
          options={Product}
          label="محصول  "
          values={values.product}
          name="product"
          handleChange={setFieldValue}
          error={touched.product && errors.product}
        />
        <div className="mb-5 w-60 centering">
          <CustomSwitch label="قیمت مقطوع" active={values.isParametric} handleChange={() => setFieldValue("isParametric", !values.isParametric)} />
        </div>
        {values.isParametric && (
          <>
            <div className="mb-5 w-60 centering">
              <CustomSwitch label="محاسباتی" active={values.fixedPrice} handleChange={() => setFieldValue("fixedPrice", !values.fixedPrice)} />
            </div>
            {!values.fixedPrice ? (
              <InputText
                important
                label=" قیمت "
                values={values.price}
                name="price"
                handleChange={handleChange}
                error={touched.price && errors.price}
              />
            ) : (
              <MultiLineText
                label=" ویرایشگر "
                values={values.priceFormule}
                name="priceFormule"
                handleChange={handleChange}
                error={touched.priceFormule && errors.priceFormule}
              />
            )}
          </>
        )}
      </div>
      {!values.isParametric && <PriceParameters formik={formik} />}
      <div className="flex-end-end">
        <SimpleButton type="submit" text="درج در لیست" className="full-tomato-btn w-40" icon={<BiPlus size={20} />} />
      </div>
      <StaticTable selectable={false} data={Attributes ? Attributes : []} column={PriceAttributeColumn} pagination={1} loading={false} />
    </form>
  );
};

export default PriceAttributeForm;
