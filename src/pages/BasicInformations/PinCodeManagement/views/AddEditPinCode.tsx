import { Dialog } from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

import AddButton from "../../../../global/addButton/AddButton";
import InputText from "../../../../global/InputText/InputText";
import MultiSelect from "../../../../global/multiselect/MultiSelect";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";

interface AddEditPinCodeProps {
  title: string;
  currentData?: any;
}
const AddEditPinCode: FC<AddEditPinCodeProps> = ({
  title,
  currentData,
}): JSX.Element => {
  const validation = Yup.object().shape({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {},
    onSubmit: async (values, { resetForm }) => {},
  });
  const handleOpenModal = () => setIsModalOpen(!isModalOpen);
  const handleUploadFileAction = () => {};

  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن پین کد" },
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
        <>
          <AddButton ToggleOptions={ToggleOptions} />
          {/* <AddExcel setIsOpenModal={setUploadExcel} IsOpenModal={uploadExcel} /> */}
        </>
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
          {currentData ? "ویرایش پین کد" : "افزودن پین کد"}
        </h3>
        <form onSubmit={formik.handleSubmit} className="p-6 ">
          <div className="grid grid-cols-4 gap-6 my-6">
            <div className="inputRow">
              <InputText
                readOnly={currentData ? true : false}
                wrapperClassName="w-full"
                label="پین کد"
                name="personelCode"
                handleChange={formik.handleChange}
                values={""}
                important
                type={"text"}
                // error={formik.errors.personelCode}
              />
            </div>
            <div>
              <MultiSelect
                wrapperClassName="w-fit"
                label="شهر"
                name="permission"
                handleChange={(valueName: any, value: any) =>
                  formik.setFieldValue(valueName, value)
                }
                values={[]}
                options={[]}
              />
            </div>
            <div className="inputRow">
              <InputText
                wrapperClassName="w-full"
                label="پین کد"
                name="personelCode"
                handleChange={formik.handleChange}
                values={""}
                important
                type={"text"}
                // error={formik.errors.personelCode}
              />
            </div>
            <div className="inputRow">
              <InputText
                wrapperClassName="w-full"
                label="پین کد"
                name="personelCode"
                handleChange={formik.handleChange}
                values={""}
                important
                type={"text"}
                // error={formik.errors.personelCode}
              />
            </div>
            <div className="inputRow">
              <InputText
                wrapperClassName="w-full"
                label="پین کد"
                name="personelCode"
                handleChange={formik.handleChange}
                values={""}
                important
                type={"text"}
                // error={formik.errors.personelCode}
              />
            </div>
            <div className="inputRow">
              <MultiSelect
                wrapperClassName="w-fit"
                label="نوع سوخت"
                name="permission"
                handleChange={(valueName: any, value: any) =>
                  formik.setFieldValue(valueName, value)
                }
                values={[]}
                options={[]}
              />
            </div>
            <div className="col-span-1 h-[40px] mt-[10px] flex gap-6">
              <span> Is Remote :</span>
              <CustomSwitch
                active={true}
                handleChange={(value) =>
                  formik.setFieldValue("isActive", value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 ">
            <div className="col-span-2" />
            <div className="col-span-2 flex gap-4 w-full justify-end">
              <SimpleButton
                type="submit"
                text="بله"
                className="full-tomato-btn px-[90px]"
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

export default AddEditPinCode;
