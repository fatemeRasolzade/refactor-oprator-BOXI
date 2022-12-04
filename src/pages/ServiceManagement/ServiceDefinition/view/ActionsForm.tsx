import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";

import { Formik, ErrorMessage } from "formik";

import InputText from "../../../../global/InputText/InputText";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { apiRoute } from "../../../../services/apiRoute";
import { getDataFromServer, selectDataFromServer } from "../../../../services/Service_call";
import { ErrorAlert } from "../../../../global/alert/Alert";

const ActionForms = () => {
  const [productOptions, setProductOptions] = useState([]);
  const [productTypeOptions, setProductTypeOptions] = useState([]);

    useEffect(()=>{

      function getDataSelect() {
        try {
          selectDataFromServer(apiRoute().get.GET_PRODUCT).then((res:any)=>{if(res.status==="OK") setProductOptions(res.payload.content)})
          // getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
        } catch (error) {
          ErrorAlert('دریافت دیتا با خطلا مواجه شد')
        }

      }
      getDataSelect()
    },[])

  return (
    <>
      <Formik
        initialValues={{
          code: "",
          type: "",
          name: "",
          description: "",
          minimumOrderQuantity: "",
          validDateFrom: "",
          validDateTo: "",
          priceList: "",
          product: "",
          isActive: true,
        }}
        //  validationSchema={addHubschema}
        onSubmit={(values) => console.log(values)
            
        
        
        }
      >
       
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full grid grid-cols-5 gap-2">
              <div>
                {" "}
                <InputSelect
                  text="محصول"
                  name="product"
                  handleChange={formik.setFieldValue}
                  values={formik.values.product}
                  options={productOptions}
                />
                <ErrorMessage
                  name="product"
                  render={(messege) => <span className="text-tomato  block mt-5">{messege}</span>}
                />
              </div>
              <div>
                {" "}
                <InputSelect
                  text="نوع"
                  name="type"
                  handleChange={formik.setFieldValue}
                  values={formik.values.type}
                  options={productOptions}
                />
                <ErrorMessage
                  name="type"
                  render={(messege) => <span className="text-tomato  block mt-5">{messege}</span>}
                />
              </div>
              <div>
                <InputText
                  label="عنوان"
                  name="type"
                  handleChange={formik.handleChange}
                  values={formik.values.name}
                  important
                  type={"text"}
                />
                <ErrorMessage name="nameHub" render={(messege) => <span className="text-tomato">{messege}</span>} />
              </div>

              <div>
                <InputText
                  label="کد"
                  name="code"
                  handleChange={formik.handleChange}
                  values={formik.values.code}
                  important
                  type={"text"}
                />
                <ErrorMessage name="nameHub" render={(messege) => <span className="text-tomato">{messege}</span>} />
              </div>
          
           
              <div className="col-span-5 flex flex-row justify-end items-center">
                <Button className="border-none bg-secondaryColor text-dark" >
                  بازگشت
                </Button>
                <Button className="border-none bg-tomato mr-3" type="submit">
                  افزودن
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ActionForms;
