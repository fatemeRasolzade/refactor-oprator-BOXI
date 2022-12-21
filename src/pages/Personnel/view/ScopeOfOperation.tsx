import { Dialog } from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useCallback, useEffect, useState } from "react";
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
  const [selectedHub, setSelectedHub] = useState<Array<any>>([]);
  const [IsLoading, setIsLoading] = useState(false);

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
            url: "http://boxi.local:40000/resource-api/employee/hubpermission",
            method: "POST",
            data: data,
          });
          toast.success("هاب با موفقیت به محدوده کاربر اضافه گردید");
          setIsModalOpen(false);
          resetForm();
          setTreeChecked([]);
        } catch (error) {
          setIsModalOpen(false);
          toast.error("مشکلی پیش آمده است");
        }
      } else {
        setTreeCheckedError("هاب نباید خالی باشد");
      }
    },
  });
  const getDataPerUser = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      const res = await axios({
        url: `http://boxi.local:40000/resource-api/employee/${id}`,
        method: "GET",
      });
      setIsLoading(false);
      setTreeChecked(res?.data?.payload?.selectRoles);
      setSelectedHub(res?.data?.payload?.selectHubs);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteHub = useCallback(
    async (id: number) => {
      try {
        await axios({
          url: `http://boxi.local:40000/resource-api/employee/employehub/${id}`,
          method: "DELETE",
        });
        toast.success("آیتم مورد نظر با موفقیت حذف گردید");
        setSelectedHub(selectedHub.filter((item) => item.id !== id));
      } catch (error) {}
    },
    [selectedHub]
  );

  useEffect(() => {
    if (isModalOpen) {
      getDataPerUser(currentData?.id);
    }
  }, [currentData?.id, getDataPerUser, isModalOpen]);

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
          <div className="col-span-4">
            {selectedHub.length === 0 && (
              <span className="w-full flex justify-center">
                مقداری موجود ندارد
              </span>
            )}
            <div className="min-h-[20px] w-full flex gap-4 my-3">
              {IsLoading ? (
                <p className="w-full flex justify-center">
                  در حال دریافت اطلاعات...
                </p>
              ) : (
                selectedHub.map((item: any) => (
                  <div
                    key={item.id}
                    className="w-fit p-1 bg-[#ffeae9]  flex items-center justify-center gap-2 rounded-[10px] text-sm	"
                  >
                    <span>{item.text}</span>
                    <button onClick={() => handleDeleteHub(item.id)}>
                      <GrFormClose />
                    </button>
                  </div>
                ))
              )}
            </div>
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
