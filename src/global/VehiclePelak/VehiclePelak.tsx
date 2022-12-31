import VehiclePelakDropDown from "./VehiclePelakDropDown";

interface VehiclePelakProps {
  formik: any;
  important?: boolean;
  ReadOnly?: boolean;
}

const VehiclePelak = ({ formik, important, ReadOnly }: VehiclePelakProps) => {
  const { values, errors, touched, setFieldValue }: any = formik;

  const Error =
    (touched.vehicleNumber3 && errors.vehicleNumber3) ||
    (touched.vehicleNumber2 && errors.vehicleNumber2) ||
    (touched.vehicleNumber1 && errors.vehicleNumber1) ||
    (touched.vehicleNumber0 && errors.vehicleNumber0);

  return (
    <div className={`${ReadOnly && "opacity-40"}`}>
      <div className={`autocompleteWrapper w-60 ${Error && "border-red"}`}>
        <div className={`autocompleteLabel  ${Error && "text-red"} top-[-17px]`}>
          شماره پلاک <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
        </div>
        <VehiclePelakDropDown
          ReadOnly={ReadOnly}
          value={values.vehicleNumber3}
          name="vehicleNumber3"
          setValue={setFieldValue}
          list={["99", "88", "11"]}
        />
        <input
          disabled={ReadOnly}
          value={values.vehicleNumber2}
          className="w-12 border-b text-center focus:outline-none"
          onChange={(e) => setFieldValue("vehicleNumber2", e.target.value)}
        />
        <VehiclePelakDropDown
          ReadOnly={ReadOnly}
          value={values.vehicleNumber1}
          name="vehicleNumber1"
          setValue={setFieldValue}
          list={["ب", "ت", "ف"]}
        />
        <input
          disabled={ReadOnly}
          value={values.vehicleNumber0}
          className="w-10 border-b text-center focus:outline-none"
          onChange={(e) => setFieldValue("vehicleNumber0", e.target.value)}
        />
      </div>
      <p className="text-red text-xs pr-3 h-4 mt-1">{Error}</p>
    </div>
  );
};

export default VehiclePelak;
