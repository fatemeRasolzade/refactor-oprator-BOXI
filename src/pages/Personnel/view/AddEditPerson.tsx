import React, { FC, useState } from "react";
import * as Yup from "yup";
import { Dialog } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import InputText from "../../../global/InputText/InputText";
import CustomSwitch from "../../../global/Switch/Switch";
import AddButton from "../../../global/addButton/AddButton";
import axios from "axios";
import { PersonnelData } from "../../../redux/PersonData/PersonsData";
import InputSelect from "../../../global/InputSelect/InputSelect";
import { toast } from "react-toastify";
import {
  ComplexPasswordRegex,
  JustEngNameRegex,
  MobileRegex,
  NationalCodeRegex,
} from "../../../tools/validations/ErrorHelper";
import {
  UNMATCHPASSWORD,
  VALIDCOMPLEXREGEX,
  VALIDMOBILE,
  VALIDNATIONALCODE,
  VALIDPOSTALCODE,
} from "../../../tools/validations/RegexKeywords";

interface AddEditPersonProps {
  currentData?: any;
}

const AddEditPerson: FC<AddEditPersonProps> = ({ currentData }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [options] = useState([
    { id: 0, text: "خیر" },
    { id: 1, text: "بله" },
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: currentData ? validationEdit : validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          personelCode: currentData?.personelCode,
          nationalCode: currentData?.nationalCode,
          name: currentData?.name,
          username: currentData.username,
          mobile: currentData?.mobile,
          email: currentData?.email ? currentData?.email : "",
          isSuperAdmin: {
            id: currentData?.isSuperAdmin,
            text: currentData?.isSuperAdmin ? "بله" : "خیر",
          },
          isActive: currentData?.isActive,
        }
      : {
          personelCode: "",
          nationalCode: "",
          name: "",
          mobile: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          isSuperAdmin: null,
          isActive: true,
        },
    onSubmit: async (values, { resetForm }) => {
      const data = currentData
        ? {
            id: values.id,
            nationalCode: values.nationalCode,
            personelCode: values.personelCode,
            name: values.name,
            mobile: values.mobile,
            email: values.email,
            isSuperAdmin: values.isSuperAdmin?.id === 0 ? false : true,
            isActive: currentData.isActive,
          }
        : {
            isSuperAdmin: values.isSuperAdmin?.id === 0 ? false : true,
            personelCode: values.personelCode,
            nationalCode: values.nationalCode,
            name: values.name,
            mobile: values.mobile,
            email: values.email,
            username: values.username,
            password: values.password,
            isActive: true,
          };

      try {
        const res = await axios({
          url: "http://boxi.local:40000/resource-api/employee",
          method: currentData ? "put" : "post",
          data: data,
        });

        if (200 <= res.status && res.status < 300) {
          dispatch(
            PersonnelData({
              personelCode: "",
              name: "",
              nationalCode: "",
              mobile: "",
              email: "",
              username: "",
              isActive: true,
              pageNumber: 1,
            }) as any
          );
          toast.success(
            currentData
              ? "کارمند با موفقیت به روزرسانی گردید"
              : "کارمند با موفقیت اضافه گردید"
          );
          setIsModalOpen(false);
          resetForm({});
        }
      } catch (error) {
        toast.error("مشکلی پیش آمده");
      }
    },
  });
  const handleOpenModal = () => setIsModalOpen(!isModalOpen);
  const handleUploadFileAction = () => {
    alert("second");
  };
  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن پرسنل" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  return (
    <div>
      {currentData ? (
        <button
          className=" border-none	text-[14px]  w-[20px] h-[20px] "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AiOutlineEdit className="w-full h-full" />
        </button>
      ) : (
        <AddButton ToggleOptions={ToggleOptions} />
      )}
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="min-w-[1150px]"
      >
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <h3 className="flex w-full justify-center text-gray-700 font-bold text-lg ">
          {currentData ? "ویرایش پرسنل" : "افزودن پرسنل"}
        </h3>
        <form onSubmit={formik.handleSubmit} className="p-6 ">
          <div className="grid grid-cols-4 gap-6 my-6">
            <div className="inputRow">
              <InputText
                wrapperClassName="w-full"
                label="کد پرسنلی"
                name="personelCode"
                handleChange={formik.handleChange}
                values={formik.values.personelCode}
                important
                type={"text"}
                error={formik.errors.personelCode}
              />
            </div>
            <div className=" ">
              <InputText
                wrapperClassName="w-full"
                label="کد ملی"
                name="nationalCode"
                handleChange={formik.handleChange}
                values={formik.values.nationalCode}
                important
                type={"text"}
                error={formik.errors.nationalCode}
              />
            </div>
            <div className="col-span-2">
              <InputText
                label="نام و نام خانوادگی"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important
                type={"text"}
                error={formik.errors.name}
              />
            </div>
            <div className="col-span-1 ">
              <InputText
                wrapperClassName="w-full"
                label="شماره موبایل"
                name="mobile"
                handleChange={formik.handleChange}
                values={formik.values.mobile}
                important
                type={"text"}
                error={formik.errors.mobile}
              />
            </div>
            <div className="col-span-1 ">
              <InputText
                wrapperClassName="w-full"
                label="پست الکترونیک"
                name="email"
                handleChange={formik.handleChange}
                values={formik.values.email}
                type={"text"}
                error={formik.errors.email}
              />
            </div>
            {currentData && (
              <InputText
                readOnly
                label="نام کاربری"
                name="username"
                handleChange={formik.handleChange}
                values={formik.values.username}
                important
                type={"text"}
                error={formik.errors.username}
              />
            )}
            <div
              className={`${
                currentData ? "col-span-1" : "col-span-2 "
              } h-[40px] mb-[20px]`}
            >
              <CustomSwitch
                active={true}
                handleChange={(value) =>
                  formik.setFieldValue("isActive", value)
                }
              />
            </div>
            {!currentData && (
              <InputText
                label="نام کاربری"
                name="username"
                handleChange={formik.handleChange}
                values={formik.values.username}
                important
                type={"text"}
                error={formik.errors.username}
              />
            )}

            {!currentData && (
              <>
                <div className="col-span-1 ">
                  <InputText
                    label=" گذر واژه"
                    name="password"
                    handleChange={formik.handleChange}
                    values={formik.values.password}
                    important
                    type={"password"}
                    error={formik.errors.password}
                  />
                </div>
                <div className="col-span-1 ">
                  <InputText
                    wrapperClassName="w-full"
                    label=" تایید گذر واژه"
                    name="confirmPassword"
                    handleChange={formik.handleChange}
                    values={formik.values.confirmPassword}
                    important
                    type={"password"}
                    error={formik.errors.confirmPassword}
                  />
                </div>
              </>
            )}

            <div className="col-span-1  relative">
              <InputSelect
                name="isSuperAdmin"
                label="سوپر ادمین"
                values={formik.values.isSuperAdmin}
                handleChange={formik.setFieldValue}
                options={options}
                error={formik.errors.isSuperAdmin}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 ">
            <div className="col-span-2" />
            <div className="col-span-2 flex gap-4 w-full justify-end">
              <SimpleButton
                type="submit"
                text="بله"
                className="full-tomato-btn px-[50px] "
              />
              <SimpleButton
                type="button"
                text="خیر"
                className="full-lightTomato-btn px-[90px]"
                handelClick={() => {
                  setIsModalOpen(false);
                  formik.resetForm();
                }}
              />
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddEditPerson;

const validation = Yup.object().shape({
  personelCode: Yup.string().required(),
  nationalCode: Yup.string()
    .matches(NationalCodeRegex, VALIDPOSTALCODE)
    .required(),
  name: Yup.string().required(),
  mobile: Yup.string().matches(MobileRegex, VALIDMOBILE).required(),
  email: Yup.string().email(),
  username: Yup.string().matches(JustEngNameRegex).required(),
  password: Yup.string()
    .matches(ComplexPasswordRegex, VALIDCOMPLEXREGEX)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], UNMATCHPASSWORD)
    .required(),
  isSuperAdmin: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});

const validationEdit = Yup.object().shape({
  personelCode: Yup.string().required(),
  nationalCode: Yup.string()
    .matches(NationalCodeRegex, VALIDNATIONALCODE)
    .required(),
  name: Yup.string().required(),
  mobile: Yup.string().matches(MobileRegex, VALIDMOBILE).required(),
  email: Yup.string().email(),

  isSuperAdmin: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});
