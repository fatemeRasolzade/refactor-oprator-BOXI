import { useEffect } from "react";
import { setLocale } from "yup";
import {
  DEFINED,
  INVALID,
  MAXCHAR,
  MINCHAR,
  NOTTYPE,
  REQUIRED,
  VALIDEMAIL,
} from "../validations/RegexKeywords";

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
        min: MINCHAR,
        max: MAXCHAR,
        email: VALIDEMAIL,
      },
    });
  }, []);
  return null;
};

export default YupDefault;
