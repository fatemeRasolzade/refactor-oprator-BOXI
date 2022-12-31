import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import { BiPlus, BiTrash } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
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
import { convertToObjects } from "../../../../tools/functions/Methods";

interface PriceAttributeFormProps {
  Attributes: any;
  setAttributes: any;
  open: boolean;
  handleResetOuter: any;
}

const PriceAttributeForm = ({ Attributes, setAttributes, open, handleResetOuter }: PriceAttributeFormProps) => {
  const [Product, setProduct] = useState([]);
  const [Edit, setEdit] = useState(false);
  const initProduct = () => {
    getDataFromServer(GET_PRODUCT_SELECT).then((res) => setProduct(res.content));
  };

  useEffect(() => {
    if (open) initProduct();
  }, [open]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: PriceAttributeFormValidation,
    initialValues: PriceAttributeFormInitialValues,
    // validate: (values) => {
    //   const errors = {};
    //   if (values.isParametric === false) {
    //     if (!values.classification.id) {
    //       //@ts-ignore
    //       errors.classification = REQUIRED;
    //     }
    //     if (!values.customDevision) {
    //       //@ts-ignore
    //       errors.customDevision = REQUIRED;
    //     }
    //   }
    //   return errors;
    // },
    onSubmit: (values: any) => {
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
      let FromCountryDevision: any = [];
      let ToCountryDevisiond: any = [];
      FromCountryDevision =
        values.fromDestinationLocation?.length !== 0
          ? values.fromDestinationLocation
          : values.fromDestinationCity.length !== 0
          ? values.fromDestinationCity
          : values.fromCountryDevision.length !== 0
          ? values.fromCountryDevision
          : [];
      ToCountryDevisiond =
        values.fromSourceLocation.length !== 0
          ? values.fromSourceLocation
          : values.fromSourceCity.length !== 0
          ? values.fromSourceCity
          : values.toCountryDevision.length !== 0
          ? values.toCountryDevision
          : [];
      if (Edit) {
        let newArray = [...Attributes];
        let index = newArray.findIndex((a) => a.id === values.id);
        newArray[index] = {
          ...values,
          priceDetailDevisions: FromCountryDevision.length !== 0 ? convertToObjects(FromCountryDevision, ToCountryDevisiond, "from") : [],
        };
        setAttributes(newArray);
        setEdit(false);
        handleReset();
      } else {
        const id: string = uuid();
        values.id = setAttributes([
          ...Attributes,
          {
            ...values,
            id: `${id}`,
            priceDetailDevisions: FromCountryDevision.length !== 0 ? convertToObjects(FromCountryDevision, ToCountryDevisiond, "from") : [],
          },
        ]);
        handleReset();
      }
    },
  });

  const { values, errors, touched, handleChange, setFieldValue, handleSubmit, handleReset }: any = formik;

  // useEffect(() => {
    // handleReset();
    // handleResetOuter();
    // setAttributes([]);
  // }, [open, handleReset, handleResetOuter, setAttributes]);

  const handleEditPriceAttributes = (id: any) => {
    setEdit(true);
    let data = Attributes.find((at: any) => at.id === id);
    data?.priceDetailDevisions?.length === 0
      ? setFieldValue("classification", { id: "1", text: "سفارشی" })
      : setFieldValue("classification", { id: "2", text: "استاندارد" });
    data?.priceDetailDevisions?.length === 0 && data.customDevision === null && setFieldValue("classification", "");
    data.priceFormule ? setFieldValue("fixedPrice", true) : setFieldValue("fixedPrice", false);
    const { toValue, toNumber } = data;
    setFieldValue("id", data.id);
    setFieldValue("isActive", data.isActive);
    setFieldValue("fromWeight", data.fromWeight);
    setFieldValue("toWeight", data.toWeight);
    setFieldValue("fromValue", data.fromValue);
    setFieldValue("fromNumber", data.fromNumber);
    setFieldValue("toNumber", toNumber);
    setFieldValue("toValue", toValue);
    setFieldValue("product", data.product);
    setFieldValue("price", data.price === null ? "" : data.price);
    setFieldValue("consignmentType", data.consignmentType);
    setFieldValue("customDevision", data.customDevision ? { id: data.customDevision?.id, text: data.customDevision?.name } : null);
    setFieldValue("priceFormule", data?.priceFormule);
    setFieldValue("isParametric", data?.isParametric);
    setFieldValue("fromCountryDevision", data.fromCountryDevision);
    setFieldValue("fromSourceCity", data.fromSourceCity);
    setFieldValue("fromSourceLocation", data.fromSourceLocation);
    setFieldValue("toCountryDevision", data.toCountryDevision);
    setFieldValue("fromDestinationCity", data.fromDestinationCity);
    setFieldValue("fromDestinationLocation", data.fromDestinationLocation);
    console.log(values);
  };

  const data =
    Attributes?.length !== 0
      ? Attributes?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <div onClick={() => handleDeleteAttributePrice(item.id)} className="text-[14px]  w-[20px] h-[20px] centering">
                  <BiTrash size={20} className="w-full h-full	cursor-pointer" />
                </div>
                <div onClick={() => handleEditPriceAttributes(item.id)} className="text-[14px]  w-[20px] h-[20px] centering">
                  <AiOutlineEdit className="w-full h-full	cursor-pointer" size={15} />
                </div>
              </div>
            ),
          };
        })
      : [];

  const handleDeleteAttributePrice = (id: any) => {
    const filtered = Attributes.filter((a: any) => a.id !== id);
    setAttributes(filtered);
  };

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
        <SimpleButton type="submit" text={Edit ? "ویرایش در لیست" : "درج در لیست"} className="full-tomato-btn w-40" icon={<BiPlus size={20} />} />
      </div>
      <StaticTable selectable={false} data={data ? data : []} column={PriceAttributeColumn} pagination={1} loading={false} />
    </form>
  );
};

export default PriceAttributeForm;
