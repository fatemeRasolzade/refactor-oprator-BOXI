import { useEffect } from "react";
import { setLocale } from "yup";
import {
  DEFINED,
  INVALID,
  NOTTYPE,
  REQUIRED,
  VALIDEMAIL,
} from "../validations/ErrorKeywords";

const YupDefault = () => {
  useEffect(() => {
    setLocale({
      mixed: {
        default: INVALID,
        required: REQUIRED,
        notType: NOTTYPE,
        defined: DEFINED,
      },
      string: {
        email: VALIDEMAIL,
      },
    });
  }, []);
  return null;
};

export default YupDefault;
