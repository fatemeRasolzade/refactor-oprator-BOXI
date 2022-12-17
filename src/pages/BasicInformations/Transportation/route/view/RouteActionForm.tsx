import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import * as Yup from "yup";
import { EditDataParams, PostDataParams } from "../../../../../services/Service_call";
import { apiRoute } from "../../../../../services/apiRoute";
import { SuccessAlert } from "../../../../../global/alert/Alert";
import { vendorData } from "../../../../../redux/Transportation/vendor/VendorData";
import AddButton from "../../../../../global/addButton/AddButton";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import { useGetFuelTypeOptions, useGetVendorOptions } from "../../../../../global/hooks/useFetchOptions";
import { vehicleModel } from "../../../../../redux/Transportation/vehicleModel/VehicleModel";

import AddExcel from "../../../../../components/exel/AddExcel";
import { vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";
interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  name: Yup.string().required(),
  code: Yup.number().required(),
  weightCapacity: Yup.number().required(),
  volumeCapacity: Yup.number().required(),
  consignmentCapacity: Yup.number().required(),
  vendorSelect: Yup.object(),
  fuelTypeSelect: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});

const RouteActionForms: React.FC<PropsData> = ({ currentData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);

  const { fuelOptions } = useGetFuelTypeOptions(apiRoute().get.selectfuelTypes, isModalOpen);
  const { vendorOptions } = useGetVendorOptions(apiRoute().get.selectVendor, isModalOpen);

  const dispatch = useDispatch();

  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن شرکت نقلیه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          isActive: currentData?.isActive,
          name: currentData?.name,
          code: currentData?.code,
          weightCapacity: currentData?.weightCapacity,
          volumeCapacity: currentData?.volumeCapacity,
          consignmentCapacity: currentData?.consignmentCapacity,
          fuelTypeSelect: {
            id: currentData?.fuelTypeSelect.id,
            text: currentData?.fuelTypeSelect.text,
          },
          vendorSelect: {
            id: currentData?.vendorSelect?.id,
            text: currentData?.vendorSelect?.text,
          },
        }
      : {
          isActive: true,
          name: "",
          code: "",
          weightCapacity: "",
          volumeCapacity: "",
          consignmentCapacity: "",
          fuelTypeSelect: {
            id: "",
            text: "",
          },
          vendorSelect: {
            id: "",
            text: "",
          },
        },
    onSubmit: (values) => {
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.VehicleModel, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              vehicleModel({
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
        EditDataParams(apiRoute().edit.VehicleModel, values).then((res) => {
          // dispatch(updating(true));
          console.log("run edit");
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              vehicleModel({
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
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel excelInfo={vehicleModelExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} />
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={currentData ? "ویرایش شرکت نقلیه" : "افزودن شرکت نقلیه"}>
      {/*<Dialog open={isModalOpen} handler={setIsModalOpen} className={"overflow-visible p-5 min-w-[60%] "}>*/}
        <form onSubmit={formik.handleSubmit}>
          <div className="  grid grid-cols-4 mt-8 gap-y-4 gap-x-2 content-center">
            <div>
              <InputText
                label="نام مدل"
                // className="w-full"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important

                error={formik.touched.name && formik.errors.name}
              />
            </div>
            <div>
              <InputText
                label="کد مدل"
                // className="w-full"
                name="code"
                handleChange={formik.handleChange}
                values={formik.values.code}
                important
                error={formik.touched.code && formik.errors.code}
              />
            </div>

            <div>
              <InputText
                label=" ظرفیت وزنی (کیلوگرم)"
                // className="w-full"
                name="weightCapacity"
                handleChange={formik.handleChange}
                values={formik.values.weightCapacity}
                type={"text"}
                error={formik.touched.weightCapacity && formik.errors.weightCapacity}
              />
            </div>

            <div>
              <InputText
                label=" ظرفیت حجمی (متر مکعب)"
                // className="w-full"
                name="volumeCapacity"
                handleChange={formik.handleChange}
                values={formik.values.volumeCapacity}
                important
                type={"text"}
                error={formik.touched.volumeCapacity && formik.errors.volumeCapacity}
              />
            </div>
            <div>
              <InputText
                label="ظرفیت مرسوله (تعداد)"
                // className="w-full"
                name="consignmentCapacity"
                handleChange={formik.handleChange}
                values={formik.values.consignmentCapacity}
                important
                type={"text"}
                error={formik.touched.consignmentCapacity && formik.errors.consignmentCapacity}
              />
            </div>

            <div>
              <InputSelect
                label="نوع سوخت"
                important
                name="fuelTypeSelect"
                handleChange={formik.setFieldValue}
                values={formik.values.fuelTypeSelect}
                error={formik.touched.fuelTypeSelect && formik.errors.fuelTypeSelect}
                options={fuelOptions.options || []}
              />
            </div>
            <div>
              <InputSelect
                label="نام شرکت نقلیه"
                // important
                name="vendorSelect"
                handleChange={formik.setFieldValue}
                values={formik.values.vendorSelect}
                error={formik.touched.vendorSelect && formik.errors.vendorSelect}
                options={vendorOptions.options}
              />
            </div>
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
      {/*</Dialog>*/}
      </Modal>
    </>
  );
};

export default RouteActionForms;
