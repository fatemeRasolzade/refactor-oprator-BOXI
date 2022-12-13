import { useEffect, useState } from "react";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { getCustomerParent } from "../../../services/CustomerApi";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

type CustomerPerfesionalFilterProps = {
  values: any;
  setFieldValue: any;
};

const CustomerPerfesionalFilter = ({ values, setFieldValue }: CustomerPerfesionalFilterProps) => {
  const [CustomerParent, setCustomerParent] = useState([]);

  useEffect(() => {
    getCustomerParent().then((res) => setCustomerParent(res));
  }, []);

  return (
    <>
      <div>
        <AutocompleteInput label={"نام کاربری"} value={values.username} onChange={(e) => setFieldValue("username", e.target.value)} />
        <AutocompleteInput label={"کد پستی"} value={values.postalCode} onChange={(e) => setFieldValue("postalCode", e.target.value)} />
      </div>
      <div>
        <InputSelect
          label={"مشتری والد"}
          name="selectParentCustomer"
          handleChange={setFieldValue}
          values={values.selectParentCustomer}
          options={CustomerParent}
        />
        <AutocompleteInput label={"آدرس"} value={values.address} onChange={(e) => setFieldValue("address", e.target.value)} />
      </div>
    </>
  );
};

export default CustomerPerfesionalFilter;
