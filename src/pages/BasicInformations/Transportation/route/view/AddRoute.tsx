import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { apiRoute } from "../../../../../services/apiRoute";
import AddButton from "../../../../../global/addButton/AddButton";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import { useFetchOptions } from "../../../../../global/hooks/useFetchOptions";
import AddExcel from "../../../../../components/exel/AddExcel";
import { vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";
import RouteActionForms from "./RouteActionForm";
import { v4 as uuidv4 } from "uuid";
interface PropsData {
  currentData?: any;
  hubOptions: any;
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

const AddRouteForms: React.FC<PropsData> = ({ currentData, hubOptions }): JSX.Element => {
  console.log(hubOptions)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [openConnection, setOpenConnections] = useState(false);
  const [targethubOptions, setTargetHubOptions] = useState(hubOptions);
  const [desthubOptions, setdesttHubOptions] = useState(hubOptions);
  //   const { fuelOptions } = useGetFuelTypeOptions(apiRoute().get.selectfuelTypes, isModalOpen);

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
  // useEffect(()=>{
  //   setOpenConnections(hubOptions)
  //   setdesttHubOptions(hubOptions)
  // },[])
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
      let hubData: any = [];
      for (let i = 0; i < parseInt(formik.values.nodes); i++) {
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
            customId: uuidv4(),
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
      setIsModalOpen(!isModalOpen);
      setOpenConnections(!openConnection);
    },
  });
  useEffect(() => {
    setTargetHubOptions(hubOptions);
    setdesttHubOptions(hubOptions);
    // formik.resetForm({});
  }, [isModalOpen]);
  const filterData = (item: any, route: any) => {
    console.log(item,"item")
    if (route === "source") {
      const filter = hubOptions.options.filter((hub: any) => hub.value !== item.value);
      console.log(filter,"filter","source")
      setTargetHubOptions(filter);
    } else if (route === "target") {

      const filter = hubOptions.options.filter((hub: any) => hub.value !== item.value);
      console.log(filter,"filter","target")
      setdesttHubOptions(filter);
    }
  };

  return (
    <>
      {openConnection && (
        <RouteActionForms routeValue={formik.values} isModalOpen={openConnection} setIsModalOpen={setOpenConnections} />
      )}
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
                options={desthubOptions.options}
                
                handleChange={(value: any) => {
                  console.log(value,"value")
                  filterData(value, "source");
                  formik.setFieldValue("selectSourceHub", { id: value.value, text: value.label });
                }}
                // handleChange={formik.setFieldValue}
                values={formik.values.selectSourceHub}
                error={formik.touched.selectSourceHub && formik.errors.selectSourceHub}
                // options={hubOptions.options}
              />
            </div>

            <div>
              <InputSelect
                label="مقصد"
                important
                name="selectTargetHub"
                handleChange={(value: any) => {
                  
                  filterData(value, "target");
                  formik.setFieldValue("selectTargetHub", { id: value.value, text: value.label });
                }}
                values={formik.values.selectTargetHub}
                error={formik.touched.selectTargetHub && formik.errors.selectTargetHub}
                options={targethubOptions.options}
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
