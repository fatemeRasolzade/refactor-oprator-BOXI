import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { EditDataParams, PostDataParams } from "../../../../../services/Service_call";
import { apiRoute } from "../../../../../services/apiRoute";
import { SuccessAlert } from "../../../../../global/alert/Alert";
import InputText from "../../../../../global/InputText/InputText";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import { vehicleModel } from "../../../../../redux/Transportation/vehicleModel/VehicleModel";
import Modal from "../../../../../global/Modal/Modal";
import CustomSwitch from "../../../../../global/Switch/Switch";
interface PropsData {
  currentData?: any;
  fuelOptions: any;
  vendorOptions: any;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const validation = Yup.object().shape({
  name: Yup.string().required(),
  code: Yup.number().required(),
  weightCapacity: Yup.number().required(),
  volumeCapacity: Yup.number().required(),
  consignmentCapacity: Yup.number().required(),
  vendorSelect: Yup.object(),
  fuelTypeSelect: Yup.object().shape({
    text: Yup.string().required(),
    id: Yup.string().required(),
  }),
});

const VehicleMakeActionForms: React.FC<PropsData> = ({
  currentData,
  fuelOptions,
  vendorOptions,
  open,
  setOpen,
}): JSX.Element => {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { filter } = useSelector((state: any) => state.vehicleModel);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          isActive: currentData?.isActive,
          name: currentData?.name,
          code: currentData?.code,
          weightCapacity: currentData?.weightCapacity,
          volumeCapacity: currentData?.volumeCapacity,
          consignmentCapacity: currentData?.consignmentCapacity,
          fuelTypeSelect: {
            id: currentData?.fuelTypeSelect.id,
            text: currentData?.fuelTypeSelect.text,
          },
          vendorSelect: {
            id: currentData?.vendorSelect?.id,
            text: currentData?.vendorSelect?.text,
          },
        }
      : {
          isActive: true,
          name: "",
          code: "",
          weightCapacity: "",
          volumeCapacity: "",
          consignmentCapacity: "",
          fuelTypeSelect: {
            id: "",
            text: "",
          },
          vendorSelect: {
            id: "",
            text: "",
          },
        },
    onSubmit: (values) => {
      if (!currentData) {
        setLoading(true);
        PostDataParams(apiRoute().post.VehicleModel, values)
          .then((res) => {
            if (res.status === "OK") {
              SuccessAlert("با موفقیت ساخته شد");
              setLoading(false);
              dispatch(
                vehicleModel({
                  pageSize: 10,
                  pageNumber: pageNumbers,
                }) as any
              );
            } else {
              console.log("run error");

              // ErrorAlert("خطا در برقراری اطلاعات");
            }

            // dispatch(updating(false));

            setOpen(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(true);
        EditDataParams(apiRoute().edit.VehicleModel, values)
          .then((res) => {
            if (res.status === "OK") {
              setLoading(false);
              SuccessAlert("با موفقیت ویرایش شد");
              dispatch(
                vehicleModel({
                  pageSize: 10,
                  pageNumber: pageNumbers,
                }) as any
              );
            }
            setOpen(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    },
  });
  useEffect(() => {
    formik.resetForm({});
  }, [open]);

  return (
    <>
      <Modal
        visible={open}
        setVisible={setOpen}
        title={currentData ? "ویرایش مدل وسیله نقلیه" : "تعریف مدل وسیله نقلیه"}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="  grid grid-cols-4 mt-8 gap-4 content-center items-center">
            <div>
              <InputText
                label="نام مدل"
                // className="w-full"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important
                error={formik.touched.name && formik.errors.name}
              />
            </div>
            <div>
              <InputText
                label="کد مدل"
                // className="w-full"
                readOnly={currentData ? true : false}
                name="code"
                handleChange={formik.handleChange}
                values={formik.values.code}
                important
                error={formik.touched.code && formik.errors.code}
              />
            </div>

            <div>
              <InputText
                label=" ظرفیت وزنی (کیلوگرم)"
                // className="w-full"
                name="weightCapacity"
                handleChange={formik.handleChange}
                values={formik.values.weightCapacity}
                type={"text"}
                error={formik.touched.weightCapacity && formik.errors.weightCapacity}
              />
            </div>

            <div>
              <InputText
                label=" ظرفیت حجمی (متر مکعب)"
                // className="w-full"
                name="volumeCapacity"
                handleChange={formik.handleChange}
                values={formik.values.volumeCapacity}
                important
                type={"text"}
                error={formik.touched.volumeCapacity && formik.errors.volumeCapacity}
              />
            </div>
            <div>
              <InputText
                label="ظرفیت مرسوله (تعداد)"
                // className="w-full"
                name="consignmentCapacity"
                handleChange={formik.handleChange}
                values={formik.values.consignmentCapacity}
                important
                type={"text"}
                error={formik.touched.consignmentCapacity && formik.errors.consignmentCapacity}
              />
            </div>

            <div>
              <InputSelect
                label="نوع سوخت"
                important
                name="fuelTypeSelect"
                handleChange={formik.setFieldValue}
                values={formik.values.fuelTypeSelect}
                error={formik.touched.fuelTypeSelect && formik.errors.fuelTypeSelect}
                options={fuelOptions.options || []}
              />
            </div>
            <div>
              <InputSelect
                label="نام شرکت نقلیه"
                // important
                isClearable={true}
                name="vendorSelect"
                handleChange={formik.setFieldValue}
                values={formik.values.vendorSelect}
                error={formik.touched.vendorSelect && formik.errors.vendorSelect}
                options={vendorOptions.options}
              />
            </div>
            <CustomSwitch
              active={formik.values.isActive}
              handleChange={(value: any) => formik.setFieldValue("isActive", value)}
            />
          </div>
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={() => setOpen(false)} text="لغو" className="full-lightTomato-btn" />
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

export default VehicleMakeActionForms;
