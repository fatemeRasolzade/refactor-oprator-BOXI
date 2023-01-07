import { useFormik } from "formik";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

const DeliverySearchFilter = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { code: "" },
    onSubmit: async (values) => {
      //   dispatch(
      //     setFilter({
      //       permission: values.permission,
      //       name: values.name,
      //       pageNumber: pageNumbers,
      //     })
      //   );
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset } = formik;

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="searchForm ">
        <AutocompleteInput label={"شماره مرسوله"} value={values.code} onChange={(e) => setFieldValue("code", e.target.value)} />
        <SimpleButton searchBtn />
        <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
          <></>
        </PerfesionalSearch>
      </form>
    </div>
  );
};

export default DeliverySearchFilter;
