import { useEffect, useState } from "react";
import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { getVehicleMake } from "../../../../services/ADMVehicleApi";
import { getRoute } from "../../../../services/RouteApi";
import { apiRoute, HUB_SELECT } from "../../../../services/apiRoute";
import { getDataFromServer, postDataToServer } from "../../../../services/Service_call";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import VehiclePelak from "../../../../global/VehiclePelak/VehiclePelak";

const ADMVehicleInformation = ({ formik, open }: any) => {
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
    getRoute().then((res) => {
      setRoute(res);
    });
  };

  const initHub = () => {
    postDataToServer(HUB_SELECT, [
      {
        id: 463,
        label: "A100",
        name: "تست",
        parent: 0,
        children: [],
      },
      {
        id: 484,
        label: "A100",
        name: "تست",
        parent: 0,
        children: [],
      },
      {
        id: 447,
        label: "A100",
        name: "تست",
        parent: 0,
        children: [],
      },
    ]).then((res) => {
      console.log(res);

      setHub(res.payload.content);
    });
  };

  return (
    <>
      {/* <p>مشخصات وسیله نقلیه</p> */}
      <div className="inputRow">
        <VehiclePelak formik={formik} important />
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
          title="شروع کار"
          values={values.dayToStartWork}
          name="dayToStartWork"
          handleChange={setFieldValue}
          timeName="timeToStartWork"
          timeValues={values.timeToStartWork}
        />
        {/* <DatePicker /> */}
      </div>
    </>
  );
};

export default ADMVehicleInformation;
