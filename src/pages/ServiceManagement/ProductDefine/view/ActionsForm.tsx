import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { apiRoute } from "../../../../services/apiRoute";
import { EditDataParams, PostDataParams, selectDataFromServer } from "../../../../services/Service_call";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
import CustomSwitch from "../../../../global/Switch/Switch";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../../../../redux/ProductDefineData/ProductDefineData";
import { productDefineschema } from "./productDefineschema";
import { AiOutlineEdit } from "react-icons/ai";
import AddButton from "../../../../global/addButton/AddButton";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import Modal from "../../../../global/Modal/Modal";
import MultiLineText from "../../../../global/MultiLineText/MultiLineText";
import AddExcel from "../../../../components/exel/AddExcel";
import { ProductExcel } from "../../../../tools/services/ExcelInfoFile";

interface PropsData {
  itemValue?: any;
}

const ActionForms: React.FC<PropsData> = ({ itemValue }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function getDataSelect() {
      try {
        selectDataFromServer(apiRoute().get.GET_PRODUCT_GROUPS).then((res: any) => {
          if (res.status === "OK") setProductOptions(res?.payload?.content);
        });
        // getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
      } catch (error) {
        console.log("run error");
        
          // @ts-ignore
        ErrorAlert(error?.res?.data.errors.message);
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
    { handleClick: handleAction, name: "???????????? ??????????" },
    { handleClick: handleUploadFileAction, name: "???????????? ?????????? ????????" },
  ];
  const setUpdate=()=>{
    dispatch(
      productData({
        isActive: "",
        pageSize: 10,
        pageNumber: "",
      }) as any
    );
  }

  return (
    <>
      {!itemValue ? (
        <AddButton ToggleOptions={ToggleOptions} />
      ) : (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel excelInfo={ProductExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} setUpdate={setUpdate}/>
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={itemValue ? "????????????  ??????????" : "???????????? ??????????"}>
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
            if (!itemValue) {
              setLoading(true);
              PostDataParams(apiRoute().post.createProduct, values).then((res) => {
                if (res.status === "OK") {
                  SuccessAlert("???? ???????????? ?????????? ????");
                  dispatch(
                    productData({
                      code: "",
                      name: "",
                      isActive: "",
                      pageSize: 10,
                      pageNumber: "",
                    }) as any
                  );
                  setLoading(false);
                } else {
                  console.log("run error");
                  setLoading(false);
                  // ErrorAlert("?????? ???? ?????????????? ??????????????");
                }

                // dispatch(updating(false));

                setIsModalOpen(false);
              });
            } else {
              setLoading(true);
              EditDataParams(apiRoute().edit.productDefine, values).then((res) => {
                // dispatch(updating(true));
                console.log("run edit");
                if (res.status === "OK") {
                  SuccessAlert("???? ???????????? ???????????? ????");
                  dispatch(
                    productData({
                      code: "",
                      name: "",
                      isActive: "",
                      pageSize: 10,
                      pageNumber: "",
                    }) as any
                  );
                  setLoading(false);
                } else {
                  console.log("run error");
                  setLoading(false);
                  // ErrorAlert("?????? ???? ?????????????? ??????????????");
                }

                setIsModalOpen(false);
              });
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="p-5">
              <div className="  grid grid-cols-2 gap-4 content-center items-center">
                <InputText
                  label="????"
                  // className="w-full"
                  readOnly={itemValue ? true : false}
                  name="code"
                  handleChange={formik.handleChange}
                  values={formik.values.code}
                  important
                  type={"text"}
                  error={formik.touched.code && formik.errors.code}
                />

                <InputText
                  label="??????????"
                  // className="w-full"
                  name="name"
                  handleChange={formik.handleChange}
                  values={formik.values.name}
                  important
                  type={"text"}
                  error={formik.touched.name && formik.errors.name}
                />

                <InputSelect
                  label="???????? ???????? ??????????"
                  important
                  name="productGroup"
                  handleChange={formik.setFieldValue}
                  values={formik.values.productGroup}
                  error={formik.touched.productGroup && formik.errors.productGroup}
                  options={productOptions}
                />

                <CustomSwitch
                  active={formik.values.isActive}
                  handleChange={(value: any) => formik.setFieldValue("isActive", value)}
                />

                <div className="!col-span-2 ">
                  <MultiLineText
                    label=" ??????????????"
                    values={formik.values.description}
                    name="description"
                    handleChange={formik.handleChange}
                    error={formik.touched.description && formik.errors.description}
                  />
                </div>
              </div>

              <div className="flex-end-center mt-5 gap-3">
                <SimpleButton handelClick={() => setIsModalOpen(false)} text="??????" className="full-lightTomato-btn" />
                <SimpleButton
                  loading={Loading}
                  type="submit"
                  text={itemValue ? "????????????" : "????????????"}
                  className="full-tomato-btn"
                />
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ActionForms;
