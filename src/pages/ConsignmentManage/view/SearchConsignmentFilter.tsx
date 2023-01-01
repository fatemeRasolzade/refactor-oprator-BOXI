import { useFormik } from "formik";
import { useState } from "react";

import { BiChevronDown, BiSearch } from "react-icons/bi";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import Chip from "../../../global/Chip/Chip";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import ModalPerfetional from "../../Hub/Views/ModalPerfetional/ModalPerfetional";

const SearchConsignmentFilter = () => {
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
              {/* map */}

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
              <div className="grid grid-cols-2 gap-6 my-6">{/* map */}</div>
            </PerfesionalSearch>
          </form>
        </div>
        {/* <ModalPerfetional
          open={active}
          handleOpen={setActive}
          columns={PersonnelColumn}
          selectedCol={selectedCol}
          searchFilterList={searchFilterList}
          setSelectedCol={setSelectedCol}
          setSearchFilterList={setSearchFilterList}
        /> */}
        {filterDataChip && (
          <Chip filterData={filterDataChip} formData={formik} />
        )}
      </div>
    </>
  );
};

export default SearchConsignmentFilter;
