import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "../../global/InputText/InputText";
import Modal from "../../global/Modal/Modal";
import { JustEngPasswordRegex } from "../../tools/validations/ErrorHelper";
import { UNMATCHPASSWORD, VALIDENGPASSWORD } from "../../tools/validations/RegexKeywords";
import { useEffect, useState } from "react";
import { CHANGE_USER_PASSWORD } from "../../services/apiRoute";
import { EditDataParams } from "../../services/Service_call";
import SimpleButton from "../../global/SimpleButton/SimpleButton";

interface ChangePasswordModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ChangePasswordModal = ({ open, setOpen }: ChangePasswordModalProps) => {
  const [Loading, setLoading] = useState(false);
  const validation = Yup.object().shape({
    password: Yup.string().min(8).matches(JustEngPasswordRegex, VALIDENGPASSWORD).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], UNMATCHPASSWORD)
      .required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      tokenID: "",
      changePasswordType: {
        id: 0,
        text: "مشتریان",
      },
    },
    onSubmit: (values) => {
      setLoading(true);
      EditDataParams(CHANGE_USER_PASSWORD, values)
        .then(() => {
          setOpen(false);
          handleReset();
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    },
  });
  const { values, errors, touched, handleChange, handleSubmit, handleReset }: any = formik;

  useEffect(() => {
    handleReset();
  }, [open, handleReset]);

  return (
    <Modal visible={open} setVisible={setOpen} title="تغییر رمز عبور">
      <form onSubmit={handleSubmit} className="flex gap-5 mt-8 flex-col">
        <InputText
          password
          important
          label="گذر واژه "
          values={values.password}
          name="password"
          handleChange={handleChange}
          error={touched.password && errors.password}
        />
        <InputText
          password
          important
          label="تایید گذرواژه"
          values={values.confirmPassword}
          name="confirmPassword"
          handleChange={handleChange}
          error={touched.confirmPassword && errors.confirmPassword}
        />
        <SimpleButton text="ثبت" className="full-tomato-btn w-full" loading={Loading} type="submit" />
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
