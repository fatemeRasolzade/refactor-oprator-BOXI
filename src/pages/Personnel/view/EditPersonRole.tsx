import React, { useState, FC, useCallback, useEffect } from "react";
import { Dialog } from "@material-tailwind/react";
import { MdSettingsAccessibility } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
import { useFormik } from "formik";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../global/InputSelect/InputSelect";
import InputText from "../../../global/InputText/InputText";
import axios from "axios";

interface EditPersonRoleProps {
  currentData?: any;
  isGroup?: boolean;
}
const EditPersonRole: FC<EditPersonRoleProps> = ({ currentData, isGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rolesOptions, setRolesOptions] = useState<Array<any>>([]);
  console.log("currentData", currentData);

  const getRoleHandler = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://boxi.local:40000/resource-api/role/select?filter="
      );
      setRolesOptions(res.data.payload.content);
    } catch (error) {}
  }, []);

  const addRoleToUser = useCallback(async () => {
    const data = {
      selectUser: {
        id: values.id,
        text: values.text,
      },
      selectRoles: values.role,
    };
  }, []);

  const addRoleToUsers = useCallback(async () => {}, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: isGroup ? validationUsers : validation,
    initialValues: isGroup
      ? { users: [], role: [] }
      : {
          id: currentData?.id,
          text: currentData?.name,
          role: [],
        },
    onSubmit: async (values, { resetForm }) => {
      // isGroup ? addRoleToUsers() : addRoleToUser(values);
    },
  });

  const handleSelect = (name: string, value: any) => {
    let newArray = [...values.role, value];

    // newArray.push(value);

    formik.setFieldValue(name, [...values.role, value]);
  };

  useEffect(() => {
    if (isModalOpen) {
      getRoleHandler();
    }
  }, [getRoleHandler, isModalOpen]);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    setErrors,
  } = formik;
  console.log("rendetr", values.role);
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
        className="min-w-[800px] overflow-visible"
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
        <form className="grid grid-cols-6 gap-4  p-6 " onSubmit={handleSubmit}>
          <div className="col-start-2 col-span-4 ">
            <InputText
              label="کدهاب"
              name="name"
              handleChange={handleChange}
              values={values.text}
              important
              type={"text"}
              error={errors.text}
            />
            <InputSelect
              wrapperClassName="w-full"
              label="نقش ها "
              name="users"
              handleChange={handleSelect}
              values={values?.role}
              options={rolesOptions}
            />
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
      </Dialog>
    </div>
  );
};

export default EditPersonRole;

const validation = Yup.object().shape({
  name: Yup.string(),
  role: Yup.array().required(),
});
const validationUsers = Yup.object().shape({
  users: Yup.array().required(),
  role: Yup.array().required(),
});
