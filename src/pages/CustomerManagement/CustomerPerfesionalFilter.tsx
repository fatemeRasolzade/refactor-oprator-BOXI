import AutocompleteInput from "../../global/Autocomplete/AutocompleteInput";

type CustomerPerfesionalFilterProps = {
  values: any;
  setFieldValue: any;
};

const CustomerPerfesionalFilter = ({
  values,
  setFieldValue,
}: CustomerPerfesionalFilterProps) => {
  return (
    <>
      <div className="inputRow">
        <AutocompleteInput
          label={"کد مشتری"}
          value={values.code}
          onChange={(e) => setFieldValue("code", e.target.value)}
        />
        <AutocompleteInput
          label={"کد مشتری"}
          value={values.code}
          onChange={(e) => setFieldValue("code", e.target.value)}
        />
      </div>
      <div className="inputRow">
        <AutocompleteInput
          label={"کد مشتری"}
          value={values.code}
          onChange={(e) => setFieldValue("code", e.target.value)}
        />
        <AutocompleteInput
          label={"کد مشتری"}
          value={values.code}
          onChange={(e) => setFieldValue("code", e.target.value)}
        />
      </div>
    </>
  );
};

export default CustomerPerfesionalFilter;
