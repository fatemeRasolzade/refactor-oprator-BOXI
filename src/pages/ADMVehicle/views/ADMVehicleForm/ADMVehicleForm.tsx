import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../../../../global/Modal/Modal";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { ADMVehicleData } from "../../../../redux/ADMVehicle/ADMVehicleData";
import { createADMVehicle, editADMVehicle } from "../../../../services/ADMVehicleApi";
import { ADMVehicleFormCurrentValues, ADMVehicleFormInitialValues, ADMVehicleFormValidation } from "./ADMVehicleFormVariable";
import ADMVehicleInformation from "./ADMVehicleInformation";

type CustomerFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  currentData?: any;
};

const ADMVehicleForm = ({ currentData, open, setOpen }: CustomerFormProps) => {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ADMVehicleFormValidation,
    initialValues: currentData ? ADMVehicleFormCurrentValues(currentData) : ADMVehicleFormInitialValues,
    onSubmit: (values: any) => {
      setLoading(true);
      if (currentData) {
        editADMVehicle({
          ...values,
          id: currentData.id,
        })
          .then(() => {
            dispatch(ADMVehicleData({}) as any);
            setOpen(false);
            handleReset();
            toast.success("وسیله نقلیه ویرایش شد ");
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        createADMVehicle(values)
          .then(() => {
            dispatch(ADMVehicleData({}) as any);
            setOpen(false);
            handleReset();
            toast.success("وسیله نقلیه افزوده شد ");
          })
          .finally(() => setLoading(false));
      }
    },
  });

  const { handleSubmit, handleReset }: any = formik;

  const handleCloseCustomerForm = () => setOpen(false);

  useEffect(() => {
    handleReset();
  }, [handleReset, open]);

  return (
    <Modal visible={open} setVisible={setOpen} title={currentData ? " ویرایش وسیله نقلیه اجاره ای " : "تعریف وسیله نقلیه اجاره ای "}>
      <form onSubmit={handleSubmit}>
        <ADMVehicleInformation formik={formik} open={open} currentData={currentData} />
        <div className="flex-end-center mt-5 gap-3">
          <SimpleButton handelClick={handleCloseCustomerForm} text="لغو" className="full-lightTomato-btn" />
          <SimpleButton loading={Loading} type="submit" text={currentData ? "ویرایش" : "افزودن"} className="full-tomato-btn" />
        </div>
      </form>
    </Modal>
  );
};

export default ADMVehicleForm;
