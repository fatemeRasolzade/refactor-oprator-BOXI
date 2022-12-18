import { useEffect, useState } from "react";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { getCustomerParent, getCustomerType } from "../../../../services/CustomerApi";

const CustomerBasicInformation = ({ formik, open, currentData }: any) => {
  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  const [customerType, setCustomerType] = useState([]);
  const [customerParent, setCustomerParent] = useState([]);

  useEffect(() => {
    if (open) {
      initCustomerType();
      initParentCustomer();
    }
  }, [open]);

  useEffect(() => {
    setFieldValue("nationalCode", "");
    setFieldValue("nationalId", "");
    setFieldValue("economicCode", "");
  }, [setFieldValue, values.selectThirdPartyType.id]);

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
        <InputText
          important
          label="کد مشتری"
          values={values.code}
          name="code"
          handleChange={handleChange}
          error={touched.code && errors.code}
          readOnly={currentData && true}
        />
        <InputText important label="نام مشتری" values={values.name} name="name" handleChange={handleChange} error={touched.name && errors.name} />
        <InputSelect
          options={customerType}
          important
          label="نوع مشتری"
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
        <InputText
          readOnly
          label="اعتبار جاری"
          values={values.currentCredit}
          name="currentCredit"
          handleChange={handleChange}
          error={touched.currentCredit && errors.currentCredit}
        />
        <InputText
          readOnly
          label="سقف اعتبار"
          values={values.creditLimit}
          name="creditLimit"
          handleChange={handleChange}
          error={touched.creditLimit && errors.creditLimit}
        />
        <InputText
          readOnly
          label="اعتبار اولیه"
          values={values.initialCredit}
          name="initialCredit"
          handleChange={handleChange}
          error={touched.initialCredit && errors.initialCredit}
        />
      </div>
    </div>
  );
};

export default CustomerBasicInformation;
