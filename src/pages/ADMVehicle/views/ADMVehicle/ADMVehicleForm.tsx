import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../../../global/Modal/Modal";
import AddButton from "../../../../global/addButton/AddButton";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { ADMVehicleData } from "../../../../redux/ADMVehicle/ADMVehicleData";
import { createADMVehicle, editADMVehicle } from "../../../../services/ADMVehicleApi";
import { ADMVehicleFormCurrentValues, ADMVehicleFormInitialValues, ADMVehicleFormValidation } from "./ADMVehicleFormVariable";
import ADMVehicleInformation from "./ADMVehicleInformation";

type CustomerFormProps = {
  currentData?: any;
};

const ADMVehicleForm = ({ currentData }: CustomerFormProps) => {
  const [open, setOpen] = useState(false);
  const [OpenExcel, setOpenExcel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ADMVehicleFormValidation,
    initialValues: currentData ? ADMVehicleFormCurrentValues(currentData) : ADMVehicleFormInitialValues,
    onSubmit: (values: any) => {
      console.log("**************", values);

      setLoading(true);
      // if (currentData) {
      //   editADMVehicle({
      //     ...values,
      //     id: currentData.id,
      //   })
      //     .then((response) => {
      //       dispatch(ADMVehicleData({}) as any);
      //       setOpen(false);
      //       response.status && toast.success("وسیله نقلیه ویرایش شد ");
      //     })
      //     .catch((error) => {})
      //     .finally(() => setLoading(false));
      // } else {
      //   createADMVehicle({
      //     ...values,
      //   })
      //     .then(() => {
      //       dispatch(ADMVehicleData({}) as any);
      //       setOpen(false);
      //       toast.success("وسیله نقلیه افزوده شد ");
      //     })
      //     .finally(() => setLoading(false));
      // }
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;
  const handleOpenModal = () => setOpen(true);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن وسیله نقلیه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const handleCloseCustomerForm = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <>
      {currentData ? (
        <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={handleOpenModal}>
          <AiOutlineEdit className="w-[20px] h-[20px]" size={15} />
        </button>
      ) : (
        <AddButton ToggleOptions={ToggleOptions} />
      )}
      {/* <AddExcel excelInfo={ADMVehicleExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} /> */}
      <Modal visible={open} setVisible={setOpen} title={currentData ? " ویرایش وسیله نقلیه اجاره ای " : "تعریف وسیله نقلیه اجاره ای "}>
        <form onSubmit={handleSubmit}>
          <ADMVehicleInformation formik={formik} open={open} />
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={handleCloseCustomerForm} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton loading={Loading} type="submit" text={currentData ? "ویرایش" : "افزودن"} className="full-tomato-btn" />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ADMVehicleForm;
