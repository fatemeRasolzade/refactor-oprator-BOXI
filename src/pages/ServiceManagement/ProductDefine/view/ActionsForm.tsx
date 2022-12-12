import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";

import { Formik, ErrorMessage } from "formik";

import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { apiRoute } from "../../../../services/apiRoute";
import { EditDataParams, PostDataParams, selectDataFromServer } from "../../../../services/Service_call";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
import CustomSwitch from "../../../../global/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { productData, updating } from "../../../../redux/ProductDefineData/ProductDefineData";
import { productDefineschema } from "./productDefineschema";

import AddExcel from "./AddExcel";
import { AiOutlineEdit } from "react-icons/ai";
import AddButton from "../../../../global/addButton/AddButton";

interface  PropsData{
  itemValue?:any
}

const ActionForms:React.FC <PropsData>= ({ itemValue }):JSX.Element => {
  const { productLists } = useSelector((state: any) => state.productDefine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    function getDataSelect() {
      try {
        selectDataFromServer(apiRoute().get.GET_PRODUCT_GROUPS).then((res: any) => {
          if (res.status === "OK") setProductOptions(res?.payload?.content);
        });
        // getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
      } catch (error) {
        ErrorAlert("دریافت دیتا با خطلا مواجه شد");
      }
    }
    if (isModalOpen) {
      getDataSelect();
    }
  }, [isModalOpen]);
  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن محصول" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  return (
    <>
      {!itemValue ? (
        <AddButton ToggleOptions={ToggleOptions} />
      ) : (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel setIsOpenModal={setUploadExcel} IsOpenModal={uploadExcel} />
      <Dialog open={isModalOpen} handler={setIsModalOpen} className={"overflow-visible p-5"}>
        <div className="text-lg font-medium">{itemValue ? "ویرایش محصول" : "افزودن محصول"}</div>
        <Formik
          initialValues={
            !itemValue
              ? {
                  code: "",
                  isActive: true,
                  name: "",
                  description: "",
                  productGroup: {
                    id: "",
                    text: "",
                  },
                }
              : {
                  id: itemValue?.id,
                  code: itemValue?.code,
                  name: itemValue?.name,
                  description: itemValue?.description,
                  isActive: itemValue?.isActive,
                  productGroup: {
                    id: itemValue.productGroup?.id,
                    text: itemValue.productGroup?.text,
                  },
                }
          }
          validationSchema={productDefineschema}
          onSubmit={(values) => {
            let body = {
              page: 1,
              body: {},
            };
            console.log(values);
            if (!itemValue) {
              console.log("run add");
              // dispatch(updating(true));
              PostDataParams(apiRoute().post.createProduct, values).then((res) => {
                if (res.status === "OK") {
                  SuccessAlert("با موفقیت ساخته شد");
                  productData({
                    code: "",
                    name: "",
                    isActive: "",
                    pageSize: 10,
                    pageNumber: "",
                  }) as any;
                } else {
                  console.log("run error");
                  // ErrorAlert("خطا در برقراری اطلاعات");
                }

                // dispatch(updating(false));

                setIsModalOpen(false);
              });
            } else {
              EditDataParams(apiRoute().edit.productDefine, values).then((res) => {
                // dispatch(updating(true));
                console.log("run edit");
                if (res.status === "OK") {
                  SuccessAlert("با موفقیت ویرایش شد");
                  productData({
                    code: "",
                    name: "",
                    isActive: "",
                    pageSize: 10,
                    pageNumber: "",
                  }) as any;
                } else {
                  console.log("run error");
                  // ErrorAlert("خطا در برقراری اطلاعات");
                }

                setIsModalOpen(false);
              });
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="p-5">
              <div className="w-full  grid grid-cols-2 gap-y-6 gap-x-4 content-center">
                <div>
                  <InputText
                    label="کد"
                    name="code"
                    handleChange={formik.handleChange}
                    values={formik.values.code}
                    important
                    type={"text"}
                    error={formik.touched.code && formik.errors.code}
                  />
                  {/* <ErrorMessage name="code" render={(messege) => <span className="text-tomato">{messege}</span>} /> */}
                </div>
                <div>
                  <InputText
                    label="عنوان"
                    name="name"
                    handleChange={formik.handleChange}
                    values={formik.values.name}
                    important
                    type={"text"}
                    error={formik.touched.name && formik.errors.name}
                  />
                  {/* <ErrorMessage name="name" render={(messege) => <span className="text-tomato">{messege}</span>} /> */}
                </div>
                {/* <div>
              <CustomSwitch />
              
              </div> */}{" "}
                <div>
                  <InputSelect
                    label="گروه بندی محصول"
                    important
                    name="productGroup"
                    handleChange={formik.setFieldValue}
                    values={formik.values.productGroup}
                    error={formik.touched.productGroup && formik.errors.productGroup}
                    // values={{
                    //   value: formik.values?.productGroup?.id,
                    //   label: 'formik.values?.productGroup?.text',
                    // }}
                    // options={[
                    //   { value: "gg", label: "gdfg" },
                    //   { value: "hj", label: "kjk" },
                    //   { value: "weqe", label: "tyt" },
                    // ]}
                    options={productOptions}
                  />
                </div>
                <div className="flex items-center">
                  <CustomSwitch
                    active={formik.values.isActive}
                    handleChange={(value: any) => formik.setFieldValue("isActive", value)}
                  />
                </div>
                <div className="!col-span-2 ">
                  <InputText
                    label="توضیحات"
                    name="description"
                    handleChange={formik.handleChange}
                    values={formik.values.description}
                    type={"textarea"}
                  />
                </div>
              </div>

              <div className="col-span-5 p-5 flex flex-row justify-end items-center">
                <Button className="border-none bg-secondaryColor text-dark" onClick={() => setIsModalOpen(false)}>
                  لغو
                </Button>
                <Button className="border-none bg-tomato mr-3" type="submit">
                  {itemValue ? "ویرایش" : "افزودن"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default ActionForms;
