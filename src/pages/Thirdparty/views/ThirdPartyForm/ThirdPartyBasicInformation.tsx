import { useEffect, useState } from "react";
import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { getThirdPartyCategory, getThirdPartyParent, getThirdPartyType } from "../../../../services/ThirdPartyApi";

const ThirdPartyBasicInformation = ({ formik, open, currentData }: any) => {
  const [ThirdPartyType, setThirdPartyType] = useState([]);
  const [ThirdPartyParent, setThirdPartyParent] = useState([]);
  const [ThirdPartyCategory, setThirdPartyCategory] = useState([]);
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  useEffect(() => {
    if (open) {
      initThirdPartyType();
      initThirdPartyParent();
      initThirdPartyCategory();
    }
  }, [open]);

  const initThirdPartyType = () => {
    getThirdPartyType().then((res) => {
      setThirdPartyType(res);
    });
  };

  const initThirdPartyParent = () => {
    getThirdPartyParent().then((res) => {
      setThirdPartyParent(res);
    });
  };

  const initThirdPartyCategory = () => {
    getThirdPartyCategory().then((res) => {
      setThirdPartyCategory(res);
    });
  };

  return (
    <div className="border rounded-xl px-5 pt-10">
      <div className="inputRow">
        <InputText
          important
          label="کد شخصیت"
          values={values.code}
          name="code"
          handleChange={handleChange}
          error={touched.code && errors.code}
          readOnly={currentData && true}
        />
        <InputText important label="نام شخصیت" values={values.name} name="name" handleChange={handleChange} error={touched.name && errors.name} />
        <InputSelect
          options={ThirdPartyType}
          important
          label="نوع شخصیت"
          values={values.selectThirdPartyType}
          name="selectThirdPartyType"
          handleChange={setFieldValue}
          error={touched.selectThirdPartyType && errors.selectThirdPartyType}
        />
        {values.selectThirdPartyType?.id === 0 && (
          <InputText
            important
            label="کد ملی"
            values={values.nationalCode}
            name="nationalCode"
            handleChange={handleChange}
            error={touched.nationalCode && errors.nationalCode}
          />
        )}
        {values.selectThirdPartyType?.id === 1 && (
          <>
            <InputText
              important
              label="شناسه ملی"
              values={values.nationalId}
              name="nationalId"
              handleChange={handleChange}
              error={touched.nationalId && errors.nationalId}
            />
            <InputText
              important
              label="کد اقتصادی"
              values={values.economicCode}
              name="economicCode"
              handleChange={handleChange}
              error={touched.economicCode && errors.economicCode}
            />
          </>
        )}
      </div>
      <div className="inputRow">
        <InputSelect
          options={ThirdPartyCategory}
          label="گروه شخصیت"
          values={values.selectThirdPartyCategory}
          name="selectThirdPartyCategory"
          handleChange={setFieldValue}
          error={touched.selectThirdPartyCategory && errors.selectThirdPartyCategory}
        />
        <InputSelect
          options={ThirdPartyParent}
          label="شخصیت والد"
          values={values.selectParentThirdParty}
          name="selectParentThirdParty"
          handleChange={setFieldValue}
          error={touched.selectParentThirdParty && errors.selectParentThirdParty}
        />
        <InputText
          label="پست الکترونیکی"
          values={values.email}
          name="email"
          handleChange={handleChange}
          error={touched.email && errors.email}
          placeholder="example@example.com"
        />
        <div className="mb-5 w-60 centering">
          <CustomSwitch active={values.isActive} handleChange={() => setFieldValue("isActive", !values.isActive)} />
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyBasicInformation;
