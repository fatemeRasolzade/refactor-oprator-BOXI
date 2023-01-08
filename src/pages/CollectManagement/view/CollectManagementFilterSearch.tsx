import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import Chip from "../../../global/Chip/Chip";
import CustomSearchOption from "../../../global/CusotmeSearchOption/CustomSearchOption";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import VehiclePelak from "../../../global/VehiclePelak/VehiclePelak";
import { setFilter } from "../../../redux/PickupData/PickupData";
import { getRegions } from "../../../services/GlobalApi";
import CollectPerfesionalSearch from "./CollectPerfesionalSearch";
interface CollectManagementFilterSearchProps {}
const CollectManagementFilterSearch: FC<CollectManagementFilterSearchProps> = (): JSX.Element => {
  const [searchFilterList, setSearchFilterList] = useState<Array<any>>([]);
  const [filterDataChip, setFilterDataChip] = useState({});
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: (values) => {
      dispatch(setFilter(values));
      setFilterDataChip(values);
    },
  });

  const { handleSubmit, handleReset } = formik;
  const { hublist } = useSelector((state: any) => state.userInfo);

  const Convert = (data: any) => {
    const array: any = [];
    data &&
      data.forEach((element: any) => {
        array.push({ ...element, text: element.label });
      });
    return array;
  };

  const [CollectSearchSelecteOptions, setCollectSearchSelecteOptions] = useState({
    hublist: Convert(hublist),
    pickupFrom: [
      { id: 1, text: "مشتری حقیقی" },
      { id: 2, text: "مشتری حقوقی" },
      { id: 0, text: "هاب" },
    ],
    hubAllocatedType: [
      { id: 0, text: "تخصیص شده" },
      { id: 1, text: "تخصیص نشده" },
    ],
    pickupstatus: [
      {
        id: 0,
        text: "در انتظار جمع آوری",
      },
      {
        id: 1,
        text: "جمع آوری موفق",
      },
      {
        id: 2,
        text: "عدم جمع آوری موفق",
      },
      {
        id: 3,
        text: "غیر قابل جمع آوری",
      },
      {
        id: 4,
        text: "لغو شده",
      },
    ],
    priorotyType: [
      {
        id: 0,
        text: "فورس ماژور",
      },
      {
        id: 1,
        text: "معمولی",
      },
    ],
    zoneAllocated: [
      { id: 0, text: "تخصیص شده" },
      { id: 1, text: "تخصیص نشده" },
    ],
    podiHub: [],
  });

  useEffect(() => {
    getRegions().then((res) => {
      setCollectSearchSelecteOptions({
        ...CollectSearchSelecteOptions,
        podiHub: res,
      });
    });
  }, []);

  return (
    <div className="flex flex-col">
      <form onSubmit={formik.handleSubmit} className="searchForm">
        <CustomSearchOption setFieldValue={formik.setFieldValue} formik={formik} />
        <VehiclePelak Search WrapperClassName="w-72" formik={formik} />
        <SimpleButton searchBtn />
        <PerfesionalSearch formData={handleSubmit} perfetionalClik={handleReset}>
          <CollectPerfesionalSearch
            formik={formik}
            searchFilterList={searchFilterList}
            Options={CollectSearchSelecteOptions}
          />
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
