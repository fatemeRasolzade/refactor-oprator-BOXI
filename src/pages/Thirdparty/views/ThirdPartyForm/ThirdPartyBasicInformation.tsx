import { useEffect, useState } from "react";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { getCustomerParent, getCustomerType } from "../../../../services/CustomerApi";

const ThirdPartyBasicInformation = ({ formik, open }: any) => {
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  const [customerType, setCustomerType] = useState([]);
  const [customerParent, setCustomerParent] = useState([]);

  useEffect(() => {
    initCustomerType();
    initParentCustomer();
  }, []);

  const initCustomerType = () => {
    getCustomerType().then((res) => {
      setCustomerType(res);
    });
  };

  const initParentCustomer = () => {
    getCustomerParent().then((res) => {
      setCustomerParent(res);
    });
  };

  return (
    <div className="border rounded-lg px-5 pt-10">
      <div className="inputRow">
        <InputText important label="کد شخصیت" values={values.code} name="code" handleChange={handleChange} error={touched.code && errors.code} />
        <InputText important label="نام شخصیت" values={values.name} name="name" handleChange={handleChange} error={touched.name && errors.name} />
        <InputSelect
          options={customerType}
          important
          label="نوع شخصیت"
          values={values.selectCustomerType}
          name="selectCustomerType"
          handleChange={setFieldValue}
          error={touched.selectCustomerType && errors.selectCustomerType}
        />
        {values.selectCustomerType.id === 0 && (
          <InputText
            important
            label="کد ملی"
            values={values.nationalCode}
            name="nationalCode"
            handleChange={handleChange}
            error={touched.nationalCode && errors.nationalCode}
          />
        )}
        {values.selectCustomerType.id === 1 && (
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
          options={customerParent}
          label="مشتری والد"
          values={values.selectParentCustomer}
          name="selectParentCustomer"
          handleChange={setFieldValue}
          error={touched.selectParentCustomer && errors.selectParentCustomer}
        />
        <InputText
          label="پست الکترونیکی"
          values={values.email}
          name="email"
          handleChange={handleChange}
          error={touched.email && errors.email}
          placeholder="example@example.com"
        />
      </div>
    </div>
  );
};

export default ThirdPartyBasicInformation;
