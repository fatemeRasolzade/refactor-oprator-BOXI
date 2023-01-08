import { Link } from "react-router-dom";
import { AiOutlineFileExcel } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import { IoIosPrint } from "react-icons/io";
import { IoBarcode, IoClose } from "react-icons/io5";
import CustomSwitch from "../global/Switch/Switch";

import SimpleButton from "../global/SimpleButton/SimpleButton";
import AddButton from "../global/addButton/AddButton";
import { HiRefresh } from "react-icons/hi";
import { ExportExcel } from "../tools/functions/ExportMyExcel";
import { MdDriveFileMove } from "react-icons/md";
import { BsArrowDownUp } from "react-icons/bs";
import { ImMap } from "react-icons/im";

interface ComponentItemInterface {
  JSXItem: (value: any) => JSX.Element;
  code: string;
}
export const componentItem: Record<string, ComponentItemInterface> = {
  A1: {
    JSXItem: (value: any) => (
      <SimpleButton className="w-62" handelClick={() => ExportExcel(value)} text="خروجی اکسل" RightIcon={<GoDesktopDownload size={17} />} />
    ),
    code: "A1",
  },
  A2: {
    JSXItem: (value: any) => (
      <>
        {value.ToggleOptions && <AddButton ToggleOptions={value.ToggleOptions} />}
        {value.to && (
          <Link to={value.to}>
            <SimpleButton text="افزودن" className="full-tomato-btn w-[160px]" icon={<BiPlus color="white" />} />
          </Link>
        )}
      </>
    ),
    code: "A2",
  },
  A3: {
    JSXItem: (value: any) => <CustomSwitch active={value.data} handleChange={value.action} />,
    code: "A3",
  },
  A4: {
    JSXItem: (options: any) => (
      <AddButton text="اسکن ورود در هاب" ToggleOptions={options} className="!btn gap-2" WrapperClassName="w-62" RightIcon={<IoBarcode size={22} />} />
    ),
    code: "A4",
  },
  A5: {
    JSXItem: (options: any) => (
      <AddButton text="اسکن خروج از هاب" ToggleOptions={options} className="!btn gap-2" WrapperClassName="w-62" RightIcon={<IoBarcode size={22} />} />
    ),
    code: "A5",
  },
  A6: {
    JSXItem: (options: any) => (
      <AddButton text="چاپ برچسب" ToggleOptions={options} className="!btn gap-2" WrapperClassName="w-62" RightIcon={<IoIosPrint size={20} />} />
    ),
    code: "A5",
  },
  A7: {
    JSXItem: () => <SimpleButton text="افزودن گروهی" RightIcon={<AiOutlineFileExcel size={20} />} />,
    code: "A4",
  },
  A8: {
    JSXItem: (options: any) => (
      <AddButton text="لغو" ToggleOptions={options} className="!btn gap-2" WrapperClassName="w-62" RightIcon={<IoClose size={20} />} />
    ),
    code: "A5",
  },
  A9: {
    JSXItem: (action: any) => (
      <SimpleButton
        className="w-62"
        handelClick={() => action.fetch()}
        text="دریافت اطلاعات بیشتر"
        RightIcon={
          <HiRefresh className={`${action.loading ? "loading-spinner" : ""}`} />
        }
      />
    ),
    code: "A9",
  },
  A10: {
    JSXItem: (options: any) => (
      <AddButton
        text="تخصیص به راننده"
        ToggleOptions={options}
        className="!btn gap-2"
        WrapperClassName="w-62"
        RightIcon={<MdDriveFileMove size={18} />}
      />
    ),
    code: "A10",
  },
  A11: {
    JSXItem: (handelClick) => <SimpleButton handelClick={handelClick} text="تخصیص خودکار" RightIcon={<MdDriveFileMove size={22} />} />,
    code: "A11",
  },
  A12: {
    JSXItem: (handelClick) => <SimpleButton handelClick={handelClick} text="تغییر هاب جمع آوری" RightIcon={<BsArrowDownUp size={17} />} />,
    code: "A12",
  },
  A13: {
    JSXItem: (handelClick) => <SimpleButton handelClick={handelClick} text="نمایش روی نقشه" RightIcon={<ImMap size={17} />} />,
    code: "A13",
  },
};
//
