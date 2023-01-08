import { useFormik } from "formik";
import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import MapComponent from "../../components/map/MapComponent";
import Chip from "../../global/Chip/Chip";
import CustomSearchOption from "../../global/CusotmeSearchOption/CustomSearchOption";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import VehiclePelak from "../../global/VehiclePelak/VehiclePelak";

const MapPage = () => {
  const [filterData, setFilterData] = useState({});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: (values) => {},
  });
  return (
    <div className="w-full h-full">
      <Breadcrumb curentPage="مدیریت نقش" />
      <div className="flex w-full h-full gap-5">
        <div className="w-[20%] h-full flex flex-col items-start gap-5">
          <SimpleButton
            className="w-62 px-1"
            handelClick={() => console.log()}
            text="نمایش لیستی"
            RightIcon={<BsList size={17} />}
          />

          <form>
            <VehiclePelak WrapperClassName={"w-full"} formik={formik} />
            <CustomSearchOption
              setFieldValue={formik.setFieldValue}
              formik={formik}
            />
            <SimpleButton className="full-gray-btn" text="جستجو" />
          </form>
        </div>
        <div className="w-[80%] h-full">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
{
  /* <form className="flex flex-col gap-7 items-center">
            {/* <CustomSearchOption
            setFieldValue={formik.setFieldValue}
            formik={formik}
        /> */
}
