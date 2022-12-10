import React, { FC, useState } from "react";
import * as Yup from "yup";
import { Button, Dialog } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { useFormik } from "formik";

import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { BiPlus } from "react-icons/bi";
import InputText from "../../../global/InputText/InputText";
import CustomSwitch from "../../../global/Switch/Switch";
import AddButton from "../../../global/addButton/AddButton";

interface AddEditPersonProps {
  currentData?: any;
}

const AddEditPerson: FC<AddEditPersonProps> = ({ currentData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
          isSuperAdmin: {},
          isActive: true,
        },
    onSubmit: async (values, { resetForm }) => {},
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
            <div className=" ">
              <InputText
                className="w-full"
                label="کد پرسنلی"
                name="personelCode"
                handleChange={formik.handleChange}
                values={formik.values.personelCode}
                important
                type={"text"}
              />
            </div>
            <div className=" ">
              <InputText
                className="w-full"
                label="کد ملی"
                name="nationalCode"
                handleChange={formik.handleChange}
                values={formik.values.nationalCode}
                important
                type={"text"}
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
              />
            </div>
            <div className="col-span-1 ">
              <InputText
                className="w-full"
                label="شماره موبایل"
                name="mobile"
                handleChange={formik.handleChange}
                values={formik.values.mobile}
                important
                type={"text"}
              />
            </div>
            <div className="col-span-1 ">
              <InputText
                className="w-full"
                label="پست الکترونیک"
                name="email"
                handleChange={formik.handleChange}
                values={formik.values.email}
                type={"text"}
              />
            </div>
            <div className="col-span-2 h-[40px] mb-[20px]">
              <CustomSwitch
                active={true}
                handleChange={(value) =>
                  formik.setFieldValue("isActive", value)
                }
              />
            </div>
            <InputText
              label="نام کاربری"
              name="username"
              handleChange={formik.handleChange}
              values={formik.values.username}
              important
              type={"text"}
            />
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
                  />
                </div>
                <div className="col-span-1 ">
                  <InputText
                    className="w-full"
                    label=" تایید گذر واژه"
                    name="confirmPassword"
                    handleChange={formik.handleChange}
                    values={formik.values.confirmPassword}
                    important
                    type={"password"}
                  />
                </div>
              </>
            )}

            <div className="col-span-1 ">
              <InputText
                className="w-full"
                label="سوپر ادمین"
                name="confirmPassword"
                handleChange={formik.handleChange}
                values={formik.values.confirmPassword}
                important
                type={"text"}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 ">
            <div className="col-span-2" />
            <div className="col-span-2 flex gap-4 w-full justify-end">
              <SimpleButton
                type="submit"
                text="بله"
                className="full-tomato-btn px-[90px] "
              />
              <SimpleButton
                type="button"
                text="خیر"
                className="full-lightTomato-btn px-[90px]"
                handelClick={() => {
                  setIsModalOpen(false);
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

const nationalCodeRegex = /^[0-9]{10}$/g;
const mobileRegex = /^09\d{9}$/g;
const nameRegex = /^[A-Za-z]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;

const validation = Yup.object().shape({
  personelCode: Yup.string().required("نام کاربری اجباری است"),
  nationalCode: Yup.string()
    .matches(nationalCodeRegex, "کد ملی معتبر نیست")
    .required("کد ملی اجباری است"),
  name: Yup.string().required(),
  mobile: Yup.string()
    .matches(mobileRegex, "شماره موبایل معتبر نیست ")
    .required("تلفن همراه اجباری است"),
  email: Yup.string().email("ایمیل معتبر نیست"),
  username: Yup.string().matches(nameRegex, "نام کاربری معتبر نیست").required(),
  password: Yup.string()
    .matches(
      passwordRegex,
      "پسورد باید شامل  حداقل 8 کاراکتر ،حروف بزرگ و کوچک  ،کاراکتر های ویژه  و عدد باشد"
    )
    .required("پسورد اجباری است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "رمز عبور مطابقت ندارد")
    .required("تکرار پسورد اجباری است"),
  isSuperAdmin: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});

const validationEdit = Yup.object().shape({
  personelCode: Yup.string().required("نام کاربری اجباری است"),
  nationalCode: Yup.string()
    .matches(nationalCodeRegex, "کد ملی معتبر نیست")
    .required(),
  name: Yup.string().required(),
  mobile: Yup.string()
    .matches(mobileRegex, "شماره موبایل معتبر نیست ")
    .required(),
  email: Yup.string().email("ایمیل معتبر نیست"),

  isSuperAdmin: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});
