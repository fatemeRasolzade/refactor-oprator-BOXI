import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

import { Formik, ErrorMessage } from "formik";

import InputText from "../../../../global/Input/Input";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { apiRoute } from "../../../../services/apiRoute";
import { EditDataParams, getDataFromServer, PostDataParams, selectDataFromServer } from "../../../../services/Service_call";
import { ErrorAlert } from "../../../../global/alert/Alert";
import CustomSwitch from "../../../../global/Switch/Switch";
import { useDispatch } from "react-redux";
import { productData, updating } from "../../../../redux/ProductDefineData/ProductDefineData";
import { productDefineschema } from "./productDefineschema";
import { AiOutlineEdit } from "react-icons/ai";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { BiPlus } from "react-icons/bi";

const ProductDefineActionForm = ({  itemValue }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingNode, setLoadingNode] = useState(false)

  const [productOptions, setProductOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const dispatch = useDispatch();
  console.log("itemValue", itemValue);
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

  return (
    <>

      {itemValue ? (
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
        enableReinitialize={ true}
        validationSchema={productDefineschema}
        onSubmit={(values) => {
          console.log(values);
          if (!itemValue) {
            // dispatch(updating(true));
            PostDataParams(apiRoute().post.createProduct, values).then((res) => {
              dispatch(
                productData({
                  code: "",
                  name: "",
                  isActive: true,
                }) as any
              );
              // dispatch(updating(false));

              setIsModalOpen(false);
            });
          } else {
            EditDataParams(apiRoute().edit.productDefine, values).then((res) => {
              // dispatch(updating(true));
              setIsModalOpen(false);
            });
           
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full grid grid-cols-2 gap-2">
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
              <InputSelect
                text="گروه بندی محصول"
                
                name="productGroup"
                handelChange={formik.setFieldValue}
                values={formik.values.productGroup}
                // values={{
                //   value: formik.values?.productGroup?.id,
                //   label: 'formik.values?.productGroup?.text',
                // }}
                options={productOptions}
              />
              <ErrorMessage
                name="productGroup"
                render={(messege) => <span className="text-tomato  block mt-5">{messege}</span>}
              />
            </div>

            <div className="mt-4">
              <InputText
                title="توضیحات"
                name="description"
                handelChange={formik.handleChange}
                values={formik.values.description}
          
                type={"textarea"}
              />
              <ErrorMessage name="description" render={(messege) => <span className="text-tomato">{messege}</span>} />
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
    </>
  );
};

export default ProductDefineActionForm;
