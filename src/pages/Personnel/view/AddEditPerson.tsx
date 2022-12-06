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

interface AddEditPersonProps {
  currentData?: any;
}

const AddEditPerson: FC<AddEditPersonProps> = ({ currentData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
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

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    setErrors,
  } = formik;

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
        <SimpleButton
          text="افزودن"
          className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
          icon={<BiPlus color="white" />}
          handelClick={() => setIsModalOpen(!isModalOpen)}
        />
      )}
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="min-w-[1100px]"
      >
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <h3 className="flex w-full justify-center text-gray-700 font-bold text-lg">
          {currentData ? "ویرایش پرسنل" : "افزودن پرسنل"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-6 mb-6 p-6"
        >
          <div className="flex w-[90%] justify-start align-center gap-x-3">
            <InputText
              widthWrapper="w-[33%]"
              label="کد پرسنلی"
              name="personelCode"
              handleChange={formik.handleChange}
              values={formik.values.personelCode}
              important
              type={"text"}
            />
            <InputText
              widthWrapper="w-[33%]"
              label="کد ملی"
              name="nationalCode"
              handleChange={formik.handleChange}
              values={formik.values.nationalCode}
              important
              type={"text"}
            />
            <InputText
              widthWrapper="w-[33%]"
              label="نام و نام خانوادگی"
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              type={"text"}
            />
          </div>
          <div className="flex w-[90%] justify-start align-center gap-x-3">
            <InputText
              widthWrapper="w-[32.6%]"
              label="شماره موبایل"
              name="mobile"
              handleChange={formik.handleChange}
              values={formik.values.mobile}
              important
              type={"text"}
            />
            <InputText
              widthWrapper="w-[32.6%]"
              label="پست الکترونیک"
              name="email"
              handleChange={formik.handleChange}
              values={formik.values.email}
              type={"text"}
            />
            <div className="w-[15%] h-full justify-center items-center flex my-auto pb-[10px]">
              <CustomSwitch
                handleChange={(value: boolean) =>
                  setFieldValue("isActive", value)
                }
              />
            </div>
          </div>
          <div className="flex w-[90%] justify-start align-center gap-x-3">
            <InputText
              label="نام کاربری"
              name="username"
              handleChange={formik.handleChange}
              values={formik.values.username}
              important
              type={"text"}
            />
            <InputText
              label=" گذر واژه"
              name="password"
              handleChange={formik.handleChange}
              values={formik.values.password}
              important
              type={"text"}
            />
            <InputText
              label=" تایید گذر واژه"
              name="confirmPassword"
              handleChange={formik.handleChange}
              values={formik.values.confirmPassword}
              important
              type={"text"}
            />
            <InputText
              label="نام و نام خانوادگی"
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              type={"text"}
            />
          </div>
          <div className="flex w-[80%] justify-center gap-x-12">
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
  personelCode: Yup.number().positive().required(),
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
