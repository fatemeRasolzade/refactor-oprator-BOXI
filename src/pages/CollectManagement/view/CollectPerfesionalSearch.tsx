import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { CollectSearchElements } from "../../../models/CollectModels";

const CollectPerfesionalSearch = ({ formik, searchFilterList, Options }: any) => {
  const { values, setFieldValue } = formik;

  return (
    <div className="grid grid-cols-3 gap-4">
      {CollectSearchElements.map((item: any, index: number) => {
        switch (item.type) {
          case "text":
            return <AutocompleteInput value={values[item.name]} label={item.label} onChange={(e) => setFieldValue(item.name, e.target.value)} />;
          case "inputSelect":
            return (
              <InputSelect label={item.label} handleChange={setFieldValue} name={item.name} values={values[item.name]} options={Options[item.name]} />
            );
          default:
            return <></>;
        }
      })}
    </div>
  );
};

export default CollectPerfesionalSearch;
