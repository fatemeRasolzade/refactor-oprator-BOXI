import { useEffect } from "react";
import { setLocale } from "yup";

const YupDefault = () => {
  useEffect(() => {
    setLocale({
      mixed: {
        default: "نامعتبر است",
        required: "اجباری است",
        notType: "نوع ورودی نامعتبر است",
        defined: "باید تعریف شود",
      },
    });
  }, []);
  return null;
};

export default YupDefault;
