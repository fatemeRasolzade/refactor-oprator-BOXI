import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import DoneRecovering from "./views/DoneRecovering";
import FirstStepRecovery from "./views/FirstStepRecovery";
import { postDataToServer } from "../../services/Service_call";
import ThirdStepRecovery from "./views/ThirdStepRecovery";
import SecondStepRecovery from "./views/SecondStepRecovery";
import { CHANGE_USER_PASSWORD, CHECK_RECOVERY_CODE, GET_RECOVERY_CODE } from "../../services/apiRoute";

const ForgotPassword = () => {
  const [Step, setStep] = useState(1);
  const [timer, setTimer] = useState(120);
  const [data, setData] = useState({ mobile: "", username: "", tokenID: "" });
  const [loading, setLoading] = useState(false);

  const validation = Yup.object().shape({
    username: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      username: "",
      changePasswordType: {
        id: 1,
        text: "پرسنلی",
      },
      mobile: "",
      tokenID: "",
      authenticationCode: "",
      expireTime: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      postDataToServer(GET_RECOVERY_CODE, {
        username: values.username,
        changePasswordType: {
          id: 1,
          text: "پرسنلی",
        },
      })
        .then((res) => {
          setData(res.data.payload);
          setStep(2);
          setTimer(120);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.errors?.details);
        })
        .finally(() => setLoading(false));
    },
  });

  const handleSecondStep = (auth: any) => {
    setLoading(true);
    postDataToServer(CHECK_RECOVERY_CODE, {
      ...data,
      authenticationCode: auth,
    })
      .then((res) => {
        setStep(3);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleThirdStep = (form: any) => {
    setLoading(true);
    postDataToServer(CHANGE_USER_PASSWORD, {
      ...form,
      username: data.username,
      tokenID: data.tokenID,
      changePasswordType: {
        id: 1,
        text: "پرسنلی",
      },
    })
      .then(() => {
        setStep(4);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="centering bg-[#e5e5e5] h-screen">
      <div className="w-[23rem] h-[23rem] xl:w-[25rem] xl:h-[27rem] bg-white flex-center-start flex-col p-8 rounded-3xl">
        <h1 className="text-center mb-10 mt-5 !font-Julee text-[3.5rem] tracking-[1rem] text-tomato">BOXI</h1>
        {Step === 1 && <FirstStepRecovery formik={formik} loading={loading} />}
        {Step === 2 && (
          <SecondStepRecovery
            phone={data.mobile}
            timer={timer}
            setTimer={setTimer}
            handleSubmit={handleSecondStep}
            handleResendCode={formik.handleSubmit}
            ReturnToFirstStep={() => setStep(1)}
          />
        )}
        {Step === 3 && <ThirdStepRecovery handleChangePass={handleThirdStep} loading={loading} />}
        {Step === 4 && <DoneRecovering />}
      </div>
    </div>
  );
};

export default ForgotPassword;
