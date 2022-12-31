import { useFormik } from "formik";
import * as Yup from "yup";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

const AddConsignmentManage = () => {
  const validationTitle = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.number().required(),
  });
  const formikTitle = useFormik({
    enableReinitialize: true,
    validationSchema: validationTitle,
    initialValues: {
      isActive: true,
    },
    onSubmit: async (values, { resetForm }) => {},
  });
  return (
    <div>
      <Breadcrumb curentPage="افزودن مرسوله" />
    </div>
  );
};

export default AddConsignmentManage;
