import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import MultiLineText from "../../../../global/MultiLineText/MultiLineText";

const ServiceTimeInformation = ({ formik, TimeUnitType }: any) => {
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  return (
    <>
      <div className="inputRow">
        <InputText
          wrapperClassName="w-[31.3rem]"
          important
          label="عنوان"
          values={values.name}
          name="name"
          handleChange={handleChange}
          error={touched.name && errors.name}
        />
        <div className="mb-5 w-60 centering">
          <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
        </div>
      </div>
      <div className="inputRow">
        <InputText
          important
          label="مدت ارائه خدمات از "
          values={values.from}
          name="from"
          handleChange={handleChange}
          error={touched.from && errors.from}
        />
        <InputText important label="مدت ارائه خدمات تا" values={values.to} name="to" handleChange={handleChange} error={touched.to && errors.to} />
        <InputSelect
          important
          options={TimeUnitType}
          label="واحد  "
          values={values.selecttedtimeUnit}
          name="selecttedtimeUnit"
          handleChange={setFieldValue}
          error={touched.selecttedtimeUnit && errors.selecttedtimeUnit}
        />
      </div>
      <div className="inputRow">
        <MultiLineText
          label=" توضیحات"
          values={values.description}
          name="description"
          handleChange={handleChange}
          error={touched.description && errors.description}
        />
      </div>
    </>
  );
};

export default ServiceTimeInformation;
