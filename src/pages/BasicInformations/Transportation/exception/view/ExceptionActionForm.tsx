import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import * as Yup from "yup";
import { EditDataParams, PostDataParams } from "../../../../../services/Service_call";
import { apiRoute } from "../../../../../services/apiRoute";
import { SuccessAlert } from "../../../../../global/alert/Alert";
import AddButton from "../../../../../global/addButton/AddButton";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import AddExcel from "../../../../../components/exel/AddExcel";
import { vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";
import { useFetchOptionsOnModal } from "../../../../../global/hooks/useFetchOptions";
import { filterDock } from "../../../../../redux/Transportation/dock/DockData";
import { filterException } from "../../../../../redux/Transportation/exception/ExceptionData";
import CustomSwitch from "../../../../../global/Switch/Switch";
import MultiLineText from "../../../../../global/MultiLineText/MultiLineText";

interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  code: Yup.string().required(),
  type: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
  name: Yup.string().required(),
  description: Yup.string(),
});

const ExceptionActionForm: React.FC<PropsData> = ({ currentData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { dataOptions: exceptionType } = useFetchOptionsOnModal(apiRoute().get.selectException, isModalOpen);
  const dispatch = useDispatch();

  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن استثناء" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData.id,
          isActive: currentData.isActive,
          description: currentData.description,
          name: currentData.name,
          code: currentData.code,
          type: { id: currentData?.type?.value, text: currentData?.type?.type },
        }
      : {
          isActive: true,
          description: "",
          name: "",
          code: "",
          type: {},
        },
    onSubmit: (values) => {
      console.log(values);
      const type = values?.type?.id ? values?.type?.id : {};
      const finalData = { ...values, type };
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.exception, finalData).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              filterException({
                // pageSize: 10,
                // pageNumber: "",
              }) as any
            );
          } else {
            setLoading(false);
          }
          setIsModalOpen(false);
        });
      } else {
        setLoading(true);
        EditDataParams(apiRoute().edit.exception, finalData).then((res) => {
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              filterException({
                // pageSize: 10,
                // pageNumber: "",
              }) as any
            );
          } else {
            setLoading(false);
            console.log("run error");
          }
          setIsModalOpen(false);
        });
      }
    },
  });
  useEffect(() => {
    formik.resetForm({});
  }, [isModalOpen]);
  const setUpdate=()=>{
    dispatch(
      filterException({
        isActive: "",
        pageSize: 10,
        pageNumber: "",
      }) as any
    );
  }

  return (
    <>
      {!currentData ? (
        <AddButton ToggleOptions={ToggleOptions} />
      ) : (
        <button className=" border-none	 text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel excelInfo={vehicleModelExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} setUpdate={setUpdate}/>
      <Modal
        visible={isModalOpen}
        setVisible={setIsModalOpen}
        title={currentData ? "ویرایش استثناء" : "افزودن استثناء"}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 mt-8 gap-y-4 gap-x-4 content-center">
            <InputText
              readOnly={currentData && true}
              label="کد "
              name="code"
              handleChange={formik.handleChange}
              values={formik.values.code}
              important
              error={formik.touched.code && formik.errors.code}
            />
            <InputText
              label="عنوان "
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              error={formik.touched.name && formik.errors.name}
            />
            <InputSelect
              label="نوع"
              important
              name="type"
              handleChange={formik.setFieldValue}
              values={formik.values.type}
              error={formik.touched.type && formik.errors.type}
              options={exceptionType.options}
            />
            <CustomSwitch
              active={formik.values.isActive}
              handleChange={(value: any) => formik.setFieldValue("isActive", value)}
            />
          </div>
          <div className="inputRow mt-5">
            <MultiLineText
              label=" توضیحات"
              values={formik.values.description}
              name="description"
              handleChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
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
      </Modal>
    </>
  );
};

export default ExceptionActionForm;
