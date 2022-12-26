import * as Yup from "yup";
import { useFormik } from "formik";
import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { JustEngPasswordRegex } from "../../../tools/validations/ErrorHelper";
import { UNMATCHPASSWORD, VALIDENGPASSWORD } from "../../../tools/validations/RegexKeywords";

interface ThirdStepRecoveryProps {
  loading: boolean;
  handleChangePass: any;
}

const ThirdStepRecovery = ({ handleChangePass, loading }: ThirdStepRecoveryProps) => {
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
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      handleChangePass(values);
    },
  });
  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-8">
      <p className="text-base">رمز عبور جدید را وارد نمایید.</p>
      <InputText
        wrapperClassName="w-full"
        password
        important
        label="گذر واژه "
        values={values.password}
        name="password"
        handleChange={handleChange}
        error={touched.password && errors.password}
      />
      <InputText
        wrapperClassName="w-full"
        password
        important
        label="تایید گذرواژه"
        values={values.confirmPassword}
        name="confirmPassword"
        handleChange={handleChange}
        error={touched.confirmPassword && errors.confirmPassword}
      />
      <SimpleButton text="تغییر رمز عبور" className="full-tomato-btn w-full" loading={loading} type="submit" />
    </form>
  );
};

export default ThirdStepRecovery;
