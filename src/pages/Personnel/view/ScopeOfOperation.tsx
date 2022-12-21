import { Dialog } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { CgArrangeFront } from "react-icons/cg";
import { GrFormClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import CheckBoxThree from "../../../components/checkbox/CheckBoxThree";
import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface ScopeOfOperationProps {
  currentData: any;
}
const ScopeOfOperation: FC<ScopeOfOperationProps> = ({ currentData }) => {
  const userInfo = useSelector((state: any) => state.userInfo);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [treeCheckedError, setTreeCheckedError] = useState("");
  const [treeChecked, setTreeChecked] = useState<Array<string>>([]);

  const validationEdit = Yup.object().shape({});
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationEdit,
    initialValues: {
      id: currentData?.id,
      text: currentData?.name,
    },
    onSubmit: async (values, { resetForm }) => {
      if (treeChecked?.length !== 0) {
        const data = {
          selectemployee: { id: values.id, text: values.text },
          selecthublist: treeChecked,
        };
        try {
          await axios({
            url: "",
            method: "POST",
            data: data,
          });
          toast.success("هاب با موفقیت به محدوده کاربر اضافه گردید");
          setIsModalOpen(false);
          resetForm();
        } catch (error) {
          setIsModalOpen(false);
          toast.error("مشکلی پیش آمده است");
        }
      } else {
        setTreeCheckedError("هاب نباید خالی باشد");
      }
    },
  });
  return (
    <div>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px] "
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <CgArrangeFront className="w-full h-full" />
      </button>
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="min-w-[700px]"
      >
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <h3 className="flex w-full justify-center text-gray-700 font-bold text-lg ">
          محدوده عملیات
        </h3>
        <form onSubmit={formik.handleSubmit} className="p-6 ">
          <InputText
            readOnly={true}
            wrapperClassName="w-full"
            label="نام کاربر"
            name="name"
            handleChange={formik.handleChange}
            values={formik.values.text}
            important
            type={"text"}
            error={formik.errors.text}
          />
          <div className="col-span-4">
            <CheckBoxThree
              nodes={userInfo?.hublist ? userInfo?.hublist : []}
              loadingNode={false}
              title="هاب"
              treeCheckedError={treeCheckedError}
              treeChecked={treeChecked}
              setTreeChecked={(checked: Array<string>) => {
                setTreeChecked(checked);
              }}
            />
          </div>
          <div className="flex w-full justify-end gap-3 mt-3">
            <SimpleButton
              type="submit"
              text="بله"
              className="full-tomato-btn px-[50px] "
            />
            <SimpleButton
              type="button"
              text="خیر"
              className="full-lightTomato-btn  px-[50px] "
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

export default ScopeOfOperation;
