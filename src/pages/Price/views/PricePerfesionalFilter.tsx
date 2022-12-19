import { useEffect, useState } from "react";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { getVehicleMake } from "../../../services/ADMVehicleApi";
import { getDataFromServer } from "../../../services/Service_call";
import { GET_ROUTE } from "../../../services/apiRoute";
import InputText from "../../../global/InputText/InputText";
import DatePickers from "../../../global/DatePicker/DatePicker";

type CustomerPerfesionalFilterProps = {
  formik: any;
};

const PricePerfesionalFilter = ({ formik }: CustomerPerfesionalFilterProps) => {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    // initVehicleMake();
    // initRoute();
  }, []);

  // const initVehicleMake = () => {
  //   getVehicleMake().then((res) => setVehicleMake(res));
  // };

  // const initRoute = () => {
  //   getDataFromServer(GET_ROUTE).then((res) => setRoute(res.content));
  // };

  const { values, setFieldValue, handleChange }: any = formik;

  return (
    <>
      <div>
        <InputSelect options={Product} label="محصول" values={values.product} name="product" handleChange={setFieldValue} />
        <DatePickers title="تاریخ نرخ نامه" name="priceListDate" values={values.priceListDate} handleChange={setFieldValue} />
      </div>
      <div>
        <InputSelect options={Product} label="نوع مرسوله" values={values.consignmentType} name="consignmentType" handleChange={setFieldValue} />
        <InputSelect options={Product} label="رده" values={values.classification} name="classification" handleChange={setFieldValue} />
        {/* <InputText label="مدل" name="vehicleMakeSelect" handleChange={handleChange} values={values.vehicleMakeSelect} /> */}
      </div>
    </>
  );
};

export default PricePerfesionalFilter;
