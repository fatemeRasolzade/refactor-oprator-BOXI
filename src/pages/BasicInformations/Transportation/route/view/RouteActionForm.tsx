import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import {FormikProvider,FieldArray, useFormik } from "formik";

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
interface PropsData {
  currentData?: any,
  routeValue?:any
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

const RouteActionForms: React.FC<PropsData> = ({ currentData ,routeValue}): JSX.Element => {
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
    { handleClick: handleAction, name: "افزودن شرکت نقلیه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues:
        currentData
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
                id: routeValue.selectSourceHub.id,
                text: routeValue.selectSourceHub.text,
              },
              selectTargetHub: {
                id: routeValue.selectTargetHub.id,
                text: routeValue.selectTargetHub.text,
              },
              isActive: true,
              nodes: routeValue?.nodes,
              connections: routeValue.connections,
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

  return (
    <>
      {!currentData ? (
        <AddButton ToggleOptions={ToggleOptions} />
      ) : (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={() => setIsModalOpen(!isModalOpen)}>
          <AiOutlineEdit className="w-full h-full" />
        </button>
      )}
      <AddExcel excelInfo={vehicleModelExcel} OpenModal={uploadExcel} setOpenModal={setUploadExcel} />
      <Modal visible={isModalOpen} setVisible={setIsModalOpen} title={currentData ? "ویرایش شرکت نقلیه" : "افزودن شرکت نقلیه"}>

        {/*<form onSubmit={formik.handleSubmit}>*/}
        {/*  <div className="  grid grid-cols-4 mt-8 gap-y-4 gap-x-2 content-center">*/}


        {/*      <FormikProvider value={formik}>*/}
        {/*        <FieldArray*/}
        {/*            name="connections"*/}
        {/*            render={({ remove, push }) => (*/}
        {/*                <>*/}
        {/*                  <div className="formInputSection">*/}
        {/*                    <FormGroup*/}
        {/*                        readOnly={true}*/}
        {/*                        required={true}*/}
        {/*                        error={touched.code && errors.code}*/}
        {/*                        input={{*/}
        {/*                          id: "code",*/}
        {/*                          name: "code",*/}
        {/*                          value: values.code,*/}
        {/*                          onChange: handleChange,*/}
        {/*                        }}*/}
        {/*                        label="کد مسیر"*/}
        {/*                    />*/}
        {/*                    <FormGroup*/}
        {/*                        required={true}*/}
        {/*                        error={touched.name && errors.name}*/}
        {/*                        input={{*/}
        {/*                          id: "name",*/}
        {/*                          name: "name",*/}
        {/*                          value: values.name,*/}
        {/*                          onChange: handleChange,*/}
        {/*                        }}*/}
        {/*                        label="نام مسیر"*/}
        {/*                    />*/}

        {/*                    <FormGroup*/}
        {/*                        required={true}*/}
        {/*                        error={touched.selectSourceHub && errors.selectSourceHub}*/}
        {/*                        label="مبدا"*/}
        {/*                    >*/}
        {/*                      <Select*/}
        {/*                          isDisabled={true}*/}
        {/*                          name="selectSourceHub"*/}
        {/*                          placeholder="مبدا"*/}
        {/*                          options={desthubOptions}*/}
        {/*                          onChange={(value) => {*/}
        {/*                            filterData(value, "source");*/}
        {/*                            setFieldValue("selectSourceHub", {*/}
        {/*                              id: value.value,*/}
        {/*                              text: value.label,*/}
        {/*                            });*/}
        {/*                          }}*/}
        {/*                          value={{*/}
        {/*                            value: values.selectSourceHub?.id,*/}
        {/*                            label: values.selectSourceHub?.text,*/}
        {/*                          }}*/}
        {/*                      />*/}
        {/*                    </FormGroup>*/}
        {/*                    <FormGroup*/}
        {/*                        required={true}*/}
        {/*                        error={touched.selectTargetHub && errors.selectTargetHub}*/}
        {/*                        label="مقصد"*/}
        {/*                    >*/}
        {/*                      <Select*/}
        {/*                          isDisabled={true}*/}
        {/*                          name="selectTargetHub"*/}
        {/*                          placeholder="مقصد"*/}
        {/*                          options={targethubOptions}*/}
        {/*                          onChange={(value) => {*/}
        {/*                            filterData(value, "target");*/}
        {/*                            setFieldValue("selectTargetHub", {*/}
        {/*                              id: value.value,*/}
        {/*                              text: value.label,*/}
        {/*                            });*/}
        {/*                          }}*/}
        {/*                          value={{*/}
        {/*                            value: values.selectTargetHub?.id,*/}
        {/*                            label: values.selectTargetHub?.text,*/}
        {/*                          }}*/}
        {/*                      />*/}
        {/*                    </FormGroup>*/}
        {/*                  </div>*/}

        {/*                  <div className="mt-5 flex gap-5 items-center">*/}
        {/*                    <FormGroup*/}
        {/*                        required={true}*/}
        {/*                        readOnly={formik.values.connections.length === 0 ? false : true}*/}
        {/*                        wrapperClassName={"flex-grow-0 mt-5"}*/}
        {/*                        error={touched.nodes && errors.nodes}*/}
        {/*                        input={{*/}
        {/*                          id: "nodes",*/}
        {/*                          name: "nodes",*/}
        {/*                          readOnly: formik.values.connections.length === 0 ? false : true,*/}
        {/*                          value:*/}
        {/*                              formik.values.connections.length !== 0*/}
        {/*                                  ? formik.values.connections.length - 2*/}
        {/*                                  : values.nodes,*/}
        {/*                          onChange: handleChange,*/}
        {/*                        }}*/}
        {/*                        label="تعداد گره"*/}
        {/*                    />*/}
        {/*                    <CustomSwitch*/}
        {/*                        type={"button"}*/}
        {/*                        dataName={"isActive"}*/}
        {/*                        formData={formik}*/}
        {/*                        setChecked={setChecked}*/}
        {/*                        checked={checked}*/}
        {/*                    />*/}
        {/*                  </div>*/}

        {/*                  <div className="formInputSection">*/}
        {/*                    <FormGroup*/}
        {/*                        readOnly={true}*/}
        {/*                        // error={touched.nodes && errors.nodes}*/}
        {/*                        input={{*/}
        {/*                          // id: "nodes",*/}
        {/*                          ref: distanceRef,*/}
        {/*                          name: "distance",*/}
        {/*                          value: values.connections.reduce(*/}
        {/*                              (a, b) => a + Number(b.distanceFromPreviousHub),*/}
        {/*                              0*/}
        {/*                          ),*/}
        {/*                          placeholder: "کیلومتر",*/}
        {/*                        }}*/}
        {/*                        label="مسافت کل مسیر"*/}
        {/*                    />*/}
        {/*                    <FormGroup*/}
        {/*                        // error={touched.nodes && errors.nodes}*/}

        {/*                        readOnly={true}*/}
        {/*                        input={{*/}
        {/*                          ref: distanceVarianceRef,*/}
        {/*                          name: "distanceVariance",*/}
        {/*                          value: (*/}
        {/*                              values.connections.reduce((a, b) => a + Number(b.distanceVariance), 0) /*/}
        {/*                              values.connections.length*/}
        {/*                          ).toFixed(1),*/}
        {/*                          // onChange: handleChange,*/}
        {/*                        }}*/}
        {/*                        label="درصد کل انحراف مسافت"*/}
        {/*                    />*/}

        {/*                    <FormGroup*/}
        {/*                        className="text-center"*/}
        {/*                        readOnly={true}*/}
        {/*                        // error={touched.nodes && errors.nodes}*/}
        {/*                        input={{*/}
        {/*                          ref: transitTimeRef,*/}
        {/*                          value: calctransitTimeTime(),*/}
        {/*                          name: "transitTime",*/}

        {/*                          // onChange: handleChange,*/}
        {/*                        }}*/}
        {/*                        label="مدت کل مسیر"*/}
        {/*                    />*/}

        {/*                    <FormGroup*/}
        {/*                        className="text-center"*/}
        {/*                        readOnly={true}*/}
        {/*                        // error={touched.nodes && errors.nodes}*/}
        {/*                        input={{*/}
        {/*                          ref: timeStoppageRef,*/}
        {/*                          value: calctimeStoppageTime(),*/}
        {/*                          name: "StoppageTime",*/}
        {/*                          // onChange: handleChange,*/}
        {/*                        }}*/}
        {/*                        label="مدت کل توقف"*/}
        {/*                    />*/}
        {/*                  </div>*/}

        {/*                  <div className="addroute mt-20">*/}
        {/*                    <>*/}
        {/*                      <div className="flex  items-center">*/}
        {/*                        <div*/}
        {/*                            className="cursor-pointer flex gap-2"*/}
        {/*                            onClick={(e) => addConnection(e, push)}*/}
        {/*                        >*/}
        {/*                          <IconPlus />*/}
        {/*                          <p className="cursor-pointer font-semibold">افزودن اتصال</p>*/}
        {/*                        </div>*/}
        {/*                        <Button*/}
        {/*                            type="button"*/}
        {/*                            className="h-[40px] w-[100px] text-black text-[16px]  bg-transparent hover:bg-white mr-8"*/}
        {/*                            onClick={(e) => deleteConnection(e, remove)}*/}
        {/*                        >*/}
        {/*                          <IconTrash /> <span>حذف</span>*/}
        {/*                        </Button>*/}
        {/*                      </div>*/}

        {/*                      {formik.values.connections.length !== 0 && (*/}
        {/*                          <table className="mt-5 w-md">*/}
        {/*                            <thead>*/}
        {/*                            <th>ردیف</th>*/}
        {/*                            <th></th>*/}
        {/*                            <th>*/}
        {/*                              <label className="block mb-1 text-sm font-semibold text-gray-700">*/}
        {/*                                هاب*/}
        {/*                                <span className="text-red-600">*</span>*/}
        {/*                              </label>*/}
        {/*                            </th>*/}
        {/*                            <th>*/}
        {/*                              <label className="block mb-1 text-sm font-semibold text-gray-700">*/}
        {/*                                فاصله از هاب قبلی (کیلومتر)*/}
        {/*                                <span className="text-red-600">*</span>*/}
        {/*                              </label>*/}
        {/*                            </th>*/}
        {/*                            <th>*/}
        {/*                              <label className="block mb-1 text-sm font-semibold text-gray-700">*/}
        {/*                                درصد انحراف از مسافت*/}
        {/*                                <span className="text-red-600">*</span>*/}
        {/*                              </label>*/}
        {/*                            </th>*/}
        {/*                            <th>*/}
        {/*                              <label className="block mb-1 text-sm font-semibold text-gray-700">*/}
        {/*                                مدت مسیر*/}
        {/*                                <span className="text-red-600">*</span>*/}
        {/*                              </label>*/}
        {/*                            </th>*/}
        {/*                            <th>*/}
        {/*                              <label className="block mb-1 text-sm font-semibold text-gray-700">*/}
        {/*                                مدت توقف*/}
        {/*                                <span className="text-red-600">*</span>*/}
        {/*                              </label>*/}
        {/*                            </th>*/}
        {/*                            /!*<th></th>*!/*/}
        {/*                            </thead>*/}

        {/*                            <tbody>*/}


        {/*                            {formik.values.connections.map((item, index) => (*/}
        {/*                                <tr key={index}>*/}
        {/*                                  <td>{index + 1}</td>*/}
        {/*                                  <td>*/}
        {/*                                    {index !== 0 &&*/}
        {/*                                    index !== formik.values.connections.length - 1 ? (*/}
        {/*                                        <input*/}
        {/*                                            onChange={(event) =>*/}
        {/*                                                handleChangeCheckBox(event, item, index)*/}
        {/*                                            }*/}
        {/*                                            ref={checkBoxRef}*/}
        {/*                                            // checked={connectionSelect.length===0 ?false:''}*/}
        {/*                                            type="checkbox"*/}
        {/*                                            className="rounded-md check"*/}
        {/*                                        />*/}
        {/*                                    ) : (*/}
        {/*                                        ""*/}
        {/*                                    )}*/}
        {/*                                  </td>*/}
        {/*                                  <td>*/}
        {/*                                    <FormGroup*/}
        {/*                                        // readOnly={ index === formik.values.connections.length-1 && true}*/}
        {/*                                        width={"250px"}*/}
        {/*                                        error={*/}
        {/*                                            touched.connections &&*/}
        {/*                                            touched.connections[index] &&*/}
        {/*                                            touched.connections[index].selectHub &&*/}
        {/*                                            errors.connections &&*/}
        {/*                                            errors.connections[index] &&*/}
        {/*                                            errors.connections[index].selectHub && (*/}
        {/*                                                <div className="field-error">*/}
        {/*                                                  {errors.connections[index].selectHub.id}*/}
        {/*                                                </div>*/}
        {/*                                            )*/}
        {/*                                        }*/}
        {/*                                    >*/}
        {/*                                      <Select*/}
        {/*                                          isDisabled={(index === 0 || index===formik.values.connections.length-1) && true}*/}
        {/*                                          name={`connections.${index}.selectHub`}*/}
        {/*                                          placeholder=""*/}
        {/*                                          options={nodeOptins}*/}
        {/*                                          value={{*/}
        {/*                                            value: values?.connections[index].selectHub*/}
        {/*                                                .id,*/}
        {/*                                            label: values?.connections[index].selectHub*/}
        {/*                                                .text,*/}
        {/*                                          }}*/}
        {/*                                          onChange={(value) => {*/}
        {/*                                            // filterData(value);*/}
        {/*                                            setFieldValue(*/}
        {/*                                                `connections.${index}.selectHub`,*/}
        {/*                                                {*/}
        {/*                                                  id: value.value,*/}
        {/*                                                  text: value.label,*/}
        {/*                                                }*/}
        {/*                                            );*/}
        {/*                                            // setNodeOptions()*/}
        {/*                                          }}*/}
        {/*                                      />*/}
        {/*                                    </FormGroup>*/}
        {/*                                  </td>*/}
        {/*                                  <td>*/}
        {/*                                    <FormGroup*/}
        {/*                                        readOnly={index === 0 && true}*/}
        {/*                                        width={"250px"}*/}
        {/*                                        error={*/}
        {/*                                            touched.connections &&*/}
        {/*                                            touched.connections[index] &&*/}
        {/*                                            touched.connections[index]*/}
        {/*                                                .distanceFromPreviousHub &&*/}
        {/*                                            errors.connections &&*/}
        {/*                                            errors.connections[index] &&*/}
        {/*                                            errors.connections[index]*/}
        {/*                                                .distanceFromPreviousHub && (*/}
        {/*                                                <div className="field-error">*/}
        {/*                                                  {*/}
        {/*                                                    errors.connections[index]*/}
        {/*                                                        .distanceFromPreviousHub*/}
        {/*                                                  }*/}
        {/*                                                </div>*/}
        {/*                                            )*/}
        {/*                                        }*/}
        {/*                                        input={{*/}
        {/*                                          name: `connections.${index}.distanceFromPreviousHub`,*/}
        {/*                                          value: values.connections[index]*/}
        {/*                                              .distanceFromPreviousHub,*/}
        {/*                                          onChange: handleChange,*/}
        {/*                                          placeholder: "فاصله از هاب قبلی",*/}
        {/*                                        }}*/}
        {/*                                    />*/}
        {/*                                  </td>*/}
        {/*                                  <td>*/}
        {/*                                    <FormGroup*/}
        {/*                                        readOnly={index === 0 && true}*/}
        {/*                                        width={"250px"}*/}
        {/*                                        error={*/}
        {/*                                            touched.connections &&*/}
        {/*                                            touched.connections[index] &&*/}
        {/*                                            touched.connections[index].distanceVariance &&*/}
        {/*                                            errors.connections &&*/}
        {/*                                            errors.connections[index] &&*/}
        {/*                                            errors.connections[index].distanceVariance && (*/}
        {/*                                                <div className="field-error">*/}
        {/*                                                  {*/}
        {/*                                                    errors.connections[index]*/}
        {/*                                                        .distanceVariance*/}
        {/*                                                  }*/}
        {/*                                                </div>*/}
        {/*                                            )*/}
        {/*                                        }*/}
        {/*                                        input={{*/}
        {/*                                          name: `connections.${index}.distanceVariance`,*/}
        {/*                                          value: values.connections[index]*/}
        {/*                                              .distanceVariance,*/}
        {/*                                          onChange: handleChange,*/}
        {/*                                          placeholder: " درصد انحراف",*/}
        {/*                                        }}*/}
        {/*                                    />*/}
        {/*                                  </td>*/}
        {/*                                  <td>*/}
        {/*                                    <FormGroup*/}
        {/*                                        readOnly={index === 0 && true}*/}
        {/*                                        width={"250px"}*/}
        {/*                                        error={*/}
        {/*                                            touched.connections &&*/}
        {/*                                            touched.connections[index] &&*/}
        {/*                                            touched.connections[index].transitTime &&*/}
        {/*                                            errors.connections &&*/}
        {/*                                            errors.connections[index] &&*/}
        {/*                                            errors.connections[index].transitTime && (*/}
        {/*                                                <div className="field-error">*/}
        {/*                                                  {errors.connections[index].transitTime}*/}
        {/*                                                </div>*/}
        {/*                                            )*/}
        {/*                                        }*/}
        {/*                                    >*/}
        {/*                                      <NumberFormat*/}
        {/*                                          readOnly={index === 0 && true}*/}
        {/*                                          className="text-center rounded-xl"*/}
        {/*                                          prefix=""*/}
        {/*                                          mask=""*/}
        {/*                                          placeholder="00:00"*/}
        {/*                                          name={`connections.${index}.transitTime`}*/}
        {/*                                          format="##:##"*/}
        {/*                                          value={values.connections[index].transitTime}*/}
        {/*                                          onValueChange={({ formattedValue, value }) => {*/}
        {/*                                            setFieldValue(*/}
        {/*                                                `connections.${index}.transitTime`,*/}
        {/*                                                formattedValue*/}
        {/*                                                // .replace("00", "0")*/}
        {/*                                                // .replace(":", ".")*/}
        {/*                                            );*/}
        {/*                                          }}*/}
        {/*                                      />*/}
        {/*                                      */}
        {/*                                    </FormGroup>*/}
        {/*                                  </td>*/}
        {/*                                  <td>*/}
        {/*                                    <FormGroup*/}
        {/*                                        width={"250px"}*/}
        {/*                                        error={*/}
        {/*                                            touched.connections &&*/}
        {/*                                            touched.connections[index] &&*/}
        {/*                                            touched.connections[index].timeStoppage &&*/}
        {/*                                            errors.connections &&*/}
        {/*                                            errors.connections[index] &&*/}
        {/*                                            errors.connections[index].timeStoppage && (*/}
        {/*                                                <div className="field-error">*/}
        {/*                                                  {errors.connections[index].timeStoppage}*/}
        {/*                                                </div>*/}
        {/*                                            )*/}
        {/*                                        }*/}
        {/*                                    >*/}
        {/*                                      <NumberFormat*/}
        {/*                                          readOnly={index === 0 && true}*/}
        {/*                                          className="text-center rounded-xl "*/}
        {/*                                          prefix=""*/}
        {/*                                          mask=""*/}
        {/*                                          placeholder="00:00"*/}
        {/*                                          name={`connections.${index}.timeStoppage`}*/}
        {/*                                          format="##:##"*/}
        {/*                                          value={values.connections[index].timeStoppage}*/}
        {/*                                          onValueChange={({ formattedValue, value }) => {*/}
        {/*                                            setFieldValue(*/}
        {/*                                                `connections.${index}.timeStoppage`,*/}
        {/*                                                formattedValue*/}
        {/*                                                // .replace("00", "0")*/}
        {/*                                                // .replace(":", ".")*/}
        {/*                                            );*/}
        {/*                                          }}*/}
        {/*                                      />*/}
        {/*                                      */}
        {/*                                    </FormGroup>*/}
        {/*                                  </td>*/}
        {/*                                </tr>*/}
        {/*                            ))}*/}
        {/*                            </tbody>*/}
        {/*                          </table>*/}
        {/*                      )}*/}
        {/*                    </>*/}
        {/*                  </div>*/}

        {/*              */}
        {/*                </>*/}
        {/*            )}*/}
        {/*        />*/}
        {/*      </FormikProvider>*/}
        {/*   */}
























        {/*    /!*<div>*!/*/}
        {/*    /!*  <InputText*!/*/}
        {/*    /!*    label="کد مسیر"*!/*/}
        {/*    /!*    // className="w-full"*!/*/}
        {/*    /!*    name="code"*!/*/}
        {/*    /!*    handleChange={formik.handleChange}*!/*/}
        {/*    /!*    values={formik.values.code}*!/*/}
        {/*    /!*    important*!/*/}

        {/*    /!*    error={formik.touched.code && formik.errors.code}*!/*/}
        {/*    /!*  />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div>*!/*/}
        {/*    /!*  <InputText*!/*/}
        {/*    /!*    label="نام مسیر"*!/*/}
        {/*    /!*    // className="w-full"*!/*/}
        {/*    /!*    name="name"*!/*/}
        {/*    /!*    handleChange={formik.handleChange}*!/*/}
        {/*    /!*    values={formik.values.name}*!/*/}
        {/*    /!*    important*!/*/}
        {/*    /!*    error={formik.touched.name && formik.errors.name}*!/*/}
        {/*    /!*  />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div>*!/*/}
        {/*    /!*  <InputSelect*!/*/}
        {/*    /!*    label="مبدا"*!/*/}
        {/*    /!*    important*!/*/}
        {/*    /!*    name="selectSourceHub"*!/*/}
        {/*    /!*    handleChange={formik.setFieldValue}*!/*/}
        {/*    /!*    values={formik.values.selectSourceHub}*!/*/}
        {/*    /!*    error={formik.touched.selectSourceHub && formik.errors.selectSourceHub}*!/*/}
        {/*    /!*    options={ []}*!/*/}
        {/*    /!*  />*!/*/}
        {/*    /!*</div>*!/*/}

        {/*  </div>*/}
        {/*  <div className="flex-end-center mt-5 gap-3">*/}
        {/*    <SimpleButton handelClick={() => setIsModalOpen(false)} text="لغو" className="full-lightTomato-btn" />*/}
        {/*    <SimpleButton*/}
        {/*      loading={Loading}*/}
        {/*      type="submit"*/}
        {/*      text={currentData ? "ویرایش" : "افزودن"}*/}
        {/*      className="full-tomato-btn"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</form>*/}

      </Modal>
    </>
  );
};

export default RouteActionForms;
