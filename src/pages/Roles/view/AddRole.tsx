import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";
import axios from "axios";
import {
  MdAddBox,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronLeft,
  MdIndeterminateCheckBox,
  MdKeyboardArrowDown,
} from "react-icons/md";
import CheckboxTree from "react-checkbox-tree";
import * as yup from "yup";
import { useFormik } from "formik";
import { BiPlus } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BeatLoader } from "react-spinners";

import CustomSwitch from "../../../global/Switch/Switch";
import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { RoleData } from "../../../redux/RolsData/RolesData";
import { SuccessAlert } from "../../../global/alert/Alert";
import CheckBoxThree from "../../../components/checkbox/CheckBoxThree";

interface EditRoleProps {
  currentData?: any;
  title: string;
  isActive: boolean;
  isSomeEdit?: boolean;
}

const validation = yup.object().shape({
  name: yup.string().required("این فیلد اجبرای است"),
});
const AddEditRole: FC<EditRoleProps> = ({
  currentData,
  title,
  isActive,
  isSomeEdit,
}): JSX.Element => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [treeChecked, setTreeChecked] = useState<Array<string>>(
    currentData && Array.isArray(currentData?.permsCodes)
      ? currentData?.permsCodes
      : []
  );
  const [treeCheckedError, setTreeCheckedError] = useState("");
  const [loadingNode, setLoadingNode] = useState(false);
  const [nodes, setNodes] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      name: currentData ? currentData.name : "",
      isActive: currentData ? currentData.isActive : true,
    },
    onSubmit: async (values, { resetForm }) => {
      const data = currentData
        ? {
            id: currentData.id,
            name: values.name,
            isActive: values.isActive,
            permsCodes: treeChecked,
          }
        : {
            name: values.name,
            isActive: values.isActive,
            permsCodes: treeChecked,
          };
      if (treeChecked?.length !== 0) {
        try {
          const res = await axios({
            url: "http://boxi.local:40000/resource-api/role",
            method: currentData ? "put" : "post",
            data: data,
          });
          if (200 <= res.status && res.status < 300) {
            dispatch(
              RoleData({
                permission: "",
                name: "",
                isActive: true,
                pageSize: 10,
                pageNumber: 1,
              }) as any
            );
            SuccessAlert(
              currentData
                ? "با موفقیت بروزرسانی گردید"
                : "با موفقیت اضافه گردید"
            );
            values.name = "";
            setTreeChecked([]);
            setIsModalOpen(false);
          }
        } catch (error) {}
      } else {
        setTreeCheckedError("دسترسی نباید خالی باشد");
      }
    },
  });

  const handleAccess = async () => {
    try {
      setLoadingNode(true);
      const data = await axios({
        method: "post",
        url: "http://boxi.local:40000/resource-api/permission/fetchPermissions",
        data: {
          in: "hojjat",
        },
      });
      setNodes(data.data ? data.data : []);
      setLoadingNode(false);
    } catch (error) {
      setLoadingNode(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      handleAccess();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (treeChecked.length !== 0) {
      setTreeCheckedError("");
    }
  }, [treeChecked.length]);

  const { values, errors, handleSubmit, setFieldValue } = formik;

  return (
    <div>
      {currentData ? (
        <button
          className=" border-none	text-[14px]  w-[20px] h-[20px] "
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AiOutlineEdit size={20} className="w-full h-full" />
        </button>
      ) : (
        <button
          className={`btn full-tomato-btn w-full`}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <span className="px-5">افزودن</span>{" "}
          <span>
            <BiPlus color="white" />
          </span>
        </button>
      )}

      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <h3 className="flex w-full justify-center text-gray-700 font-bold text-lg">
          {title}
        </h3>
        <form className="grid grid-cols-1  p-6" onSubmit={handleSubmit}>
          <div>
            <div className="w-full flex justify-between gap-x-12">
              <div className="w-[80%] flex-col">
                <InputText
                  wrapperClassName="w-full"
                  readOnly={isSomeEdit}
                  label="کدهاب"
                  name="name"
                  handleChange={formik.handleChange}
                  values={formik.values.name}
                  important
                  type={"text"}
                  error={errors.name}
                />
              </div>
              <div className="w-[20%] h-full justify-center items-center flex mx-auto mt-[8px]">
                <CustomSwitch
                  active={values.isActive}
                  handleChange={(checked: any) =>
                    setFieldValue("isActive", checked)
                  }
                />
              </div>
            </div>
            <div className="w-full mt-[15px]">
              <CheckBoxThree
                nodes={nodes}
                treeCheckedError={treeCheckedError}
                loadingNode={loadingNode}
                title="دسترسی ها"
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
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddEditRole;
