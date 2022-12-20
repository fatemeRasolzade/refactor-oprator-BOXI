import { useEffect, useState } from "react";
import Provinces from "../../../../components/provinces/Provinces";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import InputText from "../../../../global/InputText/InputText";
import MultiLineText from "../../../../global/MultiLineText/MultiLineText";
import CustomSwitch from "../../../../global/Switch/Switch";
import { GET_CONSIGNMENT_TYPE } from "../../../../services/apiRoute";
import { getDataFromServer } from "../../../../services/Service_call";

interface PriceParametersProps {
  formik: any;
}

const PriceParameters = ({ formik }: PriceParametersProps) => {
  const [ConsignmentType, setConsignmentType] = useState([]);
  const [CustomDevision, setCustomDevision] = useState([]);
  const [Classification] = useState([
    { id: 1, text: "سفارشی" },
    { id: 2, text: "استاندارد" },
  ]);

  useEffect(() => {
    initConsignmentType();
  }, []);

  const initConsignmentType = () => {
    getDataFromServer(GET_CONSIGNMENT_TYPE).then((res) => setConsignmentType(res));
  };

  const initCustomeDevision = () => {};

  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  return (
    <div className="border rounded-lg px-5 pt-10 relative w-full mb-5">
      <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray">پارامتر های قیمت</span>
      <div className="flex-start-start gap-5 flex-wrap mb-6">
        <InputSelect
          important
          options={ConsignmentType}
          label="نوع مرسوله"
          values={values.consignmentType}
          name="consignmentType"
          handleChange={setFieldValue}
          error={touched.consignmentType && errors.consignmentType}
        />
        <div className="border rounded-lg px-5 pt-10 relative">
          <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray"> وزن (کیلوگرم)</span>
          <InputText
            label="از "
            values={values.fromWeight}
            name="fromWeight"
            handleChange={handleChange}
            error={touched.fromWeight && errors.fromWeight}
          />
          <InputText label=" تا " values={values.toWeight} name="toWeight" handleChange={handleChange} error={touched.toWeight && errors.toWeight} />
        </div>
        <div className="border rounded-lg px-5 pt-10 relative">
          <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray"> ارزش (ریال)</span>
          <InputText
            label=" از "
            values={values.fromValue}
            name="fromValue"
            handleChange={handleChange}
            error={touched.fromValue && errors.fromValue}
          />
          <InputText label=" تا " values={values.toValue} name="toValue" handleChange={handleChange} error={touched.toValue && errors.toValue} />
        </div>
        <div className="border rounded-lg px-5 pt-10 relative">
          <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray"> تعداد</span>
          <InputText
            label=" از "
            values={values.fromNumber}
            name="fromNumber"
            handleChange={handleChange}
            error={touched.fromNumber && errors.fromNumber}
          />
          <InputText label=" تا " values={values.toNumber} name="toNumber" handleChange={handleChange} error={touched.toNumber && errors.toNumber} />
        </div>
      </div>
      <div className="inputRow">
        <div className="border rounded-lg px-5 pt-10 pb-5 relative flex-start-start gap-5">
          <span className="absolute -top-3 right-8 px-2 bg-light text-darkGray"> جزئیات رده جغرافیایی </span>
          <InputSelect
            important
            options={Classification}
            label="نوع رده"
            values={values.classification}
            name="classification"
            handleChange={setFieldValue}
            error={touched.classification && errors.classification}
          />
          {values.classification.id === 1 && (
            <InputSelect
              important
              options={ConsignmentType}
              label="رده جغرافیایی"
              values={values.customDevision}
              name="customDevision"
              handleChange={setFieldValue}
              error={touched.customDevision && errors.customDevision}
            />
          )}
          {values.classification.id === 2 && (
            <div className="flex-start-start gap-5 mt-[-0.7rem]">
              <Provinces form={formik} />
            </div>
          )}
        </div>

        <div className="mb-5  centering mt-8">
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
            wrapperClassName="mt-5 "
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
      </div>
    </div>
  );
};

export default PriceParameters;
