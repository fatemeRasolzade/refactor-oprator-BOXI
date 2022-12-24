import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import DatePickers from "../../../../global/DatePicker/DatePicker";

const PriceFormInformation = ({ formik }: any) => {
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  return (
    <>
      <div className="inputRow">
        <InputText
          // wrapperClassName="w-[31.3rem]"
          important
          label="عنوان"
          values={values.priceListName}
          name="priceListName"
          handleChange={handleChange}
          error={touched.priceListName && errors.priceListName}
        />
        <InputText
          important
          label="شماره نرخ نامه"
          values={values.priceListCode}
          name="priceListCode"
          handleChange={handleChange}
          error={touched.priceListCode && errors.priceListCode}
        />
        <DatePickers
          important
          title="تاریخ نرخ نامه"
          values={values.priceListDate}
          name="priceListDate"
          handleChange={setFieldValue}
          error={touched.priceListDate && errors.priceListDate}
        />
        <div className="mb-5 w-60 centering">
          <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
        </div>
      </div>
      <div className="inputRow">
        <DatePickers
          important
          title="تاریخ اعتبار از"
          values={values.validDateFrom}
          name="validDateFrom"
          handleChange={setFieldValue}
          error={touched.validDateFrom && errors.validDateFrom}
        />
        <DatePickers
          important
          title="تاریخ اعتبار تا"
          values={values.validDateTo}
          name="validDateTo"
          handleChange={setFieldValue}
          error={touched.validDateTo && errors.validDateTo}
        />
      </div>
    </>
  );
};

export default PriceFormInformation;
