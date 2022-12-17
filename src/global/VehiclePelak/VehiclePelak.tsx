import VehiclePelakDrapDown from "./VehiclePelakDrapDown";

interface VehiclePelakProps {
  formik: any;
  important?: boolean;
}

const VehiclePelak = ({ formik, important }: VehiclePelakProps) => {
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  //   const Error =
  const Error =
    (touched.vehicleNumber3 && errors.vehicleNumber3) ||
    (touched.vehicleNumber2 && errors.vehicleNumber2) ||
    (touched.vehicleNumber1 && errors.vehicleNumber1) ||
    (touched.vehicleNumber0 && errors.vehicleNumber0);

  return (
    <div>
      <div className={`autocompleteWrapper w-60 ${Error && "border-red"}`}>
        <div className={`autocompleteLabel  ${Error && "text-red"} top-[-17px]`}>
          شماره پلاک <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
        </div>
        <VehiclePelakDrapDown value={values.vehicleNumber3} name="vehicleNumber3" setValue={setFieldValue} list={["99", "88", "11"]} />
        <input
          value={values.vehicleNumber2}
          className="w-12 border-b text-center"
          onChange={(e) => setFieldValue("vehicleNumber2", e.target.value)}
        />
        <VehiclePelakDrapDown value={values.vehicleNumber1} name="vehicleNumber1" setValue={setFieldValue} list={["ب", "ت", "ف"]} />
        <input
          value={values.vehicleNumber0}
          className="w-10 border-b text-center"
          onChange={(e) => setFieldValue("vehicleNumber0", e.target.value)}
        />
      </div>
      <p className="text-red text-xs pr-3 h-4 mt-1">{Error}</p>
    </div>
  );
};

export default VehiclePelak;
