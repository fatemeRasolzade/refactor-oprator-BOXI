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
import { GateExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";


import { useFetchOptionsOnModal } from "../../../../../global/hooks/useFetchOptions";
import { filterGate } from "../../../../../redux/Transportation/gate/GateData";
interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  selectHub: Yup.object().shape({
    text: Yup.string().required().label("کد هاب"),
    id: Yup.string().required(),
  }),
  name: Yup.string().required().label("نام درب"),
  code: Yup.number().required().label("کد درب"),
});

const GateActionForms: React.FC<PropsData> = ({ currentData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { dataOptions: hubOptions } = useFetchOptionsOnModal(apiRoute().get.select_hub, isModalOpen);
  const dispatch = useDispatch();

  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن درب" },
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
          selectHub: {
            id: currentData?.selectHub?.id,
            text: currentData?.selectHub?.text,
          },
        }
      : {
          code: "",
          name: "",
          selectHub: {
            id: "",
            text: "",
          },
        },
    onSubmit: (values) => {
      console.log(values);

      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.gate, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              filterGate({
                search: "",
                isActive: "",
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
            setLoading(false);
          }

          // dispatch(updating(false));

          setIsModalOpen(false);
        });
      } else {
        setLoading(true);
        EditDataParams(apiRoute().edit.gate, values).then((res) => {
          // dispatch(updating(true));
          console.log("run edit");
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              filterGate({
                search: "",
                isActive: true,
                pageSize: 10,
                pageNumber: "",
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
      filterGate({
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
      <AddExcel excelInfo={GateExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} setUpdate={setUpdate}/>
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={currentData ? "ویرایش درب" : "افزودن درب"}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 mt-8 gap-y-4 gap-x-4 content-center">
            <InputText
              label="نام درب"
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              error={formik.touched.name && formik.errors.name}
            />
            <InputText
              label="کد درب"
              name="code"
              handleChange={formik.handleChange}
              values={formik.values.code}
              important
              error={formik.touched.code && formik.errors.code}
            />

            <InputSelect
              label=" کد هاب"
              important
              name="selectHub"
              handleChange={formik.setFieldValue}
              values={formik.values.selectHub}
              error={formik.touched.selectHub && formik.errors.selectHub}
              options={hubOptions.options}
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

export default GateActionForms;
