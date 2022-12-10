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

import "react-checkbox-tree/lib/react-checkbox-tree.css";

import CustomSwitch from "../../../global/Switch/Switch";
import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { RoleData } from "../../../redux/RolsData/RolesData";
import { SuccessAlert } from "../../../global/alert/Alert";

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
                isActive: isActive,
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
              <div className="w-full relative">
                <div className="flex justify-center pr-[10px] text-[0.875rem] font-sm text-[#686a68] dark:text-white absolute top-[-10px] right-[15px] bg-[white]">
                  دسترسی ها
                  <span className="text-[#ef5644]">&nbsp;* &nbsp;</span>
                </div>
                <div className="  border border-[#ababab] text-gray-900 text-sm rounded-lg w-[75%] focus:border-blue-500 block px-2.5 py-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {loadingNode ? (
                    <div className="flex w-full h-[200px] justify-center items-center">
                      <BeatLoader color="#EF5644" />
                    </div>
                  ) : (
                    <CheckboxTree
                      direction="rtl"
                      nodes={nodes}
                      checked={treeChecked}
                      expanded={expanded}
                      onCheck={(checked: Array<string>) => {
                        setTreeChecked(checked);
                      }}
                      onExpand={(expanded: any) => setExpanded(expanded)}
                      icons={icons}
                    />
                  )}
                </div>
                <p className="text-[#d05372] text-[10px]">
                  {treeCheckedError && treeCheckedError}
                </p>
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
          </div>
        </form>
      </Dialog>
    </div>
  );
};
const icons = {
  check: <MdCheckBox className="rct-icon rct-icon-check text-[#EF5644] " />,
  uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
  halfCheck: (
    <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
  ),
  expandClose: <MdChevronLeft className="rct-icon rct-icon-expand-close" />,
  expandOpen: <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />,
  expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
  collapseAll: (
    <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
  ),
  parentClose: <></>,
  parentOpen: <></>,
  leaf: <></>,
};
export default AddEditRole;
