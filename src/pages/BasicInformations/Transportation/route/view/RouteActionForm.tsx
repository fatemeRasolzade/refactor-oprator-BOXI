import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { FormikProvider, FieldArray, useFormik } from "formik";

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

import { vehicleModel } from "../../../../../redux/Transportation/vehicleModel/VehicleModel";

import AddExcel from "../../../../../components/exel/AddExcel";
import { vehicleModelExcel } from "../../../../../tools/services/ExcelInfoFile";
import Modal from "../../../../../global/Modal/Modal";
import { BiTrash } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
interface PropsData {
  currentData?: any;
  routeValue?: any;
  isModalOpen?: boolean;
  setIsModalOpen?: any;
}
const validation = Yup.object().shape({
  code: Yup.number().required().label("کد مسیر"),
  name: Yup.string().required().label("نام مسیر"),
  selectSourceHub: Yup.object().required().label("مبدا"),
  selectTargetHub: Yup.object().required().label("مقصد"),
  nodes: Yup.number().required().label("گره"),
  connections: Yup.array().of(
    Yup.object().shape({
      distanceFromPreviousHub: Yup.number().required(),
      distanceVariance: Yup.number().required(),
      transitTime: Yup.string().required(),
      timeStoppage: Yup.string().required(),
      selectHub: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
    })
  ),
});

const RouteActionForms: React.FC<PropsData> = ({
  currentData,
  routeValue,
  isModalOpen,
  setIsModalOpen,
}): JSX.Element => {
  console.log(routeValue, "routeValue");
  const [checked, setChecked] = useState(true);
  const [disableNode, setDisableNodes] = useState(false);
  const [connectionSelect, setConnectionSelect] = useState<any>([]);
  const [serverIds, setServerIds] = useState<any>([]);
  const [nodeOptins, setNodeOptions] = useState([]);
  const distanceRef = useRef();
  const distanceVarianceRef = useRef();
  const transitTimeRef = useRef();
  const timeStoppageRef = useRef();
  const checkBoxRef = useRef(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          code: currentData?.code,
          name: currentData?.name,
          distance: currentData?.distance,
          distanceVariance: currentData?.distanceVariance,
          transitTime: currentData?.transitTime,
          timeStoppage: currentData?.timeStoppage,
          selectSourceHub: {
            id: currentData.selectSourceHub.id,
            text: currentData.selectSourceHub.text,
          },
          selectTargetHub: {
            id: currentData.selectTargetHub.id,
            text: currentData.selectTargetHub.text,
          },
          isActive: currentData?.isActive,
          nodes: currentData?.nodes,
          connections: currentData.connections,
        }
      : {
          code: routeValue?.code,
          name: routeValue?.name,
          distance: "",
          distanceVariance: "",
          transitTime: "",
          timeStoppage: "",
          selectSourceHub: {
            id: routeValue?.selectSourceHub.id,
            text: routeValue?.selectSourceHub.text,
          },
          selectTargetHub: {
            id: routeValue?.selectTargetHub.id,
            text: routeValue?.selectTargetHub.text,
          },
          isActive: true,
          nodes: routeValue?.nodes,
          connections: routeValue?.connections,
        },
    onSubmit: (values) => {
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.VehicleModel, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");
            setLoading(false);
            dispatch(
              vehicleModel({
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
        EditDataParams(apiRoute().edit.VehicleModel, values).then((res) => {
          // dispatch(updating(true));
          console.log("run edit");
          if (res.status === "OK") {
            setLoading(false);
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              vehicleModel({
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

  const addConnection = (e: any, push: any) => {
    e.preventDefault();
    setDisableNodes(true);
    formik.setFieldValue("nodes", formik.values.connections.length + 1);
    formik.values.connections.splice(formik.values.connections.length - 1, 0, {
      selectHub: {
        id: "",
        text: "",
      },
      distanceFromPreviousHub: "",
      distanceVariance: "",
      transitTime: "",
      timeStoppage: "",
    });
  };
  const deleteConnection = () => {
    console.log("serverIds");

    const filterData = formik.values.connections.filter(
      (item: any, index: any) => !connectionSelect.some((it: any) => it === item.id || it === index)
    );
    const data = {
      deleteNodeIds: serverIds,
      routeId: values.id,
      nodes: filterData.length - 2,
      distance: filterData.reduce((a: any, b: any) => a + Number(b.distanceFromPreviousHub), 0),
      distanceVariance: (
        filterData.reduce((a: any, b: any) => a + Number(b.distanceVariance), 0) / filterData.length
      ).toFixed(1),
      //  transitTime: calctransitTimeTime(filterData:any),
      //  timeStoppage: calctimeStoppageTime(filterData:any),
    };
    // console.log(data);
    let isDeleteFromServer = formik.values.connections.some((item: any) => item.id);

    if (isDeleteFromServer) {
      // deleteConnections({ data })
      // .then((response) => {
      //   response.status && toast.success("گره با موفقیت پاک شد");
      //   setRefresh(!refresh)
      //   formik.setFieldValue("connections", filterData);
      // })
      // .catch((e) => {
      //   // toast.error("خطایی رخ داده است.");
      // });
    } else {
      console.log(filterData);
      formik.setFieldValue("connections", filterData);
    }
    //  uncheck();

    // console.log(distanceRef.current?.value)
  };
  const handleChangeCheckBox = (event: any, item: any, indexItem: any) => {
    const isChecked = event.target.checked;
    const id = item?.id ? item.id : indexItem;
    if (isChecked) {
      item?.id && setServerIds([...serverIds, item?.id]);
      setConnectionSelect([...connectionSelect, id]);
    } else {
      let index = connectionSelect.findIndex((selected: any) => selected?.id === id);
      connectionSelect.splice(index, 1);
      setConnectionSelect(connectionSelect);
      let serverindex = serverIds.findIndex((selected: any) => selected?.id === item.id);
      serverIds.splice(serverindex, 1);
      setServerIds(serverIds);
    }
  };
  const calctransitTimeTime = () => {
    const data = formik.values.connections;
    const transitTime=data.map((item:any)=>item.transitTime)
    console.log("data", data);
    //to save on server we must change format time from : to .
    if (transitTime.length !== 0) {

      var hours:number = 0;
      let minutes:number  = 0;
      var sum = "";
      for(var i in transitTime){
        console.log(transitTime[i],"transitTime[i]")
       hours += parseInt(transitTime[i].split(":")[0])
       minutes += parseInt(transitTime[i].split(":")[1])
    
      }
    
      if(minutes > 59){
         // @ts-ignore
        hours += parseInt(minutes / 60);
         // @ts-ignore
        minutes = parseInt(minutes % 60);
      }
      sum = hours + ":" + minutes ;
      return sum
      // console.log(sum);

      // const sum = data.reduce((acc:any, time:any) => acc.add(moment.duration(time.transitTime)), moment.duration());
      // return [Math.floor(sum.asHours()), sum.minutes()].join(":");
    }
  };
  const calctimeStoppageTime = () => {
    const data = formik.values.connections;
    if (data.length !== 0) {
      // const sum = data.reduce((acc:any, time:any) => acc.add(moment.duration(time.timeStoppage)), moment.duration());
      // return [Math.floor(sum.asHours()), sum.minutes()].join(":");
    }
  };
  const { values, errors, touched, handleChange, handleSubmit, setValues, setFieldValue, setErrors } = formik;
  return (
    <>
      <Modal
        visible={isModalOpen}
        setVisible={setIsModalOpen}
        title={currentData ? "ویرایش شرکت نقلیه" : "افزودن شرکت نقلیه"}
      >
        <form onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <FieldArray
              name="connections"
              render={({ remove, push }) => (
                <>
                  <div className="  grid grid-cols-4 mt-8 gap-y-4 gap-x-2 content-center">
                    <InputText
                      label="کد مسیر"
                      name="code"
                      handleChange={formik.handleChange}
                      values={formik.values.code}
                      important
                      error={formik.touched.code && formik.errors.code}
                    />

                    <InputText
                      label="نام مسیر"
                      name="name"
                      handleChange={formik.handleChange}
                      values={formik.values.name}
                      important
                      error={formik.touched.name && formik.errors.name}
                    />
                    <InputSelect
                      label="مبدا"
                      important
                      name="selectSourceHub"
                      handleChange={formik.setFieldValue}
                      values={formik.values.selectSourceHub}
                      error={formik.touched.selectSourceHub && formik.errors.selectSourceHub}
                      options={[
                        { id: "1", text: "هاب اول" },
                        { id: "2", text: "هاب دوم" },
                      ]}
                    />
                    <InputSelect
                      label="مقصد"
                      important
                      name="selectTargetHub"
                      handleChange={formik.setFieldValue}
                      values={formik.values.selectTargetHub}
                      error={formik.touched.selectTargetHub && formik.errors.selectTargetHub}
                      options={[
                        { id: "1", text: "هاب اول" },
                        { id: "2", text: "هاب دوم" },
                      ]}
                    />
                    <InputText
                      label="تعداد گره"
                      name="nodes"
                      handleChange={formik.handleChange}
                      values={formik.values.nodes}
                      important
                      error={formik.touched.nodes && formik.errors.nodes}
                    />
                    {/* <CustomSwitch
                        type={"button"}
                        dataName={"isActive"}
                        formData={formik}
                        setChecked={setChecked}
                        checked={checked}
                      /> */}
                  </div>

                  <div className="  grid grid-cols-4 mt-8 gap-y-4 gap-x-2 content-center">
                    <InputText
                      readOnly={true}
                      label="مسافت کل مسیر"
                      ref={distanceRef}
                      name="distance"
                      values={formik.values.connections.reduce(
                        (a: any, b: any) => a + Number(b.distanceFromPreviousHub),
                        0
                      )}
                      placeholder="کیلومتر"
                    />
                    <InputText
                      readOnly={true}
                      label="مسافت کل مسیر"
                      ref={distanceVarianceRef}
                      name="distanceVariance"
                      values={(
                        formik.values.connections.reduce((a: any, b: any) => a + Number(b.distanceVariance), 0) /
                        formik.values.connections.length
                      ).toFixed(1)}
                      placeholder="درصد کل انحراف مسافت"
                    />
                    <InputText
                      readOnly={true}
                      label="مدت کل مسیر"
                      ref={transitTimeRef}
                      name="distanceVariance"
                      values={calctransitTimeTime()}
                    />

                    <InputText
                      readOnly={true}
                      label="مدت کل توقف"
                      ref={timeStoppageRef}
                      name="StoppageTime"
                      values={calctimeStoppageTime()}
                    />
                  </div>

                  <div className="addroute mt-20 ">
                    <>
                      <div className="flex  items-center gap-6">
                        <div className="cursor-pointer flex gap-1 items-center" onClick={(e) => addConnection(e, push)}>
                          <GrFormAdd size={30} />
                          <p className="cursor-pointer">افزودن اتصال</p>
                        </div>

                        <button
                          type="button"
                          className=" border-none	text-[14px]  flex gap-1 h-[20px] "
                          onClick={(e) => deleteConnection()}
                        >
                          <BiTrash size={20} className="w-full h-full	" />
                          <span>حذف</span>
                        </button>
                      </div>

                      {formik.values.connections.length !== 0 && (
                        <table className="mt-5 w-md">
                          <thead>
                            <th>ردیف</th>
                            <th></th>
                            <th>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                هاب
                                <span className="text-red-600">*</span>
                              </label>
                            </th>
                            <th>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                فاصله از هاب قبلی (کیلومتر)
                                <span className="text-red-600">*</span>
                              </label>
                            </th>
                            <th>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                درصد انحراف از مسافت
                                <span className="text-red-600">*</span>
                              </label>
                            </th>
                            <th>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                مدت مسیر
                                <span className="text-red-600">*</span>
                              </label>
                            </th>
                            <th>
                              <label className="block mb-1 text-sm font-semibold text-gray-700">
                                مدت توقف
                                <span className="text-red-600">*</span>
                              </label>
                            </th>
                            {/*<th></th>*/}
                          </thead>

                          <tbody>
                            {formik.values.connections.map((item: any, index: any) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {index !== 0 && index !== formik.values.connections.length - 1 ? (
                                    <input
                                      onChange={(event) => handleChangeCheckBox(event, item, index)}
                                      ref={checkBoxRef}
                                      // checked={connectionSelect.length===0 ?false:''}
                                      type="checkbox"
                                      className="rounded-md check"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>
                                  <InputSelect
                                    wrapperClassName={"w-50"}
                                    name={`connections.${index}.selectHub`}
                                    handleChange={formik.setFieldValue}
                                    values={values?.connections[index].selectHub}
                                    isDisabled={(index === 0 || index === formik.values.connections.length - 1) && true}
                                    //  error={
                                    //   touched.connections &&
                                    //   touched.connections[index] &&
                                    //   touched.connections[index].selectHub &&
                                    //   errors.connections &&
                                    //   errors.connections[index] &&
                                    //   errors.connections[index].selectHub && (
                                    //   errors.connections[index].selectHub.id
                                    //   )
                                    // }
                                    options={nodeOptins}
                                  />
                                </td>
                                <td>
                                  <InputText
                                    wrapperClassName={"w-30 "}
                                    classNames={"min-w-[12rem]"}
                                    readOnly={index === 0 && true}
                                    handleChange={formik.handleChange}
                                    name={`connections.${index}.distanceFromPreviousHub`}
                                    values={values.connections[index].distanceFromPreviousHub}
                                    // error={
                                    //   touched.connections &&
                                    //   touched.connections[index] &&
                                    //   touched.connections[index].distanceFromPreviousHub &&
                                    //   errors.connections &&
                                    //   errors.connections[index] &&
                                    //   errors.connections[index].distanceFromPreviousHub && (
                                    //     <div className="field-error">
                                    //       {errors.connections[index].distanceFromPreviousHub}
                                    //     </div>
                                    //   )
                                    // }
                                  />
                                </td>
                                <td>
                                  <InputText
                                    wrapperClassName={"w-30 "}
                                    classNames={"min-w-[12rem]"}
                                    readOnly={index === 0 && true}
                                    handleChange={formik.handleChange}
                                    name={`connections.${index}.distanceVariance`}
                                    values={values.connections[index].distanceVariance}
                                    // error={
                                    //   touched.connections &&
                                    //   touched.connections[index] &&
                                    //   touched.connections[index].distanceVariance &&
                                    //   errors.connections &&
                                    //   errors.connections[index] &&
                                    //   errors.connections[index].distanceVariance && (
                                    //     <div className="field-error">
                                    //       {errors.connections[index].distanceVariance}
                                    //     </div>
                                    //   )
                                    // }
                                  />
                                </td>
                                <td>
                                  <InputText
                                    readOnly={index === 0 && true}
                                    wrapperClassName={"w-30 "}
                                    classNames={"min-w-[12rem]"}
                                    handleChange={formik.handleChange}
                                    name={`connections.${index}.transitTime`}
                                    values={values.connections[index].transitTime}
                                    placeholder="00:00"
                                    // error={
                                    //   touched.connections &&
                                    //   touched.connections[index] &&
                                    //   touched.connections[index].transitTime &&
                                    //   errors.connections &&
                                    //   errors.connections[index] &&
                                    //   errors.connections[index].transitTime && (
                                    //     <div className="field-error">{errors.connections[index].transitTime}</div>
                                    //   )
                                    // }
                                  />
                                  {/* <FormGroup
                                      readOnly={index === 0 && true}
                                      width={"250px"}
                                      error={
                                        touched.connections &&
                                        touched.connections[index] &&
                                        touched.connections[index].transitTime &&
                                        errors.connections &&
                                        errors.connections[index] &&
                                        errors.connections[index].transitTime && (
                                          <div className="field-error">{errors.connections[index].transitTime}</div>
                                        )
                                      }
                                    >
                                      <NumberFormat
                                        readOnly={index === 0 && true}
                                        className="text-center rounded-xl"
                                        prefix=""
                                        mask=""
                                        placeholder="00:00"
                                        name={`connections.${index}.transitTime`}
                                        format="##:##"
                                        value={values.connections[index].transitTime}
                                        onValueChange={({ formattedValue, value }) => {
                                          setFieldValue(
                                            `connections.${index}.transitTime`,
                                            formattedValue
                                            // .replace("00", "0")
                                            // .replace(":", ".")
                                          );
                                        }}
                                      />
                                    </FormGroup> */}
                                </td>
                                <td>
                                  <InputText
                                    wrapperClassName={"w-30 "}
                                    classNames={"min-w-[12rem]"}
                                    readOnly={index === 0 && true}
                                    handleChange={formik.handleChange}
                                    name={`connections.${index}.transitTime`}
                                    values={values.connections[index].distanceVariance}
                                    placeholder="00:00"
                                    // error={
                                    //   touched.connections &&
                                    //   touched.connections[index] &&
                                    //   touched.connections[index].transitTime &&
                                    //   errors.connections &&
                                    //   errors.connections[index] &&
                                    //   errors.connections[index].transitTime && (
                                    //     <div className="field-error">{errors.connections[index].transitTime}</div>
                                    //   )
                                    // }
                                  />
                                  {/* <FormGroup
                                      width={"250px"}
                                      error={
                                        touched.connections &&
                                        touched.connections[index] &&
                                        touched.connections[index].timeStoppage &&
                                        errors.connections &&
                                        errors.connections[index] &&
                                        errors.connections[index].timeStoppage && (
                                          <div className="field-error">{errors.connections[index].timeStoppage}</div>
                                        )
                                      }
                                    >
                                      <NumberFormat
                                        readOnly={index === 0 && true}
                                        className="text-center rounded-xl "
                                        prefix=""
                                        mask=""
                                        placeholder="00:00"
                                        name={`connections.${index}.timeStoppage`}
                                        format="##:##"
                                        value={values.connections[index].timeStoppage}
                                        onValueChange={({ formattedValue, value }) => {
                                          setFieldValue(
                                            `connections.${index}.timeStoppage`,
                                            formattedValue
                                            // .replace("00", "0")
                                            // .replace(":", ".")
                                          );
                                        }}
                                      />
                                    </FormGroup> */}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </>
                  </div>

                  <div className="flex-end-center mt-5 gap-3">
                    <SimpleButton
                      handelClick={() => setIsModalOpen(false)}
                      text="لغو"
                      className="full-lightTomato-btn"
                    />
                    <SimpleButton loading={Loading} type="submit" text={"افزودن"} className="full-tomato-btn" />
                  </div>
                </>
              )}
            />
          </FormikProvider>
        </form>
      </Modal>
      <style>
        {`table td {
           padding: 5px;
        }
        table thead {
          background-color: #fff8f0;
          padding: 10px;
          height: 50px;
      }
        
        
        `}
      </style>
    </>
  );
};

export default RouteActionForms;
