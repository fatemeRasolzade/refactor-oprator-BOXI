import { useEffect, useState } from "react";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { getVehicleMake } from "../../../services/ADMVehicleApi";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

type CustomerPerfesionalFilterProps = {
  values: any;
  setFieldValue: any;
};

const ADMVehiclePerfesionalFilter = ({ values, setFieldValue }: CustomerPerfesionalFilterProps) => {
  const [VehicleMake, setVehicleMake] = useState([]);

  useEffect(() => {
    initVehicleMake();
  }, []);

  const initVehicleMake = () => {
    getVehicleMake().then((res) => {
      setVehicleMake(res);
    });
  };

  return (
    <>
      <div>
        <AutocompleteInput label="نام مسیر" value={values.selectRoute} onChange={(e) => setFieldValue("selectRoute", e.target.value)} />
      </div>
      <div>
        <InputSelect label="مدل" name="vehicleMakeSelect" handleChange={setFieldValue} values={values.vehicleMakeSelect} options={VehicleMake} />
      </div>
    </>
  );
};

export default ADMVehiclePerfesionalFilter;
