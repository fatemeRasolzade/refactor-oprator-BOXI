import { useFormik } from "formik";
import { FC, useState } from "react";

import { BiChevronDown } from "react-icons/bi";
import Checkbox from "../../../components/checkbox/Checkbox";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import Chip from "../../../global/Chip/Chip";
import { ConsignmentManageCol } from "../../../global/Column/Columns";
import InputSelect from "../../../global/InputSelect/InputSelect";
import MultiSelect from "../../../global/multiselect/MultiSelect";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { searchFilterListInitConsignment } from "../../../models/consigment";
import ModalPerfetional from "../../Hub/Views/ModalPerfetional/ModalPerfetional";
interface SearchFilterInterface {
  id: string;
  valueName: any;

  label: string;
  isMain: boolean;
  isShow: boolean;
}
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
  type: "operation" | "text" | "inputSelect" | "multiSelect" | "status" | "time";
}
interface SearchConsignmentFilterProps {
  selectedCol: Array<SelectedColInterface>;
  // setFilterData: (value: any) => void;
  setSelectedCol: (selectedCol: Array<SelectedColInterface>) => void;
}
const SearchConsignmentFilter: FC<SearchConsignmentFilterProps> = ({ selectedCol, setSelectedCol }) => {
  const [searchFilterList, setSearchFilterList] = useState<Array<SearchFilterInterface>>(
    searchFilterListInitConsignment ? searchFilterListInitConsignment : []
  );
  const [active, setActive] = useState(false);
  const [filterDataChip, setFilterDataChip] = useState({});
  const perfetionalClik = () => {
    setActive((prev) => !prev);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values) => {
      const data = {};
      setFilterDataChip(data);
    },
  });
  return (
    <>
      <div className="flex flex-col">
        <form onSubmit={formik.handleSubmit} className="searchForm">
          <div className=" flex gap-3 justify-start items-start flex-wrap">
            {searchFilterList.map((item: any, index: number) => {
              if (item.isMain || item.isShow) {
                switch (item.type) {
                  case "text":
                    return (
                      <div className="Max-sm:mb-3" key={item.id}>
                        <AutocompleteInput
                          items={[]}
                          value={"sdf"}
                          label={item.label}
                          onChange={(e) => formik.setFieldValue(item.valueName, e.target.value)}
                        />
                      </div>
                    );
                  case "multiSelect":
                    return (
                      <MultiSelect
                        wrapperClassName="w-60 z-[300]"
                        label={item.label}
                        name={item.valueName}
                        handleChange={formik.setFieldValue}
                        values={""}
                        options={[]}
                      />
                    );
                  case "inputSelect":
                    return <InputSelect label={item.label} handleChange={formik.setFieldValue} name={item.valueName} values={{}} options={[]} />;
                  case "status":
                    return (
                      <>
                        <Checkbox handleChange={() => console.log()} name={item.valueName} values={false} title={item.label} />
                      </>
                    );
                  default:
                    break;
                }
              }
              return <></>;
            })}
            <SimpleButton searchBtn />
          </div>
          <PerfesionalSearch
            formData={() => {
              formik.handleSubmit();
            }}
            perfetionalClik={perfetionalClik}
          >
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6 md:grid-cols-3 xs:grid-cols-1">
              {searchFilterList.map((item: any, index: number) => {
                if (!item.isMain && !item.isShow) {
                  switch (item.type) {
                    case "text":
                      return (
                        <div className="Max-sm:mb-3" key={item.id}>
                          <AutocompleteInput
                            items={[]}
                            value={"sdf"}
                            label={item.label}
                            onChange={(e) => formik.setFieldValue(item.valueName, e.target.value)}
                          />
                        </div>
                      );
                    case "multiSelect":
                      return (
                        <MultiSelect
                          wrapperClassName="w-full z-[300]"
                          label={item.label}
                          name={item.valueName}
                          handleChange={formik.setFieldValue}
                          values={""}
                          options={[]}
                        />
                      );
                    case "inputSelect":
                      return <InputSelect label={item.label} handleChange={formik.setFieldValue} name={item.valueName} values={{}} options={[]} />;
                    case "status":
                      return (
                        <>
                          <Checkbox handleChange={() => console.log()} name={item.valueName} values={false} title={item.label} />
                        </>
                      );
                    default:
                      break;
                  }
                }
                return <></>;
              })}
            </div>
          </PerfesionalSearch>
        </form>

        <ModalPerfetional
          open={active}
          handleOpen={setActive}
          columns={ConsignmentManageCol}
          selectedCol={selectedCol}
          searchFilterList={searchFilterList}
          setSelectedCol={setSelectedCol}
          setSearchFilterList={setSearchFilterList}
        />
        {filterDataChip && <Chip filterData={filterDataChip} formData={formik} />}
      </div>
    </>
  );
};

export default SearchConsignmentFilter;
