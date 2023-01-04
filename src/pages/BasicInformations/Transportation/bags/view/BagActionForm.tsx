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
import { BagExcel, vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";

import { filterBags } from "../../../../../redux/Transportation/bags/Bags";
interface PropsData {
  currentData?: any;
  vendorOptions: any;
  bagOptions: any;
  hubOptions: any;
}
const validation = Yup.object().shape({
  bagNumber: Yup.number().required(),
  selectBagType: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
  selectSourceHub: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
  selectDestinationHub: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});

const BagActionForms: React.FC<PropsData> = ({ currentData, vendorOptions, bagOptions, hubOptions }): JSX.Element => {
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
    { handleClick: handleAction, name: "افزودن کیسه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData.id,
          bagNumber: currentData.bagNumber,
          selectBagType: {
            id: currentData.selectBagType.id,
            text: currentData.selectBagType.text,
          },
          selectSourceHub: {
            id: currentData.selectSourceHub.id,
            text: currentData.selectSourceHub.text,
          },
          selectDestinationHub: {
            id: currentData.selectDestinationHub.id,
            text: currentData.selectDestinationHub.text,
          },
          selectConsignmentsDestinationHub: {
            id: currentData.selectConsignmentsDestinationHub?.id,
            text: currentData.selectConsignmentsDestinationHub?.text,
          },
          selectCarrier: {
            id: currentData.selectCarrier?.id,
            text: currentData.selectCarrier?.text,
          },
        }
      : {
          bagNumber: "",
          selectBagType: {
            id: "",
            text: "",
          },
          selectSourceHub: {
            id: "",
            text: "",
          },
          selectDestinationHub: {
            id: "",
            text: "",
          },
          selectConsignmentsDestinationHub: {
            id: "",
            text: "",
          },

          selectCarrier: {
            id: "",
            text: "",
          },
        },
    onSubmit: (values) => {
      console.log(values);

      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.bags, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              filterBags({
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
        }).catch(() => {
          setLoading(false);
        });
      } else {
        setLoading(true);
        EditDataParams(apiRoute().edit.bags, values).then((res) => {
          // dispatch(updating(true));

          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              filterBags({
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
        }).catch(() => {
          setLoading(false);
        });
      }
    },
  });
  useEffect(() => {
    formik.resetForm({});
  }, [isModalOpen]);
  const setUpdate=()=>{
    dispatch(
      filterBags({
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
      <AddExcel excelInfo={BagExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} setUpdate={setUpdate}/>
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={currentData ? "ویرایش کیسه" : "افزودن کیسه"}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 mt-8 gap-y-4 gap-x-4 content-center">
            <InputText
              label="شماره کیسه"
              name="bagNumber"
              readOnly={currentData && true}
              handleChange={formik.handleChange}
              values={formik.values.bagNumber}
              important
              error={formik.touched.bagNumber && formik.errors.bagNumber}
            />
            <InputSelect
              label="نوع کیسه"
              important
              name="selectBagType"
              handleChange={formik.setFieldValue}
              values={formik.values.selectBagType}
              error={formik.touched.selectBagType && formik.errors.selectBagType}
              options={bagOptions.options}
            />
            <InputSelect
              label="هاب مبدا"
              important
              name="selectSourceHub"
              handleChange={formik.setFieldValue}
              values={formik.values.selectSourceHub}
              error={formik.touched.selectSourceHub && formik.errors.selectSourceHub}
              options={hubOptions.options}
            />
            <InputSelect
              label="هاب مقصد"
              important
              name="selectDestinationHub"
              handleChange={formik.setFieldValue}
              values={formik.values.selectDestinationHub}
              error={formik.touched.selectDestinationHub && formik.errors.selectDestinationHub}
              options={hubOptions.options}
            />
            <InputSelect
              label=" وسیله نقلیه"
              name="selectCarrier"
              handleChange={formik.setFieldValue}
              values={formik.values.selectCarrier}
              error={formik.touched.selectCarrier && formik.errors.selectCarrier}
              options={vendorOptions.options}
            />
            <InputSelect
              label="هاب مقصد مرسوله"
              name="selectConsignmentsDestinationHub"
              handleChange={formik.setFieldValue}
              values={formik.values.selectConsignmentsDestinationHub}
              error={formik.touched.selectConsignmentsDestinationHub && formik.errors.selectConsignmentsDestinationHub}
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

export default BagActionForms;
