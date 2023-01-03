import { FC } from "react";
import { AiOutlineFileExcel } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import { IoIosPrint } from "react-icons/io";
import { IoBarcode, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import AddButton from "../../global/addButton/AddButton";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../global/Switch/Switch";
import { ExportExcel } from "../../tools/functions/Methods";

interface accessPageObject {}
interface SwitchOptionTableProps {
  accessPage: Array<accessPageObject>;
}
const SwitchOptionTable: FC<SwitchOptionTableProps> = ({ accessPage }) => {
  return (
    <div className="flex justify-start items-center gap-5 mt-3 flex-wrap">
      {accessPage.map((item: any, index: number) => {
        return <div key={index}>{componentItem[item.code].JSXItem(item.value)}</div>;
      })}
    </div>
  );
};

export default SwitchOptionTable;
const componentItem: any = {
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
  A7: { JSXItem: () => <SimpleButton text="افزودن گروهی" RightIcon={<AiOutlineFileExcel size={20} />} />, code: "A4" },
  A8: {
    JSXItem: (options: any) => (
      <AddButton text="لغو" ToggleOptions={options} className="!btn gap-2" WrapperClassName="w-62" RightIcon={<IoClose size={20} />} />
    ),
    code: "A5",
  },
};
