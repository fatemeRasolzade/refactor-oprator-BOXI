import InputText from "../../../global/InputText/InputText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface FirstStepRecoveryProps {
  formik: any;
  loading: boolean;
}

const FirstStepRecovery = ({ formik, loading }: FirstStepRecoveryProps) => {
  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <p className="text-base">شماره همراه خود را جهت بازیابی رمز عبور وارد نمایید</p>
      <InputText
        wrapperClassName="w-full"
        important
        label="نام کاربری"
        name="username"
        values={values.username}
        handleChange={handleChange}
        error={touched.username && errors.username}
      />
      <SimpleButton text="مرحله بعد" className="full-tomato-btn w-full" loading={loading} type="submit" />
    </form>
  );
};

export default FirstStepRecovery;
