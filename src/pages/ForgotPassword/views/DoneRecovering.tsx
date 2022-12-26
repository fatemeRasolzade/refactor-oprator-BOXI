import { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const DoneRecovering = () => {
  useEffect(() => {
    let timer = setTimeout(() => {
      // push to login page
      // window.location.href = "boxi.local/index";
      // window.location.replace("boxi.local/index");
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="centering flex-col">
      <AiOutlineCheckCircle size={200} className="text-tomato" />
      <p className="text-base mt-5"> تغییر رمز عبور با موفقیت انجام شد</p>
    </div>
  );
};

export default DoneRecovering;
