import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";

import * as Yup from "yup";
import { EditDataParams, postDataHeaderToServer, PostDataParams } from "../../../services/Service_call";
import { apiRoute } from "../../../services/apiRoute";
import { SuccessAlert } from "../../../global/alert/Alert";
import { filterSalesChannel } from "../../../redux/SaleChannel/SalesChannelReducer";
import Modal from "../../../global/Modal/Modal";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../global/Switch/Switch";
import InputText from "../../../global/InputText/InputText";
import AddExcel from "../../../components/exel/AddExcel";
import AddButton from "../../../global/addButton/AddButton";
import MultiLineText from "../../../global/MultiLineText/MultiLineText";
import { BiPlus } from "react-icons/bi";

interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  name: Yup.string().required().label("نام شرکت"),
  code: Yup.string().required().label("کد شرکت"),

});

const SaleChannelActionForm: React.FC<PropsData> = ({ currentData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          code: currentData?.code,
          name: currentData?.name,
          description: currentData.description,
          isActive: currentData?.isActive,
        }
      : {
          isActive: true,
          code: "",
          name: "",
          description: "",
        },

    onSubmit: (values) => {
      console.log(values);
      if (!currentData) {
        postDataHeaderToServer(apiRoute().post.salesChannel, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");

            dispatch(
              filterSalesChannel({
                search: "",
                isActive: "",
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
            console.log("run error");

          }

          // dispatch(updating(false));

          setIsModalOpen(false);
        });
      } else {
        EditDataParams(apiRoute().edit.salesChannel, values).then((res) => {
          // dispatch(updating(true));
    
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              filterSalesChannel({
                search: "",
                isActive: true,
                pageSize: 10,
                pageNumber: "",
              }) as any
            );
          } else {
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
        <SimpleButton
          type="button"
          text="افزودن"
          handelClick={() => setIsModalOpen(!isModalOpen)}
          className="full-tomato-btn"
          icon={<BiPlus color="white" />}
        />
      ) : (
        <button className=" border-none	 text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      {/* <AddExcel excelInfo={VendorExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} /> */}

      <Modal
        visible={isModalOpen}
        setVisible={setIsModalOpen}
        title={currentData ? "ویرایش کانال فروش" : "افزودن کانال فروش"}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="  grid grid-cols-4 mt-8 gap-4 content-center items-center">
            <InputText
              label="کد "
              // className="w-full"
              readOnly={currentData ? true : false}
              name="code"
              handleChange={formik.handleChange}
              values={formik.values.code}
              important
              type={"text"}
              error={formik.touched.code && formik.errors.code}
            />
            <InputText
              label="عنوان"
              wrapperClassName="col-span-2"
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              type={"text"}
              error={formik.touched.name && formik.errors.name}
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
      {/* </Dialog> */}
    </>
  );
};

export default SaleChannelActionForm;
