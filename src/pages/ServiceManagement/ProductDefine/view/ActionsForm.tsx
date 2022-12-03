import { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";

import { Formik, ErrorMessage } from "formik";

import InputText from "../../../../global/Input/Input";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { apiRoute } from "../../../../services/apiRoute";
import { EditDataParams, PostDataParams, selectDataFromServer } from "../../../../services/Service_call";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
import CustomSwitch from "../../../../global/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { productData, updating } from "../../../../redux/ProductDefineData/ProductDefineData";
import { productDefineschema } from "./productDefineschema";
import DropButton from "./DropButton";
import AddExcel from "./AddExcel";
import { AiOutlineEdit } from "react-icons/ai";

const ActionForms = ({ itemValue }: any) => {
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
          if (res.status === "OK") setProductOptions(res.payload.content);
        });
        // getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
      } catch (error) {
        ErrorAlert("دریافت دیتا با خطلا مواجه شد");
      }
    }
    getDataSelect();
  }, []);
  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const options = [
    { clickSub: handleAction, name: "افزودن محصول" },
    { clickSub: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  return (
    <>
      {!itemValue ? (
        <DropButton options={options} />
      ) : (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel setIsOpenModal={setUploadExcel} IsOpenModal={uploadExcel} />
      <Dialog open={isModalOpen} handler={setIsModalOpen} className={"overflow-visible"}>
        <Formik
          initialValues={
            !itemValue
              ? {
                  code: "",
                  isActive: true,
                  name: "",
                  description: "",
                  productGroup: {
                    id: "gfhg",
                    text: "hjghkkk",
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
            console.log(values);
            if (!itemValue) {
              // dispatch(updating(true));
              PostDataParams(apiRoute().post.createProduct, values).then((res) => {
                if (res.status === "OK") {
                  SuccessAlert("با موفقیت ساخته شد");
                  dispatch(productData({}) as any);
                } else {
                  ErrorAlert("خطا در برقراری اطلاعات");
                }

                // dispatch(updating(false));

                setIsModalOpen(false);
              });
            } else {
              EditDataParams(apiRoute().edit.productDefine, values).then((res) => {
                // dispatch(updating(true));
                if (res.status === "OK") {
                  SuccessAlert("با موفقیت ویرایش شد");
                  dispatch(productData({}) as any);
                } else {
                  ErrorAlert("خطا در برقراری اطلاعات");
                }

                setIsModalOpen(false);
              });
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="p-5">
              <div className="w-full  grid grid-cols-2 gap-y-10 gap-x-4 content-center">
                <div>
                  <InputText
                    title="کد"
                    name="code"
                    handelChange={formik.handleChange}
                    values={formik.values.code}
                    important
                    type={"text"}
                  />
                  <ErrorMessage name="code" render={(messege) => <span className="text-tomato">{messege}</span>} />
                </div>
                <div>
                  <InputText
                    title="عنوان"
                    name="name"
                    handelChange={formik.handleChange}
                    values={formik.values.name}
                    important
                    type={"text"}
                  />
                  <ErrorMessage name="name" render={(messege) => <span className="text-tomato">{messege}</span>} />
                </div>
                {/* <div>
              <CustomSwitch />
              </div> */}{" "}
                <div>
                  <InputSelect
                    text="گروه بندی محصول"
                    name="productGroup"
                    handelChange={formik.setFieldValue}
                    values={formik.values.productGroup}
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
                  <CustomSwitch handleChange={(value: any) => formik.setFieldValue("isActive", value)} />
                </div>
                <div className="!col-span-2 ">
                  <InputText
                    title="توضیحات"
                    name="description"
                    handelChange={formik.handleChange}
                    values={formik.values.description}
                    type={"textarea"}
                  />
                  <ErrorMessage
                    name="description"
                    render={(messege) => <span className="text-tomato">{messege}</span>}
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
