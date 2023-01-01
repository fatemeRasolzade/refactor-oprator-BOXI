import { useFormik } from "formik";
import { FC, useState } from "react";

import { BiChevronDown, BiSearch } from "react-icons/bi";
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
  type:
    | "operation"
    | "text"
    | "inputSelect"
    | "multiSelect"
    | "status"
    | "time";
}
interface SearchConsignmentFilterProps {
  isActive: boolean;
  selectedCol: Array<SelectedColInterface>;
  // setFilterData: (value: any) => void;
  setSelectedCol: (selectedCol: Array<SelectedColInterface>) => void;
}
const SearchConsignmentFilter: FC<SearchConsignmentFilterProps> = ({
  isActive,
  selectedCol,
  setSelectedCol,
}) => {
  const [searchFilterList, setSearchFilterList] = useState<
    Array<SearchFilterInterface>
  >(searchFilterListInitConsignment ? searchFilterListInitConsignment : []);
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
        <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
          <form onSubmit={formik.handleSubmit} className="flex">
            <div className=" flex gap-3 justify-start items-center flex-wrap">
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
                            onChange={(e) =>
                              formik.setFieldValue(
                                item.valueName,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      );
                    case "multiSelect":
                      return (
                        <MultiSelect
                          wrapperClassName="w-full z-[300] py-4"
                          label={item.label}
                          name={item.valueName}
                          handleChange={formik.setFieldValue}
                          values={""}
                          options={[]}
                        />
                      );
                    case "inputSelect":
                      return (
                        <InputSelect
                          label={item.label}
                          handleChange={formik.setFieldValue}
                          name={item.valueName}
                          values={{}}
                          options={[]}
                        />
                      );
                    default:
                      break;
                  }
                }
                return <></>;
              })}
              <div className="mb-5">
                <SimpleButton
                  type="submit"
                  className="full-gray-btn w-[160px] h-[40px] centering rounded-md"
                  icon={<BiSearch size={20} />}
                  text="جستجو"
                />
              </div>
            </div>
            <PerfesionalSearch
              text="جستجوی پیشرفته"
              LeftIcon={<BiChevronDown />}
              formData={() => {
                formik.handleSubmit();
              }}
              sizeWidth="1350px"
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
                              onChange={(e) =>
                                formik.setFieldValue(
                                  item.valueName,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        );
                      case "multiSelect":
                        return (
                          <MultiSelect
                            wrapperClassName="w-full z-[300] py-4"
                            label={item.label}
                            name={item.valueName}
                            handleChange={formik.setFieldValue}
                            values={""}
                            options={[]}
                          />
                        );
                      case "inputSelect":
                        return (
                          <InputSelect
                            label={item.label}
                            handleChange={formik.setFieldValue}
                            name={item.valueName}
                            values={{}}
                            options={[]}
                          />
                        );
                      case "status":
                        return <>status</>;
                      default:
                        break;
                    }
                  }
                  return <></>;
                })}
              </div>
            </PerfesionalSearch>
          </form>
        </div>
        <ModalPerfetional
          open={active}
          handleOpen={setActive}
          columns={ConsignmentManageCol}
          selectedCol={selectedCol}
          searchFilterList={searchFilterList}
          setSelectedCol={setSelectedCol}
          setSearchFilterList={setSearchFilterList}
        />
        {filterDataChip && (
          <Chip filterData={filterDataChip} formData={formik} />
        )}
      </div>
    </>
  );
};

export default SearchConsignmentFilter;
