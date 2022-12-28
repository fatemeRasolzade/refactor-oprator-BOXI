import { useEffect, useState } from "react";
import InputSelect from "../../../global/InputSelect/InputSelect";
import DatePickers from "../../../global/DatePicker/DatePicker";
import { getDataFromServer } from "../../../services/Service_call";
import { GET_CONSIGNMENT_TYPE, GET_PRODUCT_SELECT } from "../../../services/apiRoute";

type CustomerPerfesionalFilterProps = {
  formik: any;
};

const PricePerfesionalFilter = ({ formik }: CustomerPerfesionalFilterProps) => {
  const [Product, setProduct] = useState([]);
  const [ConsignmentType, setConsignmentType] = useState([]);
  const [Classification] = useState([
    { id: 1, text: "سفارشی" },
    { id: 2, text: "استاندارد" },
  ]);

  useEffect(() => {
    initConsignmentType();
    initProduct();
  }, []);

  const initConsignmentType = () => {
    getDataFromServer(GET_CONSIGNMENT_TYPE).then((res) => setConsignmentType(res));
  };

  const initProduct = () => {
    getDataFromServer(GET_PRODUCT_SELECT).then((res) => setProduct(res.content));
  };

  const { values, setFieldValue }: any = formik;

  return (
    <>
      <div>
        <InputSelect options={Product} label="محصول" values={values.product} name="product" handleChange={setFieldValue} />
        <DatePickers title="تاریخ نرخ نامه" name="priceListDate" values={values.priceListDate} handleChange={setFieldValue} />
      </div>
      <div>
        <InputSelect
          options={ConsignmentType}
          label="نوع مرسوله"
          values={values.consignmentType}
          name="consignmentType"
          handleChange={setFieldValue}
        />
        <InputSelect options={Classification} label="رده" values={values.classification} name="classification" handleChange={setFieldValue} />
      </div>
    </>
  );
};

export default PricePerfesionalFilter;
