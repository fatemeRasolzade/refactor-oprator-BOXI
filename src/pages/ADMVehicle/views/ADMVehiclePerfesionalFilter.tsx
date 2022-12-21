import { useEffect, useState } from "react";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { getVehicleMake } from "../../../services/ADMVehicleApi";
import { getDataFromServer } from "../../../services/Service_call";
import { GET_ROUTE } from "../../../services/apiRoute";
import InputText from "../../../global/InputText/InputText";

type CustomerPerfesionalFilterProps = {
  formik: any;
};

const ADMVehiclePerfesionalFilter = ({ formik }: CustomerPerfesionalFilterProps) => {
  const [Route, setRoute] = useState([]);
  const [VehicleMake, setVehicleMake] = useState([]);

  useEffect(() => {
    initVehicleMake();
    initRoute();
  }, []);

  const initVehicleMake = () => {
    getVehicleMake().then((res) => setVehicleMake(res));
  };

  const initRoute = () => {
    getDataFromServer(GET_ROUTE).then((res) => setRoute(res.content));
  };

  const { values, setFieldValue, handleChange }: any = formik;

  return (
    <>
      <div>
        <InputSelect options={Route} label="مسیر" values={values.selectRoute} name="selectRoute" handleChange={setFieldValue} />
      </div>
      <div>
        <InputText label="مدل" name="vehicleMakeSelect" handleChange={handleChange} values={values.vehicleMakeSelect} />
      </div>
    </>
  );
};

export default ADMVehiclePerfesionalFilter;
