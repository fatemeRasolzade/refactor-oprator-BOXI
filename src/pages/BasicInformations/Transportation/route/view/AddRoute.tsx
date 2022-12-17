import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import * as Yup from "yup";
import { EditDataParams, PostDataParams } from "../../../../../services/Service_call";
import { apiRoute } from "../../../../../services/apiRoute";
import { SuccessAlert } from "../../../../../global/alert/Alert";
import { vendorData } from "../../../../../redux/Transportation/vendor/VendorData";
import AddButton from "../../../../../global/addButton/AddButton";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import {
  useGetFuelTypeOptions,
  useGetHubOptions,
  useGetOptions,
  useGetVendorOptions,
} from "../../../../../global/hooks/useFetchOptions";
import { vehicleModel } from "../../../../../redux/Transportation/vehicleModel/VehicleModel";

import AddExcel from "../../../../../components/exel/AddExcel";
import { vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";
interface PropsData {
  currentData?: any;
}
const validation = Yup.object().shape({
  code: Yup.number().required().label("کد مسیر"),
  name: Yup.string().required().label("نام مسیر"),
  nodes: Yup.number().required().label("گره"),
  selectSourceHub: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
  selectTargetHub: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});

const AddRouteForms: React.FC<PropsData> = ({ currentData }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);

  //   const { fuelOptions } = useGetFuelTypeOptions(apiRoute().get.selectfuelTypes, isModalOpen);
  const { hubOptions } = useGetHubOptions(apiRoute().get.select_hub, isModalOpen);

  const dispatch = useDispatch();

  const handleAction = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadFileAction = () => {
    setUploadExcel(!uploadExcel);
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن شرکت نقلیه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      code: "",
      name: "",
      selectSourceHub: {
        id: "",
        text: "",
      },
      selectTargetHub: {
        id: "",
        text: "",
      },
      isActive: true,
      nodes: "",
      connections: [],
    },
    onSubmit: (values) => {
      let hubData:any
      for (let i = 0; i < parseInt(formik.values.nodes) ; i++) {
        hubData = [
          ...hubData,
          {
            selectHub: {
              id: "",
              text: "",
            },
            distanceFromPreviousHub: "",
            distanceVariance: "",
            transitTime: "",
            timeStoppage: "",
          },
        ];
      }
      const source = {
        selectHub: values.selectSourceHub,
        distanceFromPreviousHub: "0",
        distanceVariance: "0",
        transitTime: "00:00",
        timeStoppage: "00:00",
      };
      const target = {
        selectHub: values.selectTargetHub,
        distanceFromPreviousHub: "",
        distanceVariance: "",
        transitTime: "00:00",
        timeStoppage: "00:00",
      };
      hubData.unshift(source);
      formik.setFieldValue("connections", [...hubData, target]);
    //   setOpenConnections(!openConnection);
    //   setOpen(false);
    },
  });
  useEffect(() => {
    formik.resetForm({});
  }, [isModalOpen]);

  return (
    <>
      <AddButton ToggleOptions={ToggleOptions} />
      <AddExcel excelInfo={vehicleModelExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} />
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={"افزودن مسیر"}>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 mt-8 gap-y-4 gap-x-2 content-center">
            <div>
              <InputText
                label="کد مسیر"
                name="code"
                handleChange={formik.handleChange}
                values={formik.values.code}
                important
                error={formik.touched.code && formik.errors.code}
              />
            </div>
            <div>
              <InputText
                label="نام مسیر"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important
                error={formik.touched.name && formik.errors.name}
              />
            </div>

            <div>
              <InputSelect
                label="مبدا"
                important
                name="selectSourceHub"
                handleChange={formik.setFieldValue}
                values={formik.values.selectSourceHub}
                error={formik.touched.selectSourceHub && formik.errors.selectSourceHub}
                options={[{id:"1",text:"هاب اول"},{id:"2",text:"هاب دوم"}]}
              />
            </div>

            <div>
              <InputSelect
                label="مقصد"
                important
                name="selectTargetHub"
                handleChange={formik.setFieldValue}
                values={formik.values.selectTargetHub}
                error={formik.touched.selectTargetHub && formik.errors.selectTargetHub}
                options={[{id:"1",text:"هاب اول"},{id:"2",text:"هاب دوم"}]}
              />
            </div>

            <div>
              <InputText
                label="تعداد گره"
                name="nodes"
                handleChange={formik.handleChange}
                values={formik.values.nodes}
                important
                error={formik.touched.nodes && formik.errors.nodes}
              />
            </div>
            <SimpleButton type="submit" text="ایجاد اتصال" className="bg-red-500" />
          </div>
          {/* <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={() => setIsModalOpen(false)} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton
              loading={Loading}
              type="submit"
              text={"افزودن"}
              className="full-tomato-btn"
            />
          </div> */}
        </form>
        {/*</Dialog>*/}
      </Modal>
    </>
  );
};

export default AddRouteForms;
