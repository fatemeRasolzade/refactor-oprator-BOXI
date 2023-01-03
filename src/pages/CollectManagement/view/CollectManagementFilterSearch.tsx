import { useFormik } from "formik";
import { FC, useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import Chip from "../../../global/Chip/Chip";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import ModalPerfetional from "../../Hub/Views/ModalPerfetional/ModalPerfetional";
interface CollectManagementFilterSearchProps {}
const CollectManagementFilterSearch: FC<
  CollectManagementFilterSearchProps
> = (): JSX.Element => {
  const [searchFilterList, setSearchFilterList] = useState<Array<any>>([]);
  const [filterDataChip, setFilterDataChip] = useState({});
  const [active, setActive] = useState(false);

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
    <div className="flex flex-col">
      <div className="searchForm">
        <form onSubmit={formik.handleSubmit} className="flex">
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            {searchFilterList.map((item: any, index: number) => {
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
                  return <></>;
                })}
              </div>
            </PerfesionalSearch>
          </div>
        </form>
      </div>
      {/* <ModalPerfetional
        open={active}
        handleOpen={setActive}
        columns={ConsignmentManageCol}
        selectedCol={selectedCol}
        searchFilterList={searchFilterList}
        setSelectedCol={setSelectedCol}
        setSearchFilterList={setSearchFilterList}
      /> */}
      {filterDataChip && <Chip filterData={filterDataChip} formData={formik} />}
    </div>
  );
};

export default CollectManagementFilterSearch;
