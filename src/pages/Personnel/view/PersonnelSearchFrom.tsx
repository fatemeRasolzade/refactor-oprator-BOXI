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

interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
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

  const [filterDataChip, setFilterDataChip] = useState({});
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
            <div className="Max-sm:mb-3">
              <AutocompleteInput
                items={[]}
                value={formik.values.personelCode}
                label={"کد پرسنلی"}
                onChange={(e) =>
                  formik.setFieldValue("personelCode", e.target.value)
                }
              />
            </div>
            <div>
              <AutocompleteInput
                items={[]}
                value={formik.values.name}
                label={"نام و نام خانوادگی"}
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
              />
            </div>
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
            <div className="flex flex-col gap-6 my-6">
              <div className="flex gap-6">
                <AutocompleteInput
                  items={[]}
                  value={formik.values.nationalCode}
                  label={"کد ملی"}
                  onChange={(e) =>
                    formik.setFieldValue("nationalCode", e.target.value)
                  }
                />
                <AutocompleteInput
                  items={[]}
                  value={formik.values.mobile}
                  label={"شماره موبایل"}
                  onChange={(e) =>
                    formik.setFieldValue("mobile", e.target.value)
                  }
                />
              </div>
              <div className="flex gap-6">
                <AutocompleteInput
                  items={[]}
                  value={formik.values.email}
                  label={"پست الکترونیک"}
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                />
                <AutocompleteInput
                  items={[]}
                  value={formik.values.username}
                  label={"نام کاربری"}
                  onChange={(e) =>
                    formik.setFieldValue("username", e.target.value)
                  }
                />
              </div>
            </div>
          </PerfesionalSearch>
        </form>
      </div>
      <ModalPerfetional
        open={active}
        handleOpen={setActive}
        columns={PersonnelColumn}
        selectedCol={selectedCol}
        setSelectedCol={setSelectedCol}
      />
      {filterDataChip && <Chip filterData={filterDataChip} formData={formik} />}
    </div>
  );
};

export default PersonnelSearchFrom;
