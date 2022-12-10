import React, { useState, FC, useCallback, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";
import { MdSettingsAccessibility } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import InputText from "../../../global/InputText/InputText";
import axios from "axios";
import MultiSelect from "../../../global/multiselect/MultiSelect";

interface EditPersonRoleProps {
  currentData?: any;
  isGroup?: boolean;
}
const EditPersonRole: FC<EditPersonRoleProps> = ({ currentData, isGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rolesOptions, setRolesOptions] = useState<Array<any>>([]);
  console.log("currentData.selectRoles", currentData.selectRoles);

  const getRoleHandler = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://boxi.local:40000/resource-api/role/select?filter="
      );
      setRolesOptions(res.data.payload.content);
    } catch (error) {}
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: isGroup ? validationUsers : validation,
    initialValues: isGroup
      ? { users: [], role: currentData.selectRoles }
      : {
          id: currentData?.id,
          text: currentData?.name,
          role: currentData?.selectRoles,
        },
    onSubmit: async (values, { resetForm }) => {
      isGroup
        ? addRoleToUsers()
        : addRoleToUser({
            selectUser: {
              id: values.id,
              text: values.text,
            },
            selectRoles: values.role,
          });
    },
  });

  const addRoleToUsers = async () => {
    try {
    } catch (error) {}
  };
  const addRoleToUser = async (data: any) => {
    try {
      axios({
        url: "http://boxi.local:40000/resource-api/employee/role2user",
        method: "post",
        data: data,
      });
      toast.success("نقش مورد نظر به کاربر اضافه کردید");
      setIsModalOpen(false);
      formik.resetForm();
    } catch (error) {
      toast.error("مشکلی پیش آمده است");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getRoleHandler();
    }
  }, [getRoleHandler, isModalOpen]);
  console.log("valuese ", formik.values.role);

  return (
    <div>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px] "
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <MdSettingsAccessibility className="w-full h-full" />
      </button>
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="w-[500px] overflow-visible"
      >
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <h3 className="flex w-full justify-center text-gray-700 font-bold text-lg">
          تخصیص نقش
        </h3>
        <div className="w-full flex justify-center items-center">
          <div className="w-[90%] ">
            <form
              className="grid grid-cols-1 gap-4  p-6 w-full"
              onSubmit={formik.handleSubmit}
            >
              <div className="col-start-1 col-span-1">
                <InputText
                  wrapperClassName="w-full"
                  label="کدهاب"
                  name="name"
                  handleChange={formik.handleChange}
                  values={formik.values.text}
                  important
                  type={"text"}
                  error={formik.errors.text}
                />
              </div>
              <div className="col-start-1 col-span-1">
                <MultiSelect
                  wrapperClassName="w-full"
                  label="نقش ها "
                  name="role"
                  handleChange={formik.setFieldValue}
                  values={formik.values?.role}
                  options={rolesOptions}
                  error={formik.errors.role}
                />
              </div>
              <div className="col-start-1 col-span-1">
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
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditPersonRole;

const validation = Yup.object().shape({
  name: Yup.string(),
  role: Yup.array().required("مقادیر نباید خالی باشد"),
});
const validationUsers = Yup.object().shape({
  users: Yup.array().required("مقادیر نباید خالی باشد"),
  role: Yup.array().required("مقادیر نباید خالی باشد"),
});
