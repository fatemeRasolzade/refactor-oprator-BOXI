import React, { useState, FC, useCallback, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";
import { MdSettingsAccessibility } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { TiGroupOutline } from "react-icons/ti";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import InputText from "../../../global/InputText/InputText";
import axios from "axios";
import MultiSelect from "../../../global/multiselect/MultiSelect";
import { useDispatch } from "react-redux";
import { PersonnelData } from "../../../redux/PersonData/PersonsData";
import { Actionpage } from "../../../redux/PaginationAction/PaginationAction";

interface EditPersonRoleProps {
  currentData?: any;
  isGroup?: boolean;
}
const EditPersonRole: FC<EditPersonRoleProps> = ({ currentData, isGroup }) => {
  const dispatch = useDispatch();

  const { selectedRows } = useSelector((state: any) => state?.selectRowTable);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rolesOptions, setRolesOptions] = useState<Array<any>>([]);

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
      ? {
          users:
            selectedRows && selectedRows.length !== 0
              ? selectedRows.map((item: any) => {
                  return {
                    id: item.id,
                    text: item.name,
                  };
                })
              : [],
          role: undefined,
        }
      : {
          id: currentData?.id,
          text: currentData?.name,
          role: currentData?.selectRoles,
        },
    onSubmit: async (values, { resetForm }) => {
      isGroup
        ? addRoleToUsers({
            selectUsers: values.users,
            selectRoles: values.role,
          })
        : addRoleToUser({
            selectUser: {
              id: values.id,
              text: values.text,
            },
            selectRoles: values.role,
          });
    },
  });
  const handleGroupOpenModal = () => {
    if (selectedRows && selectedRows.length !== 0) {
      setIsModalOpen(!isModalOpen);
    } else {
      toast.warning("حداقل یک شخص باید انتخاب شده باشد ");
    }
  };
  const addRoleToUsers = async (data: any) => {
    try {
      await axios({
        url: "http://boxi.local:40000/resource-api/employee/roles2users",
        method: "post",
        data: data,
      });
      toast.success("نقش ها  به کاربران اضافه 'گردیدند'");
      setIsModalOpen(false);
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
      dispatch(Actionpage(1));
    } catch (error: any) {}
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
      dispatch(Actionpage(1));
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
    } catch (error: any) {}
  };

  useEffect(() => {
    if (isModalOpen) {
      getRoleHandler();
    }
  }, [getRoleHandler, isModalOpen]);
  return (
    <div>
      {isGroup ? (
        <li>
          <button
            className="flex justify-center items-center gap-3"
            onClick={handleGroupOpenModal}
          >
            <span>تخصیصی گروهی</span>
            <TiGroupOutline height={"1em"} width={"1em"} />
          </button>
        </li>
      ) : (
        <button
          className=" border-none	text-[14px]  w-[20px] h-[20px] "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <MdSettingsAccessibility className="w-full h-full" />
        </button>
      )}

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
                {isGroup ? (
                  <MultiSelect
                    wrapperClassName="w-full"
                    label="کاربران"
                    name="users"
                    isDisabled={isGroup}
                    handleChange={formik.setFieldValue}
                    values={formik.values?.users}
                    options={[]}
                    error={formik.errors.users}
                  />
                ) : (
                  <InputText
                    readOnly={currentData ? true : false}
                    wrapperClassName="w-full"
                    label="نام کاربر"
                    name="name"
                    handleChange={formik.handleChange}
                    values={formik.values.text}
                    important
                    type={"text"}
                    error={formik.errors.text}
                  />
                )}
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
  users: Yup.array(),
  role: Yup.array().required("مقادیر نباید خالی باشد"),
});
