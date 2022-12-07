import React, { FC, useEffect, useState } from "react";
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
const nodeArray = [
  {
    value: "1001",
    name: "hub management",
    label: "مدیریت هاب",
    children: [
      {
        value: "100101",
        name: "hub ",
        label: "مدیریت هاب - هاب",
        children: [
          {
            value: "10010101",
            name: "add hub",
            label: "افزودن هاب",
            children: [],
          },
          {
            value: "10010102",
            name: "add hub grouping",
            label: "افزودن گروهی هاب با اکسل",
            children: [],
          },
          {
            value: "10010103",
            name: "edit hub",
            label: "ویرایش هاب",
            children: [],
          },
          {
            value: "10010104",
            name: "delete hub",
            label: "حذف هاب",
            children: [],
          },
        ],
      },
      {
        value: "100102",
        name: "hub cayegory",
        label: "مدیریت هاب - گونه هاب",
        children: [
          {
            value: "10010201",
            name: "add hub cayegory",
            label: "افزودن گونه هاب",
            children: [],
          },
          {
            value: "10010202",
            name: "edit hub cayegory",
            label: "ویرایش  گونه هاب",
            children: [],
          },
          {
            value: "10010203",
            name: "delete hub cayegory",
            label: "حذف  گونه هاب",
            children: [],
          },
        ],
      },
    ],
  },
  {
    value: "1002",
    name: "employee management",
    label: "مدیریت پرسنل",
    children: [
      {
        value: "100201",
        name: "add employee",
        label: "افزودن پرسنل",
        children: [],
      },
      {
        value: "100202",
        name: "add employee grouping",
        label: "افزودن گروهی پرسنل با اکسل",
        children: [],
      },
      {
        value: "100203",
        name: "edit employee",
        label: "ویرایش پرسنل",
        children: [],
      },
      {
        value: "100204",
        name: "delete employee",
        label: "حذف پرسنل",
        children: [],
      },
      {
        value: "100205",
        name: "assign role to employee",
        label: "تخصیص نقش به پرسنل",
        children: [],
      },
      {
        value: "100206",
        name: "assign role to employee grouping",
        label: "تخصیص نقش به پرسنل گروهی",
        children: [],
      },
    ],
  },
  {
    value: "1003",
    name: "role management",
    label: "مدیریت نقش",
    children: [
      {
        value: "100301",
        name: "add role",
        label: "افزودن نقش",
        children: [],
      },
      {
        value: "100302",
        name: "edit role",
        label: "ویرایش نقش",
        children: [],
      },
      {
        value: "100303",
        name: "delete role",
        label: "حذف نقش",
        children: [],
      },
      {
        value: "100304",
        name: "assign permission to role",
        label: "تخصیص دسترسی به نقش",
        children: [],
      },
    ],
  },
  {
    value: "1004",
    name: "product def",
    label: "تعریف محصول",
    children: [
      {
        value: "100401",
        name: "add product",
        label: "افزودن محصول",
        children: [],
      },
      {
        value: "100402",
        name: "add product grouping",
        label: "افزودن گروهی محصول",
        children: [],
      },
      {
        value: "100403",
        name: "edit product",
        label: "ویرایش محصول",
        children: [],
      },
      {
        value: "100404",
        name: "delete product",
        label: "حذف محصول",
        children: [],
      },
      {
        value: "100405",
        name: "add product attribute",
        label: "افزودن مشخصات محصول",
        children: [],
      },
      {
        value: "100406",
        name: "edit product attribute",
        label: "ویرایش مشخصات محصول",
        children: [],
      },
      {
        value: "100407",
        name: "delete product attribute",
        label: "حذف مشخصات محصول",
        children: [],
      },
      {
        value: "100408",
        name: "view product attribute",
        label: "مشاهده مشخصات محصول",
        children: [],
      },
    ],
  },
  {
    value: "1005",
    name: "service def",
    label: "تعریف سرویس",
    children: [
      {
        value: "100501",
        name: "add service",
        label: "افزودن سرویس",
        children: [],
      },
      {
        value: "100502",
        name: "ass service grouping",
        label: "افزودن گروهی سرویس با اکسل",
        children: [],
      },
      {
        value: "100503",
        name: "edit service",
        label: "ویرایش سرویس",
        children: [],
      },
      {
        value: "100504",
        name: "delete service",
        label: "حذف سرویس",
        children: [],
      },
    ],
  },
  {
    value: "1006",
    name: "serice delivery",
    label: "ارائه سرویس",
    children: [
      {
        value: "100601",
        name: "add service delivery",
        label: "افزودن ارائه سرویس",
        children: [],
      },
      {
        value: "100602",
        name: "add service delivery grouping",
        label: "افزودن گروهی ارائه سرویس با اکسل",
        children: [],
      },
      {
        value: "100603",
        name: "edit service delivery",
        label: "ویرایش ارائه سرویس",
        children: [],
      },
      {
        value: "100604",
        name: "delete service delivery",
        label: "حذف ارائه سرویس",
        children: [],
      },
    ],
  },
  {
    value: "1007",
    name: "third party",
    label: "اشخاص حقیقی حقوقی",
    children: [
      {
        value: "100701",
        name: "add party",
        label: "افزودن شخصیت",
        children: [],
      },
      {
        value: "100702",
        name: "add party grouping",
        label: "افزودن گروهی شخصیت با اکسل",
        children: [],
      },
      {
        value: "100703",
        name: "edit party",
        label: "ویرایش شخصیت",
        children: [],
      },
      {
        value: "100704",
        name: "delete party",
        label: "حذف شخصیت",
        children: [],
      },
    ],
  },
  {
    value: "1008",
    name: "transport",
    label: "حمل ونقل",
    children: [
      {
        value: "100801",
        name: "vendor",
        label: "حمل و نقل - شرکت های نقلیه",
        children: [
          {
            value: "10080101",
            name: "add vendor",
            label: "افزودن شرکت نقلیه",
            children: [],
          },
          {
            value: "10080102",
            name: "add vendor grouping",
            label: "افزودن گروهی شرکت نقلیه با اکسل",
            children: [],
          },
          {
            value: "10080103",
            name: "edit vendor",
            label: "ویرایش شرکت نقلیه",
            children: [],
          },
          {
            value: "10080104",
            name: "delete vendor",
            label: "حذف شرکت نقلیه",
            children: [],
          },
        ],
      },
      {
        value: "100802",
        name: "vehicle make",
        label: "حمل و نقل - مدل وسیله نقلیه",
        children: [
          {
            value: "10080201",
            name: "add vehicle make",
            label: "افزودن مدل وسیله نقلیه",
            children: [],
          },
          {
            value: "10080202",
            name: "add vehicle make grouping",
            label: "افزودن گروهی مدل وسیله نقلیه با اکسل",
            children: [],
          },
          {
            value: "10080203",
            name: "edit vehicle make",
            label: "ویرایش مدل وسیله نقلیه",
            children: [],
          },
          {
            value: "10080204",
            name: "delete vehicle make",
            label: "حذف مدل وسیله نقلیه",
            children: [],
          },
        ],
      },
      {
        value: "100803",
        name: "vehicle",
        label: "حمل و نقل - وسیله نقلیه",
        children: [
          {
            value: "10080301",
            name: "add vehicle",
            label: "افزودن وسیله نقلیه",
            children: [],
          },
          {
            value: "10080302",
            name: "add vehicle grouping",
            label: "افزودن گروهی وسیله نقلیه با اکسل",
            children: [],
          },
          {
            value: "10080303",
            name: "edit vehicle",
            label: "ویرایش وسیله نقلیه",
            children: [],
          },
          {
            value: "10080304",
            name: "delete vehicle",
            label: "حذف وسیله نقلیه",
            children: [],
          },
        ],
      },
      {
        value: "100804",
        name: "route",
        label: "حمل و نقل - مسیر",
        children: [
          {
            value: "10080401",
            name: "add route",
            label: "افزودن مسیر",
            children: [],
          },
          {
            value: "10080402",
            name: "add route grouping",
            label: "افزودن گروهی مسیر با اکسل",
            children: [],
          },
          {
            value: "10080403",
            name: "edit route",
            label: "ویرایش مسیر",
            children: [],
          },
          {
            value: "10080404",
            name: "delete route",
            label: "حذف مسیر",
            children: [],
          },
        ],
      },
      {
        value: "100806",
        name: "exception",
        label: "حمل و نقل - استثناء",
        children: [
          {
            value: "10080601",
            name: "add exception",
            label: "افزودن استثناء",
            children: [],
          },
          {
            value: "10080602",
            name: "add exception grouping",
            label: "افزودن گروهی استثناء با اکسل",
            children: [],
          },
          {
            value: "10080603",
            name: "edit exception",
            label: "ویرایش استثناء",
            children: [],
          },
        ],
      },
      {
        value: "100807",
        name: "bagging",
        label: "حمل و نقل - کیسه بندی",
        children: [
          {
            value: "10080701",
            name: "add bag",
            label: "افزودن کیسه",
            children: [],
          },
          {
            value: "10080702",
            name: "add bag grouping",
            label: "افزودن گروهی کیسه با اکسل",
            children: [],
          },
          {
            value: "10080703",
            name: "edit bag",
            label: "ویرایش کیسه",
            children: [],
          },
          {
            value: "10080704",
            name: "delete bag",
            label: "حذف کیسه",
            children: [],
          },
        ],
      },
      {
        value: "100808",
        name: "dock",
        label: "حمل و نقل - بارانداز",
        children: [
          {
            value: "10080801",
            name: "add dock",
            label: "افزودن بارانداز",
            children: [],
          },
          {
            value: "10080802",
            name: "add dock grouping",
            label: "افزودن گروهی بارانداز با اکسل",
            children: [],
          },
          {
            value: "10080803",
            name: "edit dock",
            label: "ویرایش بارانداز",
            children: [],
          },
          {
            value: "10080804",
            name: "delete dock",
            label: "حذف بارانداز",
            children: [],
          },
        ],
      },
      {
        value: "100809",
        name: "gate",
        label: "حمل و نقل - درب",
        children: [
          {
            value: "10080901",
            name: "add gate",
            label: "افزودن درب",
            children: [],
          },
          {
            value: "10080902",
            name: "add gate grouping",
            label: "افزودن گروهی درب با اکسل",
            children: [],
          },
          {
            value: "10080903",
            name: "edit gate",
            label: "ویرایش درب",
            children: [],
          },
          {
            value: "10080904",
            name: "delete gate",
            label: "حذف درب",
            children: [],
          },
        ],
      },
    ],
  },
  {
    value: "100805",
    name: "connection",
    label: "حمل و نقل - اتصال",
    children: [],
  },
  {
    value: "1009",
    name: "ADM vehicle",
    label: "وسایل نقلیه اجاره ای",
    children: [
      {
        value: "100901",
        name: "add ADM vehice",
        label: "افزودن وسیله نقلیه اجاره ای",
        children: [],
      },
      {
        value: "100902",
        name: "add ADM vehice grouping",
        label: "افزودن گروهی وسیله نقلیه اجاره ای با اکسل",
        children: [],
      },
      {
        value: "100903",
        name: "edit ADM vehice",
        label: "ویرایش وسیله نقلیه اجاره ای",
        children: [],
      },
      {
        value: "100904",
        name: "delete ADM vehice",
        label: "حذف وسیله نقلیه اجاره ای",
        children: [],
      },
    ],
  },
  {
    value: "1010",
    name: "customer management",
    label: "مدیریت مشتریان",
    children: [
      {
        value: "101001",
        name: "add customer",
        label: "افزودن  مشتری",
        children: [],
      },
      {
        value: "101002",
        name: "add customer grouping",
        label: "افزودن گروهی مشتری با اکسل",
        children: [],
      },
      {
        value: "101003",
        name: "edit customer",
        label: "ویرایش مشتری",
        children: [],
      },
      {
        value: "101004",
        name: "delete customer",
        label: "حذف مشتری",
        children: [],
      },
    ],
  },
  {
    value: "1011",
    name: "product group",
    label: "تعریف گروه محصول",
    children: [
      {
        value: "101101",
        name: "add product group",
        label: "افزودن گروه محصول",
        children: [],
      },
      {
        value: "101102",
        name: "edit product group",
        label: "ویرایش گروه محصول",
        children: [],
      },
      {
        value: "101103",
        name: "delete product group",
        label: "حذف گروه محصول",
        children: [],
      },
    ],
  },
  {
    value: "1012",
    name: "time commitment",
    label: "تعریف مدت ارائه خدمت",
    children: [
      {
        value: "101201",
        name: "add time commitment",
        label: "افزودن مدت ارائه خدمت",
        children: [],
      },
      {
        value: "101202",
        name: "edit time commitment",
        label: "ویرایش مدت ارائه خدمت",
        children: [],
      },
      {
        value: "101203",
        name: "delete time commitment",
        label: "حذف مدت ارائه خدمت",
        children: [],
      },
    ],
  },
  {
    value: "1013",
    name: "custom country devision",
    label: "تعریف رده جغرافیایی سفارشی",
    children: [
      {
        value: "101301",
        name: "add custom country devision",
        label: "افزودن رده جغرافیایی",
        children: [],
      },
      {
        value: "101302",
        name: "add custom country devision grouping",
        label: "افزودن گروهی رده جغرافیایی با اکسل",
        children: [],
      },
      {
        value: "101303",
        name: "edit custom country devision",
        label: "ویرایش رده جغرافیایی",
        children: [],
      },
      {
        value: "101304",
        name: "delete custom country devision",
        label: "حذف رده جغرافیایی",
        children: [],
      },
    ],
  },
];
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
  const [nodes, setNodes] = useState([...nodeArray]);

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
      // handleAccess();
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
                  handleChange={(checked: boolean) =>
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
                      Loading ....
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
