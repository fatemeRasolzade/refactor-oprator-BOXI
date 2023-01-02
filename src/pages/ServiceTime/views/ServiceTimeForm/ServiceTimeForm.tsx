import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../../../../global/Modal/Modal";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { ServiceTimeFormCurrentValues, ServiceTimeFormInitialValues, ServiceTimeFormValidation } from "./ServiceTimeFormVariable";
import ServiceTimeInformation from "./ServiceTimeInformation";
import { EditDataParams, postDataToServer } from "../../../../services/Service_call";
import { CREATE_SERVICETIME, EDIT_SERVICETIME } from "../../../../services/apiRoute";
import { serviceTimeData } from "../../../../redux/ServiceTimeData/ServiceTimeData";

type ServiceTimeFormProps = {
  currentData?: any;
  TimeUnitType: any;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ServiceTimeForm = ({ currentData, TimeUnitType, open, setOpen }: ServiceTimeFormProps) => {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ServiceTimeFormValidation,
    initialValues: currentData ? ServiceTimeFormCurrentValues(currentData) : ServiceTimeFormInitialValues,
    onSubmit: (values: any) => {
      setLoading(true);
      if (currentData) {
        EditDataParams(EDIT_SERVICETIME, {
          ...values,
          id: currentData.id,
        })
          .then((response) => {
            dispatch(serviceTimeData({}) as any);
            setOpen(false);
            response.status && toast.success("مدت ارائه خدمات ویرایش شد");
          })
          .catch((error) => {})
          .finally(() => setLoading(false));
      } else {
        postDataToServer(CREATE_SERVICETIME, values)
          .then(() => {
            dispatch(serviceTimeData({}) as any);
            setOpen(false);
            toast.success("مدت ارائه خدمات افزوده شد");
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
    <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش مدت ارائه خدمات" : "تعریف مدت ارائه خدمات"}>
      <form onSubmit={handleSubmit}>
        <ServiceTimeInformation formik={formik} TimeUnitType={TimeUnitType} />
        <div className="flex-end-center mt-5 gap-3">
          <SimpleButton handelClick={handleCloseCustomerForm} text="لغو" className="full-lightTomato-btn" />
          <SimpleButton loading={Loading} type="submit" text={currentData ? "ویرایش" : "افزودن"} className="full-tomato-btn" />
        </div>
      </form>
    </Modal>
  );
};

export default ServiceTimeForm;
