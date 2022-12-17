import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";

import * as Yup from "yup";
import {
  ContactNumberValidate,
  NationalIDValidator,
} from "../../../../../tools/validations/ErrorHelper";
import {
  EditDataParams,
  PostDataParams,
} from "../../../../../services/Service_call";
import { apiRoute } from "../../../../../services/apiRoute";
import { SuccessAlert } from "../../../../../global/alert/Alert";
import { vendorData } from "../../../../../redux/Transportation/vendor/VendorData";
import AddButton from "../../../../../global/addButton/AddButton";
import AddExcel from "../../../../../components/exel/AddExcel";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  name: Yup.string().required(),
  code: Yup.string().required(),
  nationalCode: Yup.number().required(),
  contactNumber: Yup.number(),
});

const VehicleMakeActionForms: React.FC<PropsData> = ({
  currentData,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
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
          code: currentData?.code,
          name: currentData?.name,
          contactNumber: currentData?.contactNumber,
          nationalCode: currentData?.nationalCode,
          isActive: true,
        }
      : {
          code: "",
          name: "",
          contactNumber: "",
          nationalCode: "",
          isActive: true,
        },

    validate: (values) => {
      const errors = {};
      const [isValidNC, errNC] = NationalIDValidator(values.nationalCode);
      const [isValidContact, errContact] = ContactNumberValidate(
        values.contactNumber
      );
      if (!isValidNC) {
        // @ts-ignore
        errors.nationalCode = errNC;
      }
      if (!isValidContact) {
        // @ts-ignore
        errors.contactNumber = errContact;
      }

      return errors;
    },
    onSubmit: (values) => {
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.createVendor, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              vendorData({
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
        EditDataParams(apiRoute().edit.EditVendor, values).then((res) => {
          // dispatch(updating(true));
          console.log("run edit");
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              vendorData({
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
        <button
          className=" border-none	 text-[14px]  w-[20px] h-[20px] "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel
        setOpenModal={setUploadExcel}
        OpenModal={uploadExcel}
        excelInfo={""}
      />
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className={"overflow-visible p-5 min-w-[600px] w-[400px]"}
      >
        <div className="text-lg font-medium">
          {currentData ? "ویرایش شرکت نقلیه" : "افزودن شرکت نقلیه"}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="  grid grid-cols-2 mt-8 gap-y-4 gap-x-2 content-center">
            <div>
              <InputText
                label="کد شرکت"
                // className="w-full"
                name="code"
                handleChange={formik.handleChange}
                values={formik.values.code}
                important
                type={"text"}
                error={formik.touched.code && formik.errors.code}
              />
            </div>
            <div>
              <InputText
                label="نام شرکت"
                // className="w-full"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important
                type={"text"}
                error={formik.touched.name && formik.errors.name}
              />
            </div>

            <div>
              <InputText
                label="شماره تماس"
                // className="w-full"
                name="contactNumber"
                handleChange={formik.handleChange}
                values={formik.values.contactNumber}
                type={"text"}
                error={
                  formik.touched.contactNumber && formik.errors.contactNumber
                }
              />
            </div>

            <div>
              <InputText
                label="شناسه ملی"
                // className="w-full"
                name="nationalCode"
                handleChange={formik.handleChange}
                values={formik.values.nationalCode}
                important
                type={"text"}
                error={
                  formik.touched.nationalCode && formik.errors.nationalCode
                }
              />
            </div>
          </div>

          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton
              handelClick={() => setIsModalOpen(false)}
              text="لغو"
              className="full-lightTomato-btn"
            />
            <SimpleButton
              // loading={Loading}
              type="submit"
              text={currentData ? "ویرایش" : "افزودن"}
              className="full-tomato-btn"
            />
          </div>

          {/* <div className="col-span-5 p-5 flex flex-row justify-end items-center">
            <Button className="border-none bg-secondaryColor text-dark" onClick={() => setIsModalOpen(false)}>
              لغو
            </Button>
            <Button className="border-none bg-tomato mr-3" type="submit">
              {currentData ? "ویرایش" : "افزودن"}
            </Button>
          </div> */}
        </form>
      </Dialog>
    </>
  );
};

export default VehicleMakeActionForms