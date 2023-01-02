import { useEffect, useState } from "react";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { getThirdPartyCategory } from "../../../services/ThirdPartyApi";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

type CustomerPerfesionalFilterProps = {
  values: any;
  setFieldValue: any;
};

const ThirdPartyPerfesionalFilter = ({ values, setFieldValue }: CustomerPerfesionalFilterProps) => {
  const [ThirdPartyCategory, setThirdPartyCategory] = useState([]);

  useEffect(() => {
    getThirdPartyCategory().then((res) => setThirdPartyCategory(res));
  }, []);

  return (
    <>
      <div>
        <AutocompleteInput label={"کد پستی"} value={values.postalCode} onChange={(e) => setFieldValue("postalCode", e.target.value)} />
        <InputSelect
          wrapperClassName="mt-6"
          label={"گروه شخصیت"}
          name="selectThirdPartyCategory"
          handleChange={setFieldValue}
          values={values.selectThirdPartyCategory}
          options={ThirdPartyCategory}
        />
      </div>
      <div>
        <AutocompleteInput label={"آدرس"} value={values.address} onChange={(e) => setFieldValue("address", e.target.value)} />
      </div>
    </>
  );
};

export default ThirdPartyPerfesionalFilter;
