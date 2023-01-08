import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputSelect from "../../../global/InputSelect/InputSelect";
import InputText from "../../../global/InputText/InputText";
import Modal from "../../../global/Modal/Modal";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface ChangeCollectHubFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ChangeCollectHubForm = ({ open, setOpen }: ChangeCollectHubFormProps) => {
  const [Loading, setLoading] = useState(false);
  const { selectedRows } = useSelector((state: any) => state?.selectRowTable);
  console.log(selectedRows);

  const formik = useFormik({
    enableReinitialize: true,
    validate: () => {
      if (selectedRows.length === 0) {
        errors.rowCount = "حداقل یک سطر انتخاب شود";
      }
    },
    // // validationSchema: ThirdPartyFormValidation,
    initialValues: { driver: "" },

    onSubmit: (values: any) => {
      setLoading(true);
    },
  });

  const { values, errors, handleSubmit, setFieldValue, handleReset }: any = formik;

  useEffect(() => {
    handleReset();
  }, [handleReset, open]);

  return (
    <Modal visible={open} setVisible={setOpen} title="تغییر هاب جمع آوری">
      <div className="flex-start-start gap-5">
        <InputText readOnly label="تعداد جمع آوری" values={selectedRows.length} error={errors.rowCount} />
        <form onSubmit={handleSubmit}>
          <InputSelect important label="راننده" wrapperClassName=" mb-3" />
          <div className="flex-end-center mt-5 gap-3">
            <SimpleButton handelClick={() => setOpen(false)} text="لغو" className="full-lightTomato-btn" />
            <SimpleButton loading={Loading} type="submit" text="تخصیص" className="full-tomato-btn" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangeCollectHubForm;
