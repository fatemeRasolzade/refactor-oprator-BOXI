import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import * as Yup from "yup";
import { apiRoute } from "../../../../services/apiRoute";
import { EditDataParams, PostDataParams } from "../../../../services/Service_call";
import { SuccessAlert } from "../../../../global/alert/Alert";
import { ServiceData } from "../../../../redux/ServiceDefine/ServiceDefineReducer";
import AddButton from "../../../../global/addButton/AddButton";
import Modal from "../../../../global/Modal/Modal";
import InputText from "../../../../global/InputText/InputText";
import CustomSwitch from "../../../../global/Switch/Switch";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import MultiLineText from "../../../../global/MultiLineText/MultiLineText";
import { DateCompare } from "../../../../tools/validations/ErrorHelper";
import AddExcel from "../../../../components/exel/AddExcel";
import { ServiceDefineExcel, vehicleModelExcel } from "../../../../tools/services/ExcelInfoFile";

interface PropsData {
  currentData?: any;
  priceOptions?: any;
  productOptions?: any;
}
const validation = Yup.object().shape({
  name: Yup.string().required('اجباری است'),
  code: Yup.string().required('اجباری است'),

  minimumOrderQuantity: Yup.number(),
  // validDateFrom: Yup.string().required(),
  // validDateTo: Yup.string().required(),
  type: Yup.object().shape({
    text: Yup.string().required('اجباری است'),
    id: Yup.string().required('اجباری است'),
  }),
  product: Yup.object().shape({
    text: Yup.string().required('اجباری است'),
    id: Yup.string().required('اجباری است'),
  }),
  priceList: Yup.object().shape({
    text: Yup.string().required('اجباری است'),
    id: Yup.string().required('اجباری است'),
  }),
});

const ServiceDefineActionForms: React.FC<PropsData> = ({ currentData, priceOptions, productOptions }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن سرویس" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          code: currentData?.code,
          name: currentData?.name,
          description: currentData?.description,
          minimumOrderQuantity: currentData?.minimumOrderQuantity,
          isActive: currentData.isActive,
          priceList: {
            id: currentData.priceList.id,
            text: currentData.priceList.text,
          },
          product: {
            id: currentData.product.id,
            text: currentData.product.text,
          },
          type: {
            id: currentData.type.id,
            text: currentData.type.text,
          },
          validDateFrom: {
            year: currentData?.validDateFrom.year,
            month: currentData?.validDateFrom.month,
            day: currentData?.validDateFrom.day,
          },
          validDateTo: {
            year: currentData?.validDateTo.year,
            month: currentData?.validDateTo.month,
            day: currentData?.validDateTo.day,
          },
        }
      : {
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
        },
    validate: (values) => {
      const errors = {};
      const [isValid, errDate] = DateCompare(values.validDateFrom, values.validDateTo);
      if (!isValid) {
        // @ts-ignore
        errors.validDateFrom = errDate;
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.serviceDefine, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              ServiceData({
                search: "",
                isActive: "",
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
            console.log("run error");
            setLoading(false);
            // ErrorAlert("خطا در برقراری اطلاعات");
          }

          // dispatch(updating(false));

          setIsModalOpen(false);
        });
      } else {
        setLoading(true);
        EditDataParams(apiRoute().edit.serviceDefine, values).then((res) => {
          // dispatch(updating(true));
          console.log("run edit");
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              ServiceData({
                search: "",
                isActive: true,
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
            setLoading(false);
            console.log("run error");
            // ErrorAlert("خطا در برقراری اطلاعات");
          }

          setIsModalOpen(false);
      });
      }
    },
  });
  useEffect(() => {
    formik.resetForm({});
  }, [isModalOpen]);

  return (
    <>
      {!currentData ? (
        <AddButton ToggleOptions={ToggleOptions} />
      ) : (
        <button className=" border-none	 text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel excelInfo={ServiceDefineExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} />
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={currentData ? "ویرایش سرویس" : "تعریف سرویس"}>
        <form onSubmit={formik.handleSubmit}>
          <div className="  grid grid-cols-3 mt-8 gap-4 content-center items-center">
            <InputSelect
              label="محصول"
              important
              name="product"
              handleChange={formik.setFieldValue}
              values={formik.values.product}
              error={formik.touched.product && formik.errors.product}
              wrapperClassName="col-span-2"
              options={productOptions?.options}
            />
            <InputSelect
              label="نوع"
              important
              name="type"
              handleChange={formik.setFieldValue}
              values={formik.values.type}
              options={[
                { id: "0", text: "پایه" },
                { id: "1", text: "تکمیلی" },
              ]}
              error={formik.touched.type && formik.errors.type}
            />

            <InputText
              label="عنوان "
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              wrapperClassName="col-span-2"
              error={formik.touched.name && formik.errors.name}
            />
            <InputText
              label="کد "
              // className="w-full"
              readOnly={currentData ? true : false}
              name="code"
              handleChange={formik.handleChange}
              values={formik.values.code}
              important
              error={formik.touched.code && formik.errors.code}
            />
            <InputSelect
              label="نرخ نامه"
              important
              wrapperClassName="col-span-2"
              name="priceList"
              handleChange={formik.setFieldValue}
              values={formik.values.priceList}
              options={priceOptions?.options}
              error={formik.touched.priceList && formik.errors.priceList}
            />
            <InputText
              label="حداقل تعداد سفارش "
              name="minimumOrderQuantity"
              handleChange={formik.handleChange}
              values={formik.values.minimumOrderQuantity}
              error={formik.touched.minimumOrderQuantity && formik.errors.minimumOrderQuantity}
            />
          </div>
          <div className="inputRow mt-10">
            <DatePickers
              important
              title="از تاریخ"
              values={formik.values.validDateFrom}
              name="validDateFrom"
              handleChange={formik.setFieldValue}
              timeName="validDateFrom"
              timeValues={formik.values.validDateFrom}
              error={formik.touched.validDateFrom && formik.errors.validDateFrom}
            />
            <DatePickers
              important
              title="تا تاریخ"
              values={formik.values.validDateTo}
              name="validDateTo"
              handleChange={formik.setFieldValue}
              timeName="validDateTo"
              timeValues={formik.values.validDateTo}
              error={formik.touched.validDateTo && formik.errors.validDateTo}
            />
            <div className="mb-5 w-60 centering">
              <CustomSwitch
                active={formik.values.isActive}
                handleChange={() => formik.setFieldValue("isActive", !formik.values.isActive)}
              />
            </div>
          </div>
          <div className="inputRow mt-5">
            <MultiLineText
              label=" توضیحات"
              values={formik.values.description}
              name="description"
              handleChange={formik.handleChange}
            
            />
          </div>
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={() => setIsModalOpen(false)} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton
              loading={Loading}
              type="submit"
              text={currentData ? "ویرایش" : "افزودن"}
              className="full-tomato-btn"
            />
          </div>
        </form>
        {/*</Dialog>*/}
      </Modal>
    </>
  );
};

export default ServiceDefineActionForms;
