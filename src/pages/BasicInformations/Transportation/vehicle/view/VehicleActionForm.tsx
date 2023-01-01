import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import * as Yup from "yup";
import { EditDataParams, PostDataParams } from "../../../../../services/Service_call";
import { apiRoute } from "../../../../../services/apiRoute";
import { SuccessAlert } from "../../../../../global/alert/Alert";
import AddButton from "../../../../../global/addButton/AddButton";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import {
  useFetchOptionsOnModal,
} from "../../../../../global/hooks/useFetchOptions";

import AddExcel from "../../../../../components/exel/AddExcel";
import { vehicleExcel, vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";
import VehiclePelak from "../../../../../global/VehiclePelak/VehiclePelak";
import Checkbox from "../../../../../components/checkbox/Checkbox";
import CustomSwitch from "../../../../../global/Switch/Switch";
import { filterVehicleModel } from "../../../../../redux/Transportation/VehicleData/VehicleData";
interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  vehicleCategorySelect: Yup.object().label("نوع وسیله نقلیه"),
  fleetTypeSelect: Yup.object().shape({
    text: Yup.string().required().label("نوع ناوگان"),
    id: Yup.string().required(),
  }),
  selectHub: Yup.object().shape({
    text: Yup.string().required().label("کد هاب"),
    id: Yup.string().required(),
  }),
  vehicleMakeSelect: Yup.object().shape({
    text: Yup.string().required().label("مدل وسیله نقلیه"),
    id: Yup.string().required(),
  }),
  vehicleNumber0: Yup.number().required(),
  vehicleNumber1: Yup.string().required(),
  vehicleNumber2: Yup.number().required(),
  vehicleNumber3: Yup.number().required(),
  volumeCapacity: Yup.number().required(),
  weightCapacity: Yup.number().required(),
  // consignmentCapacity:Yup.number().required(),
});

const VehicleActionForms: React.FC<PropsData> = ({ currentData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { dataOptions:fleetTypeOptions } = useFetchOptionsOnModal(apiRoute().get.selectFleetType, isModalOpen);
  const { dataOptions:hubOptions } = useFetchOptionsOnModal(apiRoute().get.select_hub, isModalOpen);
  const { dataOptions:vehicleModelOptions } = useFetchOptionsOnModal(apiRoute().get.selectVehicleMake, isModalOpen);
  const { dataOptions:vehicleCategoryOptions } = useFetchOptionsOnModal(apiRoute().get.selectVehicleCategory, isModalOpen);
  
  const dispatch = useDispatch();

  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };


  const setUpdate=()=>{
    dispatch(
      filterVehicleModel({
        search: "",
        isActive: "",
        pageSize: 10,
        pageNumber: "",
      }) as any
    );
  }

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن وسیله نقلیه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          vehicleNumber0: currentData?.vehicleNumber0,
          vehicleNumber1: currentData?.vehicleNumber1,
          vehicleNumber2: currentData?.vehicleNumber2,
          vehicleNumber3: currentData?.vehicleNumber3,
          volumeCapacity: currentData?.volumeCapacity,
          weightCapacity: currentData?.weightCapacity,
          consignmentCapacity: currentData?.consignmentCapacity,
          isActive: currentData?.isActive,
          fleetTypeSelect: {
            id: currentData?.fleetTypeSelect.id,
            text: currentData?.fleetTypeSelect.text,
          },
          selectHub: {
            id: currentData?.selectHub.id,
            text: currentData?.selectHub.text,
          },
          vehicleMakeSelect: {
            id: currentData?.vehicleMakeSelect.id,
            text: currentData?.vehicleMakeSelect.text,
          },
          vehicleCategorySelect: {
            id: currentData?.vehicleCategorySelect?.id,
            text: currentData?.vehicleCategorySelect?.text,
          },
          availableForLocalTrips: currentData?.availableForLocalTrips,
          availableForUpCountry: currentData?.availableForUpCountry,
          availableForMidMile: currentData?.availableForMidMile,
        }
      : {
          vehicleNumber0: "",
          vehicleNumber1: "",
          vehicleNumber2: "",
          vehicleNumber3: "",
          volumeCapacity: "",
          weightCapacity: "",
          consignmentCapacity: "",
          isActive: true,
          fleetTypeSelect: {
            id: "",
            text: "",
          },
          selectHub: {
            id: "",
            text: "",
          },
          vehicleMakeSelect: {
            id: "",
            text: "",
          },
          vehicleCategorySelect: {
            id: "",
            text: "",
          },
          availableForLocalTrips: false,
          availableForUpCountry: false,
          availableForMidMile: false,
        },
    onSubmit: (values) => {
      console.log(values);
      
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.Vehicle, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              filterVehicleModel({
                search: "",
                isActive: "",
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
            console.log("run error");
            setLoading(false);
            // ErrorAlert("خطا در برقراری اطلاعات");
          }

          // dispatch(updating(false));

          setIsModalOpen(false);
        });
      } else {
        setLoading(true);
        EditDataParams(apiRoute().edit.Vehicle, values).then((res) => {
          // dispatch(updating(true));
          console.log("run edit");
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              filterVehicleModel({
                search: "",
                isActive: true,
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
            setLoading(false);
            console.log("run error");
            // ErrorAlert("خطا در برقراری اطلاعات");
          }

          setIsModalOpen(false);
        });
      }
    },
  });
  useEffect(() => {
  
    formik.resetForm({});
  }, [isModalOpen]);

  return (
    <>
      {!currentData ? (
        <AddButton ToggleOptions={ToggleOptions} />
      ) : (
        <button className=" border-none	 text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel excelInfo={vehicleExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} setUpdate={setUpdate}/>
      <Modal
        visible={isModalOpen}
        setVisible={setIsModalOpen}
        title={currentData ? "ویرایش وسیله نقلیه" : "افزودن وسیله نقلیه"}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="grid grid-cols-4 mt-8 gap-y-4 gap-x-4 content-center">
            <VehiclePelak formik={formik} />
            <InputSelect
              label="نوع ناوگان"
              important
              name="fleetTypeSelect"
              handleChange={formik.setFieldValue}
              values={formik.values.fleetTypeSelect}
              error={formik.touched.fleetTypeSelect && formik.errors.fleetTypeSelect}
              options={fleetTypeOptions.options}
            />

            <InputSelect
              label="هاب"
              important
              name="selectHub"
              handleChange={formik.setFieldValue}
              values={formik.values.selectHub}
              error={formik.touched.selectHub && formik.errors.selectHub}
              options={hubOptions.options}
            />

            <InputSelect
              label="مدل وسیله نقلیه"
              important
              name="vehicleMakeSelect"
              handleChange={formik.setFieldValue}
              values={formik.values.vehicleMakeSelect}
              error={formik.touched.vehicleMakeSelect && formik.errors.vehicleMakeSelect}
              options={vehicleModelOptions.options}
            />

            <InputSelect
              label="نوع وسیله نقلیه"
              isClearable
              name="vehicleCategorySelect"
              handleChange={formik.setFieldValue}
              values={formik.values.vehicleCategorySelect}
              error={formik.touched.vehicleCategorySelect && formik.errors.vehicleCategorySelect}
              options={vehicleCategoryOptions.options}
            />

            <InputText
              label=" ظرفیت وزنی (کیلوگرم)"
              name="weightCapacity"
              handleChange={formik.handleChange}
              values={formik.values.weightCapacity}
              important
              error={formik.touched.weightCapacity && formik.errors.weightCapacity}
            />

            <InputText
              label=" ظرفیت حجمی (متر مکعب)"
              // className="w-full"
              name="volumeCapacity"
              handleChange={formik.handleChange}
              values={formik.values.volumeCapacity}
              important
              error={formik.touched.volumeCapacity && formik.errors.volumeCapacity}
            />
            <CustomSwitch
              active={formik.values.isActive}
              handleChange={(value: any) => formik.setFieldValue("isActive", value)}
            />
            <Checkbox
              title="قابل استفاده برای سفرهای داخل شهری"
              name="availableForLocalTrips"
              handleChange={formik.handleChange}
              values={formik.values.availableForLocalTrips}
            />

            <Checkbox
              title="قابل استفاده برای سفرهای برون شهری"
              name="availableForUpCountry"
              handleChange={formik.handleChange}
              values={formik.values.availableForUpCountry}
            />

            <Checkbox
              title="قابل استفاده برای سفرهای بین شهری"
              name="availableForMidMile"
              handleChange={formik.handleChange}
              values={formik.values.availableForMidMile}
            />
          </div>
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={() => setIsModalOpen(false)} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton
              loading={Loading}
              type="submit"
              text={currentData ? "ویرایش" : "افزودن"}
              className="full-tomato-btn"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default VehicleActionForms;
