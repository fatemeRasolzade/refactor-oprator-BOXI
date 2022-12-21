import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../../../global/Chip/Chip";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import { productData } from "../../../../redux/ProductDefineData/ProductDefineData";
import { apiRoute } from "../../../../services/apiRoute";
import { GetDataParams, selectDataFromServer } from "../../../../services/Service_call";
import { vendorData } from "../../../../redux/Transportation/vendor/VendorData";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { FiSearch } from "react-icons/fi";

interface PropsData {
  isActive: Boolean | string;
}

const SearchForm: React.FC<PropsData> = ({ isActive }): JSX.Element => {
  const dispatch = useDispatch();
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      search: "",
      isActive: isActive,
      productGroup: "" as any,
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
    dispatch(
      vendorData({
        search: formik.values.search,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, pageNumbers]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
    const params = `${e.target.value}`;
    // setOptions(data.filter(item=>item.text.includes(e.target.value)))
    GetDataParams(apiRoute().get.GET_PRODUCT + params).then((res) => {
      //  console.log(res)
      setServiceCodeOptions(
        res.payload.content.map((item: { text: any }) => {
          return {
            label: item?.text,
          };
        })
      );
    });
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
  };
  const handleSelect = (val: any, name: string) => {
    formik.setFieldValue(name, val);
  };
  // useEffect(() => {
  //   function getDataSelect() {
  //     try {
  //       selectDataFromServer(apiRoute().get.GET_PRODUCT_GROUPS).then((res: any) => {
  //         if (res.status === "OK") setProductOptions(res?.payload?.content);
  //       });
  //       // getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
  //     } catch (error) {
  //       ErrorAlert("دریافت دیتا با خطلا مواجه شد");
  //     }
  //   }
  //   getDataSelect();
  // }, []);

  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
          <AutocompleteInput
            label={"جستجو"}
            items={serviceCodeOptions}
            value={formik.values.search}
            onChange={(e) => handleChangeCode(e, "search")}
            onSelect={(val: any) => handleSelect(val, "search")}
          />
          <SimpleButton
            type={"submit"}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
        </form>
      </div>
      {/* list of chip */}
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default SearchForm;
