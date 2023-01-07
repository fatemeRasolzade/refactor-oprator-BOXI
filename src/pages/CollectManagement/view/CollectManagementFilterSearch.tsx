import { useFormik } from "formik";
import { FC, useState } from "react";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import Chip from "../../../global/Chip/Chip";
import CustomSearchOption from "../../../global/CusotmeSearchOption/CustomSearchOption";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import VehiclePelak from "../../../global/VehiclePelak/VehiclePelak";
import ModalPerfetional from "../../Hub/Views/ModalPerfetional/ModalPerfetional";
interface CollectManagementFilterSearchProps {}
const CollectManagementFilterSearch: FC<CollectManagementFilterSearchProps> = (): JSX.Element => {
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
      <form onSubmit={formik.handleSubmit} className="searchForm">
        {searchFilterList.map((item: any, index: number) => {
          return <></>;
        })}
        <CustomSearchOption />
        <VehiclePelak formik={formik} />
        <SimpleButton searchBtn />
        <PerfesionalSearch
          formData={() => {
            formik.handleSubmit();
          }}
          perfetionalClik={perfetionalClik}
        >
          <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6 md:grid-cols-3 xs:grid-cols-1">
            {searchFilterList.map((item: any, index: number) => {
              return <></>;
            })}
          </div>
        </PerfesionalSearch>
      </form>

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
