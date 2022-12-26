import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import Chip from "../../../global/Chip/Chip";
import { PersonnelColumn } from "../../../global/Column/Columns";

import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import ModalPerfetional from "../../Hub/Views/ModalPerfetional/ModalPerfetional";
interface SearchFilterInterface {
  id: string;
  valueName:
    | "personelCode"
    | "name"
    | "nationalCode"
    | "mobile"
    | "email"
    | "search"
    | "username"
    | "pageNumbers";

  label: string;
  isMain: boolean;
  isShow: boolean;
}
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
}
interface PersonnelSearchFromProps {
  isActive: boolean;
  selectedCol: Array<SelectedColInterface>;
  setFilterData: (value: any) => void;
  setSelectedCol: (selectedCol: Array<SelectedColInterface>) => void;
}
const PersonnelSearchFrom: FC<PersonnelSearchFromProps> = ({
  isActive,
  selectedCol,
  setFilterData,
  setSelectedCol,
}) => {
  // const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  console.log(crypto.randomUUID());

  const [filterDataChip, setFilterDataChip] = useState({});
  const [searchFilterList, setSearchFilterList] = useState<
    Array<SearchFilterInterface>
  >(searchFilterListInit ? searchFilterListInit : []);
  const [active, setActive] = useState(false);

  const perfetionalClik = () => {
    setActive((prev) => !prev);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      personelCode: "",
      name: "",
      nationalCode: "",
      mobile: "",
      email: "",
      search: "",
      username: "",
      pageNumbers: pageNumbers,
    },
    onSubmit: async (values) => {
      const data = {
        personelCode: values.personelCode,
        name: values.name,
        nationalCode: values.nationalCode,
        mobile: values.mobile,
        email: values.email,
        username: values.username,
        isActive: isActive,
      };
      setFilterDataChip(data);
      setFilterData({ ...data, pageNumber: pageNumbers });
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={formik.handleSubmit} className="flex">
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            {searchFilterList.map(
              (item: SearchFilterInterface, index: number) => {
                if (item.isMain || item.isShow) {
                  return (
                    <div className="Max-sm:mb-3">
                      <AutocompleteInput
                        items={[]}
                        value={formik.values[item.valueName]}
                        label={item.label}
                        onChange={(e) =>
                          formik.setFieldValue(item.valueName, e.target.value)
                        }
                      />
                    </div>
                  );
                }
                return <></>;
              }
            )}

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
            perfetionalClik={perfetionalClik}
          >
            <div className="grid grid-cols-2 gap-6 my-6">
              {searchFilterList.map(
                (item: SearchFilterInterface, index: number) => {
                  if (!item.isMain && !item.isShow) {
                    return (
                      <div className="col-span-1">
                        <AutocompleteInput
                          items={[]}
                          value={formik.values[item.valueName]}
                          label={item.label}
                          onChange={(e) =>
                            formik.setFieldValue(item.valueName, e.target.value)
                          }
                        />
                      </div>
                    );
                  }
                  return <></>;
                }
              )}
            </div>
          </PerfesionalSearch>
        </form>
      </div>
      <ModalPerfetional
        open={active}
        handleOpen={setActive}
        columns={PersonnelColumn}
        selectedCol={selectedCol}
        searchFilterList={searchFilterList}
        setSelectedCol={setSelectedCol}
        setSearchFilterList={setSearchFilterList}
      />
      {filterDataChip && <Chip filterData={filterDataChip} formData={formik} />}
    </div>
  );
};

export default PersonnelSearchFrom;

var searchFilterListInit: Array<SearchFilterInterface> = [
  {
    id: crypto.randomUUID(),
    valueName: "personelCode",
    label: "کد پرسنلی",
    isMain: true,
    isShow: false,
  },
  {
    id: crypto.randomUUID(),
    label: "نام و نام خانوادگی",
    valueName: "name",
    isMain: false,
    isShow: false,
  },
  {
    id: crypto.randomUUID(),
    label: "کد ملی",
    valueName: "nationalCode",
    isMain: false,
    isShow: false,
  },
  {
    id: crypto.randomUUID(),
    label: "شماره موبایل",
    valueName: "mobile",
    isMain: false,
    isShow: false,
  },
  {
    id: crypto.randomUUID(),
    label: "پست الکترونیک",
    valueName: "email",
    isMain: false,
    isShow: false,
  },
  {
    id: crypto.randomUUID(),
    label: "نام کاربری",
    valueName: "username",
    isMain: false,
    isShow: false,
  },
];
