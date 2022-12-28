import { useEffect, useState, useRef } from "react";
import PrivateCodeElements from "./PrivateCodeElements";

const SecondStepRecovery = ({ phone, timer, setTimer, handleSubmit, ReturnToFirstStep, handleResendCode }: any) => {
  const [privateCode, setPrivateCode] = useState<any>("");

  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (timer === 0) {
        clearInterval(timerInterval);
      }
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [setTimer, timer]);

  const handleChangeCode = (e: any) => {
    if (e.target.value.length <= 5) {
      setPrivateCode(e.target.value);
    }
    if (e.target.value.length === 5) {
      handleSubmit(e.target.value);
      setPrivateCode("");
    }
  };

  const ResendCode = () => {
    setTimer(120);
    handleResendCode();
  };

  const InputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (InputRef && InputRef.current) {
      InputRef.current?.focus(); // property 'focus' does not exist on type 'never'
    }
  };

  return (
    <div>
      <p className=" text-center ">{` کد ارسال شده به شماره زیر را وارد کنید`}</p>
      <p dir="ltr" className="text-center text-2xl mt-2">
        {phone}
      </p>
      <p className="text-sm mt-2 text-center w-full">
        کد ارسال نشد؟
        {timer > 0 ? (
          <span className="text-yellow"> {timer} ثانیه تا ارسال مجدد کد </span>
        ) : (
          <span onClick={ResendCode} className="text-tomato cursor-pointer">
            {" "}
            ارسال مجدد کد
          </span>
        )}
      </p>
      <div className="flex justify-center flex-row-reverse items-center gap-3 w-full mt-6" onClick={handleFocus}>
        {new Array(5).fill("").map((c, i) => (
          <>
            <PrivateCodeElements index={i} privateCode={privateCode} />
          </>
        ))}
      </div>
      <input autoFocus value={privateCode} onChange={handleChangeCode} className="opacity-0" ref={InputRef} />
      <p className="text-center text-sm mt-7">
        شماره همراه اشتباه است؟
        <span className="text-tomato mt-2 cursor-pointer" onClick={ReturnToFirstStep}>
          {" "}
          اصلاح شماره همراه{" "}
        </span>
      </p>
    </div>
  );
};

export default SecondStepRecovery;
