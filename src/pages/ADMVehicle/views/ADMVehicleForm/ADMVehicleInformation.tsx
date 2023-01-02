import { useEffect, useState } from "react";
import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import { getVehicleMake } from "../../../../services/ADMVehicleApi";
import VehiclePelak from "../../../../global/VehiclePelak/VehiclePelak";
import { GET_ROUTE, HUB_SELECT } from "../../../../services/apiRoute";
import { getDataFromServer } from "../../../../services/Service_call";

const ADMVehicleInformation = ({ formik, open, currentData }: any) => {
  const [VehicleMake, setVehicleMake] = useState([]);
  const [Route, setRoute] = useState([]);
  const [Hub, setHub] = useState([]);
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  useEffect(() => {
    if (open) {
      initVehicleMake();
      initRoute();
      initHub();
    }
  }, [open]);

  const initVehicleMake = () => {
    getVehicleMake().then((res) => {
      setVehicleMake(res);
    });
  };

  const initRoute = () => {
    getDataFromServer(GET_ROUTE).then((res) => {
      setRoute(res.content);
    });
  };

  const initHub = () => {
    getDataFromServer(HUB_SELECT).then((res) => {
      setHub(res.content);
    });
  };

  return (
    <>
      <p className="mb-8">مشخصات وسیله نقلیه</p>
      <div className="inputRow">
        <VehiclePelak formik={formik} important ReadOnly={currentData && true} />
        <InputSelect
          options={VehicleMake}
          important
          label="مدل"
          values={values.vehicleMakeSelect}
          name="vehicleMakeSelect"
          handleChange={setFieldValue}
          error={touched.vehicleMakeSelect && errors.vehicleMakeSelect}
        />
        <InputSelect
          options={Route}
          label="مسیر"
          values={values.selectRoute}
          name="selectRoute"
          handleChange={setFieldValue}
          error={touched.selectRoute && errors.selectRoute}
        />
      </div>
      <div className="inputRow">
        <InputText
          important
          label="ظرفیت وزنی"
          values={values.weightCapacity}
          name="weightCapacity"
          handleChange={handleChange}
          error={touched.weightCapacity && errors.weightCapacity}
          placeholder="ظرفیت بر اساس کیلوگرم وارد شود"
        />
        <InputText
          important
          label="ظرفیت حجمی"
          values={values.volumeCapacity}
          name="volumeCapacity"
          handleChange={handleChange}
          error={touched.volumeCapacity && errors.volumeCapacity}
          placeholder="ظرفیت بر اساس مترمکعب وارد شود"
        />
        <InputSelect
          options={Hub}
          label="هاب مرکز گزارش"
          values={values.selectHub}
          name="selectHub"
          handleChange={setFieldValue}
          error={touched.selectHub && errors.selectHub}
        />
      </div>
      <div className="inputRow">
        <DatePickers
          time
          important
          title="شروع کار"
          values={values.dayToStartWork}
          name="dayToStartWork"
          handleChange={setFieldValue}
          timeName="timeToStartWork"
          timeValues={values.timeToStartWork}
          error={(touched.dayToStartWork && errors.dayToStartWork) || (touched.timeToStartWork && errors.timeToStartWork)}
        />
        <DatePickers
          time
          important
          title="پایان کار"
          values={values.dayToFinishWork}
          name="dayToFinishWork"
          handleChange={setFieldValue}
          timeName="timeToFinishWork"
          timeValues={values.timeToFinishWork}
          error={(touched.dayToFinishWork && errors.dayToFinishWork) || (touched.timeToFinishWork && errors.timeToFinishWork)}
        />
        <div className="mb-5 w-60 centering">
          <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
        </div>
      </div>
    </>
  );
};

export default ADMVehicleInformation;
