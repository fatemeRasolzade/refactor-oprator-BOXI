import React, { useEffect } from "react";

import { useFormik } from "formik";
import InputText from "../../../../global/InputText/InputText";
import { apiRoute } from "../../../../services/apiRoute";
import { EditDataParams, PostDataParams } from "../../../../services/Service_call";
import { SuccessAlert } from "../../../../global/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { vendorData } from "../../../../redux/Transportation/vendor/VendorData";
import { ContactNumberValidate, NationalIDValidator } from "../../../../tools/validations/ErrorHelper";
import * as Yup from "yup";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";
import Modal from "../../../../global/Modal/Modal";
interface PropsData {
  currentData?: any;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const validation = Yup.object().shape({
  name: Yup.string().required().label("نام شرکت"),
  code: Yup.string().required().label("کد شرکت"),
  nationalCode: Yup.number().required(),
  contactNumber: Yup.number().label("شماره تماس"),
});

const VendorActionForms: React.FC<PropsData> = ({ currentData,open,setOpen}): JSX.Element => {

  const { filter } = useSelector((state: any) => state.vendor);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: currentData
      ? {
          id: currentData?.id,
          code: currentData?.code,
          name: currentData?.name,
          contactNumber: currentData?.contactNumber,
          nationalCode: currentData?.nationalCode,
          isActive: currentData?.isActive,
        }
      : {
          code: "",
          name: "",
          contactNumber: "",
          nationalCode: "",
          isActive: true,
        },

    validate: (values) => {
      const errors = {};
      const [isValidNC, errNC] = NationalIDValidator(values.nationalCode);
      const [isValidContact, errContact] = ContactNumberValidate(values.contactNumber);
      if (!isValidNC) {
        // @ts-ignore
        errors.nationalCode = errNC;
      }
      if (!isValidContact) {
        // @ts-ignore
        errors.contactNumber = errContact;
      }

      return errors;
    },
    onSubmit: (values) => {
      if (!currentData) {
        PostDataParams(apiRoute().post.createVendor, values).then((res) => {
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ساخته شد");

            dispatch(
              vendorData({
                ...filter,
                pageSize: 10,
                pageNumber: pageNumbers,
              }) as any
            );
          } else {
            console.log("run error");
            // ErrorAlert("خطا در برقراری اطلاعات");
          }

          // dispatch(updating(false));
            setOpen(false)
          // setIsModalOpen(false);
        });
      } else {
        EditDataParams(apiRoute().edit.EditVendor, values).then((res) => {
          // dispatch(updating(true));
          if (res.status === "OK") {
            SuccessAlert("با موفقیت ویرایش شد");
            dispatch(
              vendorData({
                ...filter,
                pageSize: 10,
                pageNumber:pageNumbers,
              }) as any
            );
          } else {
            console.log("run error");
            // ErrorAlert("خطا در برقراری اطلاعات");
          }
          setOpen(false)
          // setIsModalOpen(false);
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
        title={currentData ? "ویرایش شرکت نقلیه" : "افزودن شرکت نقلیه"}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="  grid grid-cols-2 mt-8 gap-4 content-center">
            <div>
              <InputText
                label="کد شرکت"
                // className="w-full"
                readOnly={currentData?true:false}
                name="code"
                handleChange={formik.handleChange}
                values={formik.values.code}
                important
                type={"text"}
                error={formik.touched.code && formik.errors.code}
              />
            </div>
            <div>
              <InputText
                label="نام شرکت"
                // className="w-full"
                name="name"
                handleChange={formik.handleChange}
                values={formik.values.name}
                important
                type={"text"}
                error={formik.touched.name && formik.errors.name}
              />
            </div>

            <div>
              <InputText
                label="شماره تماس"
                // className="w-full"
                name="contactNumber"
                handleChange={formik.handleChange}
                values={formik.values.contactNumber}
                type={"text"}
                error={formik.touched.contactNumber && formik.errors.contactNumber}
              />
            </div>

            <div>
              <InputText
                label="شناسه ملی"
                // className="w-full"
                name="nationalCode"
                handleChange={formik.handleChange}
                values={formik.values.nationalCode}
                important
                type={"text"}
                error={formik.touched.nationalCode && formik.errors.nationalCode}
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
              // loading={Loading}
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

export default VendorActionForms;
