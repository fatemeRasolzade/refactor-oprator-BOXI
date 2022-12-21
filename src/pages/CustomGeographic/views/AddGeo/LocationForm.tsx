import React, { FC, useState } from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

import { convertToObjects } from "../../../../tools/functions/Methods";
import { useFormik } from "formik";
import Provinces from "../../../../components/provinces/Provinces";
import CustomSwitch from "../../../../global/Switch/Switch";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import StaticTable from "../../../../components/staticTable/StaticTable";
import { AddGeoColumn } from "../../../../global/Column/Columns";
import TooltipWrapper from "../../../../global/tooltip/TooltipWrapper";
import { BiPlus, BiTrash } from "react-icons/bi";
import { Dialog } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";

interface LocationFormProps {
  tableList: Array<any>;
  formikTitle: any;
  setTableList: (values: any) => void;
  setDeletedList: (values: Array<any>) => void;
}

const LocationForm: FC<LocationFormProps> = ({
  tableList,
  formikTitle,
  setTableList,
  setDeletedList,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteHandler = (id: number) => {
    setDeletedList(tableList.filter((item) => item.id !== id));
    setIsModalOpen(false);
  };

  const validation = Yup.object().shape(
    {
      fromCountryDevision: Yup.array().required(),
      toCountryDevision: Yup.array().required(),

      fromSourceCity: Yup.array().when(
        "fromDestinationCity",
        (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
      fromDestinationCity: Yup.array().when(
        "fromSourceCity",
        (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
      fromDestinationLocation: Yup.array().when(
        "fromSourceLocation",
        (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
      fromSourceLocation: Yup.array().when(
        "fromDestinationLocation",
        (val: any, schema: any) => {
          if (val) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
    },
    [
      ["fromSourceLocation", "fromDestinationLocation"],
      ["fromSourceCity", "fromDestinationCity"],
    ]
  );
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      id: "",
      fromCountryDevision: "",
      toCountryDevision: "",
      fromDestinationCity: "",
      fromSourceCity: "",
      fromSourceLocation: "",
      fromDestinationLocation: "",
    },
    onSubmit: async (values, { resetForm }) => {
      let fromCountryDevisiondsdsd: any = [];
      let toCountryDevisiond: any = [];
      let attributeDivition;
      fromCountryDevisiondsdsd =
        values.fromDestinationLocation?.length !== 0
          ? values.fromDestinationLocation
          : values.fromDestinationCity.length !== 0
          ? values.fromDestinationCity
          : values.fromCountryDevision.length !== 0
          ? values.fromCountryDevision
          : [];
      toCountryDevisiond =
        values.fromSourceLocation.length !== 0
          ? values.fromSourceLocation
          : values.fromSourceCity.length !== 0
          ? values.fromSourceCity
          : values.toCountryDevision.length !== 0
          ? values.toCountryDevision
          : [];
      attributeDivition =
        fromCountryDevisiondsdsd.length !== 0
          ? convertToObjects(
              fromCountryDevisiondsdsd,
              toCountryDevisiond,
              "from"
            )
          : [];

      let data = {
        ...values,
        id: values?.id ? values.id : uuid(),
        customDevisionDetails: attributeDivition.map((item) => {
          return {
            ...item,
            id: "",
            isActive: true,
            customDevision: {
              id: "",
              text: "",
            },
          };
        }),
      };
      setTableList(data);
      resetForm();
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-10/12 grid grid-cols-5 gap-2">
          <div className="col-span-4">
            <fieldset className="border rounded-xl p-6">
              <legend className="px-3"> جزئیات رده جغرافیایی</legend>
              <div className="grid grid-cols-2 gap-6">
                <Provinces form={formik} />
              </div>
            </fieldset>
          </div>
          <div className={` col-span-1  h-[40px] mt-[10px]`}>
            <CustomSwitch
              active={true}
              handleChange={(value) =>
                formikTitle.setFieldValue("isActive", value)
              }
            />
          </div>
        </div>
        <div className="w-full flex justify-end my-6">
          <SimpleButton
            icon={<BiPlus color="white" />}
            type="submit"
            text="درج در لیست"
            className="full-tomato-btn px-[50px] w-fit "
          />
        </div>
      </form>
      <StaticTable
        data={tableList?.map((item: any) => {
          return {
            fromCountryDevision: (
              <div className="w-full flex justify-center">
                <TooltipWrapper
                  textProps={item?.fromCountryDevision?.map((country: any) => {
                    return (
                      <div className="text-white" key={country.id}>
                        {country.text}
                      </div>
                    );
                  })}
                >
                  <div>
                    {item?.fromCountryDevision?.length !== 0 &&
                      item?.fromCountryDevision[
                        item?.fromCountryDevision?.length - 1
                      ].text}
                  </div>
                </TooltipWrapper>

                {item?.fromSourceCity && item?.fromSourceCity.length !== 0 && (
                  <>
                    <span>&nbsp; - &nbsp;</span>
                    <TooltipWrapper
                      textProps={item?.fromSourceCity?.map((city: any) => {
                        return (
                          <div className="text-white" key={city.id}>
                            {city.text}
                          </div>
                        );
                      })}
                    >
                      <div>
                        {item?.fromSourceCity?.length !== 0 &&
                          item?.fromSourceCity[item?.fromSourceCity?.length - 1]
                            .text}
                      </div>
                    </TooltipWrapper>
                  </>
                )}
                {item?.fromSourceLocation &&
                  item?.fromSourceLocation.length !== 0 && (
                    <>
                      <span>&nbsp; - &nbsp;</span>
                      <TooltipWrapper
                        textProps={item?.fromSourceLocation?.map(
                          (location: any) => {
                            return (
                              <div className="text-white" key={location.id}>
                                {location.text}
                              </div>
                            );
                          }
                        )}
                      >
                        <div>
                          {item?.fromSourceLocation?.length !== 0 &&
                            item?.fromSourceLocation[
                              item?.fromSourceLocation?.length - 1
                            ].text}
                        </div>
                      </TooltipWrapper>
                    </>
                  )}
              </div>
            ),
            toCountryDevision: (
              <div className="w-full flex justify-center">
                <TooltipWrapper
                  textProps={item?.toCountryDevision?.map((country: any) => (
                    <div className="text-white" key={country.id}>
                      {country.text}
                    </div>
                  ))}
                >
                  <div>
                    {item?.toCountryDevision?.length !== 0 &&
                      item?.toCountryDevision[
                        item?.toCountryDevision?.length - 1
                      ].text}
                  </div>
                </TooltipWrapper>
                {item?.fromDestinationCity &&
                  item?.fromDestinationCity.length !== 0 && (
                    <>
                      <span>&nbsp; - &nbsp;</span>
                      <TooltipWrapper
                        textProps={item?.fromDestinationCity?.map(
                          (city: any) => {
                            return (
                              <div className="text-white" key={city.id}>
                                {city.text}
                              </div>
                            );
                          }
                        )}
                      >
                        <div>
                          {item?.fromDestinationCity?.length !== 0 &&
                            item?.fromDestinationCity[
                              item?.fromDestinationCity?.length - 1
                            ].text}
                        </div>
                      </TooltipWrapper>
                    </>
                  )}
                {item?.fromDestinationLocation &&
                  item?.fromDestinationLocation.length !== 0 && (
                    <>
                      <span>&nbsp; - &nbsp;</span>
                      <TooltipWrapper
                        textProps={item?.fromDestinationLocation?.map(
                          (location: any) => {
                            return (
                              <div className="text-white" key={location.id}>
                                {location.text}
                              </div>
                            );
                          }
                        )}
                      >
                        <div>
                          {item?.fromDestinationLocation?.length !== 0 &&
                            item?.fromDestinationLocation[
                              item?.fromDestinationLocation?.length - 1
                            ].text}
                        </div>
                      </TooltipWrapper>
                    </>
                  )}
              </div>
            ),
            operation: (
              <div>
                <button
                  className=" border-none	text-[14px]  w-[20px] h-[20px]"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  <BiTrash size={20} className="w-full h-full	" />
                </button>
                <Dialog
                  open={isModalOpen}
                  handler={setIsModalOpen}
                  className="min-w-[400px] w-[500px]"
                >
                  <button
                    className="flex w-[50px] h-[50px]  border-none items-center justify-center"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <GrFormClose />
                  </button>
                  <div className="flex  justify-center  mb-6">
                    <div className="flex flex-col  w-[80%] gap-6">
                      <div className="w-full justify-center flex">
                        <h3 className="text-darkGray font-bold text-lg">
                          حذف مشخصات محصول
                        </h3>
                      </div>
                      <p className="w-full flex justify-center">
                        آیا از حذف این مورد اطمینان دارید؟
                      </p>
                      <div className="flex w-full justify-center gap-4">
                        <SimpleButton
                          type="submit"
                          text="خیر"
                          className="full-lightTomato-btn w-28 "
                          handelClick={() => setIsModalOpen(false)}
                        />
                        <SimpleButton
                          type="submit"
                          text="بله"
                          className="full-tomato-btn w-28 "
                          handelClick={() => onDeleteHandler(item.id)}
                        />
                      </div>
                    </div>
                  </div>
                </Dialog>
              </div>
            ),
          };
        })}
        column={AddGeoColumn}
        pagination={7}
        selectable={false}
      />
    </div>
  );
};

export default LocationForm;
