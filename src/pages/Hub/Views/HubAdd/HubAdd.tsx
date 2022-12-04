import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import Checkbox from "../../../../components/checkbox/Checkbox";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import InputText from "../../../../global/Input/Input";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { addHubschema } from "../../../../global/Validation/Validation";
import {
  getDataFromServer,
  PostDataParams,
} from "../../../../services/Service_call";
import { apiRoute } from "../../../../services/apiRoute";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
const HubAdd = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function getDataSelect() {
      try {
        getDataFromServer(apiRoute().get.get_hub_type).then((res) => {
          if (res.status === "OK") settypeHub(res.payload);
        });
        getDataFromServer(apiRoute().get.select_hub_category).then((res) => {
          if (res.status === "OK") setCatHub(res.payload.content);
        });
        getDataFromServer(apiRoute().get.get_province_city).then((res) => {
          if (res.status === "OK") setCities(res.payload.content);
        });
        getDataFromServer(apiRoute().get.get_province_loc).then((res) => {
          if (res.status === "OK") setProvinceLoc(res.payload.content);
        });
        getDataFromServer(apiRoute().get.get_select_province).then((res) => {
          if (res.status === "OK") setSelectProvince(res.payload.content);
        });
        getDataFromServer(apiRoute().get.select_hub).then((res) => {
          if (res.status === "OK") setselectHub(res.payload.content);
        });
      } catch (error) {
        ErrorAlert("دریافت دیتا با خطلا مواجه شد");
      }
    }
    getDataSelect();
  }, []);

  const [typeHub, settypeHub] = useState([]);
  const [catHub, setCatHub] = useState([]);
  const [citys, setCities] = useState([]);
  const [provinceLoc, setProvinceLoc] = useState([]);
  const [selectProvince, setSelectProvince] = useState([]);
  const [selectHub, setselectHub] = useState([]);
  return (
    <>
      <Formik
        initialValues={{
          code: "",
          name: "",
          selectHubType: {
            id: "",
            text: "",
          },
          selectHubCategory: {
            id: "",
            text: "",
          },
          selectParentHub: {
            id: "",
            text: "",
          },
          pinCode: "",
          locationStartDate: {
            day: 0,
            month: 0,
            year: 0,
          },
          mandatoryArrivalScan: false,
          isActive: false,
          dropOffAllowed: false,
          selectState: {
            id: "",
            text: "",
          },
          selectCity: {
            id: "",
            text: "",
          },
          selectRegion: {
            id: "",
            text: "",
          },
          plateNumber: "",
          addressLine1: "",
          addressLine2: "",
          locLate: "",
          locLong: "",

          // fullName:"",
          // phone:"",
          // email:""
        }}
        validationSchema={addHubschema}
        onSubmit={(values) => {
          PostDataParams(apiRoute().post.hub, values).then((res) => {
            if (res.status === "OK") {
              SuccessAlert("با موفقیت ساخته شد");
            } else {
              ErrorAlert("خطا در برقراری اطلاعات");
            }
          });
          console.log(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="w-11/12 grid grid-cols-5 gap-2">
              <div>
                <InputText
                  title="کدهاب"
                  name="code"
                  handelChange={formik.handleChange}
                  values={formik.values.code}
                  important
                  type={"text"}
                />
                <ErrorMessage
                  name="codeHub"
                  render={(messege) => (
                    <span className="text-tomato">{messege}</span>
                  )}
                />
              </div>
              <div>
                <InputText
                  title="نام هاب"
                  name="name"
                  handelChange={formik.handleChange}
                  values={formik.values.name}
                  important
                  type={"text"}
                />
                <ErrorMessage
                  name="nameHub"
                  render={(messege) => (
                    <span className="text-tomato">{messege}</span>
                  )}
                />
              </div>
              <div>
                {" "}
                <InputSelect
                  text="نوع هاب"
                  name="selectHubType"
                  handelChange={formik.setFieldValue}
                  values={formik.values.selectHubType}
                  options={typeHub}
                />
                <ErrorMessage
                  name="typeHub"
                  render={(messege) => (
                    <span className="text-tomato  block mt-5">{messege}</span>
                  )}
                />
              </div>
              <div>
                <InputSelect
                  text="گونه هاب"
                  name="selectHubCategory"
                  handelChange={formik.setFieldValue}
                  values={formik.values.selectHubCategory}
                  options={catHub}
                />
              </div>
              <div>
                <InputSelect
                  text="هاب والد"
                  name="selectParentHub"
                  handelChange={formik.setFieldValue}
                  values={formik.values.selectParentHub}
                  options={selectHub}
                />
              </div>
              <div>
                <InputText
                  title="پین کد"
                  name="pinCode"
                  handelChange={formik.handleChange}
                  values={formik.values.pinCode}
                  type={"text"}
                />
              </div>
              <div>
                <DatePickers
                  title="تاریخ شروع فعالیت"
                  name="locationStartDate"
                  handelChange={formik.setFieldValue}
                  values={formik.values.locationStartDate}
                />
              </div>
              <div>
                <Checkbox
                  title="اسکن مرسوله در ورودی هاب اجباری می باشد"
                  name="mandatoryArrivalScan"
                  handelChange={formik.handleChange}
                  values={formik.values.mandatoryArrivalScan}
                />
              </div>
              <div>
                <Checkbox
                  title="فعال"
                  name="isActive"
                  handelChange={formik.handleChange}
                  values={formik.values.isActive}
                />
              </div>
              <div>
                <Checkbox
                  title="امکان تحویل مرسوله دارد"
                  name="dropOffAllowed"
                  handelChange={formik.handleChange}
                  values={formik.values.dropOffAllowed}
                />
              </div>
              <div>
                <InputSelect
                  text="استان"
                  name="selectState"
                  handelChange={formik.setFieldValue}
                  values={formik.values.selectState}
                  options={selectProvince}
                />
              </div>
              <div>
                <InputSelect
                  text="شهر"
                  name="selectCity"
                  handelChange={formik.setFieldValue}
                  values={formik.values.selectCity}
                  options={citys}
                />
              </div>
              <div>
                <InputSelect
                  text="منطقه"
                  name="selectRegion"
                  handelChange={formik.setFieldValue}
                  values={formik.values.selectRegion}
                  options={provinceLoc}
                />
              </div>
              <div>
                <InputText
                  title="پلاک"
                  name="plateNumber"
                  handelChange={formik.handleChange}
                  values={formik.values.plateNumber}
                  type={"number"}
                />
              </div>
              <div>
                <InputText
                  title="آدرس 1"
                  name="addressLine1"
                  handelChange={formik.handleChange}
                  values={formik.values.addressLine1}
                  type={"text"}
                />
              </div>
              <div className="!col-span-2 ">
                <InputText
                  title="آدرس 2"
                  name="addressLine2"
                  handelChange={formik.handleChange}
                  values={formik.values.addressLine2}
                  type={"text"}
                />
              </div>
              <div>نقشه</div>

              {/* <div className='grid col-span-5 mt-10 gap-2'>
       <div className='grid grid-cols-5 gap-3 Max-md:grid-cols-1 Max-sm:grid-cols-1 Max-xs:grid-cols-1 Max-lg:grid-cols-2'>
       <div ><InputText title='نام و نام خانوادگی' name="fullName" handelChange={formik.handleChange} values={formik.values.fullName} type={"text"}/>
      
       </div>
       <div ><InputText title='تلفن' name='phone' handelChange={formik.handleChange} values={formik.values.phone} type={"number"}/>
      
       </div>
       <div ><InputText title='پست الکترونیک' name='email' handelChange={formik.handleChange} values={formik.values.email} type={"email"}/>
      
       </div>
      </div>
     </div> */}

              <div className="col-span-5 flex flex-row justify-end items-center">
                <Button
                  className="border-none bg-secondaryColor text-dark"
                  onClick={() => navigate(-1)}
                >
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

export default HubAdd;
