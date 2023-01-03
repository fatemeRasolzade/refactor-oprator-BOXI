import React, { useEffect, useState } from "react";
import Chip from "../../global/Chip/Chip";
import InputSelect from "../../global/InputSelect/InputSelect";
import InputText from "../../global/InputText/InputText";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import PerfesionalSearch from "./../PerfesionalSearch/PerfesionalSearch";
import {useFormik } from "formik";
import {
  getDataHeaderServer,
  postDataHeaderToServer,
} from "../../services/Service_call";
import { apiRoute } from "../../services/apiRoute";
import ModalPerfetional from "../../pages/Hub/Views/ModalPerfetional/ModalPerfetional";
import AutocompleteInput from "../../global/Autocomplete/AutocompleteInput";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { HubData } from "../../redux/HubData/HubData";

interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id:string
}
const NavbarSearch = ({activeChecked}:{activeChecked?:boolean}) => {
  const [selectedCol, setSelectedCol] = useState<Array<SelectedColInterface>>(
    []
  );

  const [filterData, setFilterData] = useState({});
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const dispatch = useDispatch<any>();

  const formik = useFormik({
    initialValues: {
      name: "",
      hubTypeId: "",
      hubCategoryId: "",
      parentHubId: "",
      code: "",
      
    },

    onSubmit: (values) => {
      const bodyData = {...values,pageNumbers: pageNumbers,isActive:activeChecked};
      
      setFilterData(values);
        dispatch(HubData(bodyData) as any);
    },
  });

  useEffect(() => {
    getDataHeaderServer(apiRoute().get.get_hub_type).then((res) => {
      if (res.status === "OK") settypeHub(res.payload);
    });
    getDataHeaderServer(apiRoute().get.select_hub_category).then((res) => {
      if (res.status === "OK") setCatHub(res.payload.content);
    });
    postDataHeaderToServer(apiRoute().get.select_hub, []).then((res) => {
      if (res.status === "OK") setselectHub(res.payload.content);
    });
  }, []);

  const [typeHub, settypeHub] = useState([]);
  const [catHub, setCatHub] = useState([]);
  const [selectHub, setselectHub] = useState([]);
  const [active, setActive] = useState(false);

  const perfetionalClik = () => {
    setActive((prev) => !prev);
  };

  return (
    <>
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            <div className="Max-sm:mb-3">
              <AutocompleteInput
                label={"کد هاب"}
                items={[]}
                value={formik.values.code}
                onChange={(e) => formik.setFieldValue("code", e.target.value)}
                onSelect={(val: any) => formik.setFieldValue("code", val)}
              />
            </div>
            <div>
              <SimpleButton
                type={"submit"}
                className="full-gray-btn"
                icon={<FiSearch size={25} className="text-darkGray" />}
                text="جستجو"
              />
            </div>
          </div>
        </form>

        {/* <CustomizeModal/> */}

        <form onSubmit={formik.handleSubmit}>
          <PerfesionalSearch
            formData={formik.handleSubmit}
            perfetionalClik={perfetionalClik}
          >
            <div className="grid grid-cols-2 gap-3">
              <InputText
                label="نام هاب"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important
              />
              <InputSelect
                label="نوع هاب"
                handleChange={formik.setFieldValue}
                name="hubTypeId"
                values={formik.values.hubTypeId}
                options={typeHub}
              />
              <InputSelect
                label="گونه هاب"
                handleChange={formik.setFieldValue}
                name="hubCategoryId"
                values={formik.values.hubCategoryId}
                options={catHub}
              />
              <InputSelect
                label="هاب والد"
                handleChange={formik.setFieldValue}
                name="parentHubId"
                values={formik.values.parentHubId}
                options={selectHub}
              />
            </div>
          </PerfesionalSearch>
        </form>

        <ModalPerfetional
          open={active}
          handleOpen={setActive}
          selectedCol={selectedCol}
          setSelectedCol={(value: Array<SelectedColInterface>) =>
            setSelectedCol(value)
          }
          searchFilterList={[]}
          setSearchFilterList={() => console.log()}
        />
      </div>
      <div>
        {filterData && <Chip filterData={filterData} formData={formik} />}
      </div>
    </>
  );
};

export default NavbarSearch;
