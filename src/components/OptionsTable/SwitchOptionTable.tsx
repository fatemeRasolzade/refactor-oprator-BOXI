import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../global/Switch/Switch";
import { ExportExcel } from "../../tools/functions/Methods";

interface SwitchOptionTableProps {
  accessPage: Array<any>;
}
const SwitchOptionTable: FC<SwitchOptionTableProps> = ({ accessPage }) => {
  return (
    <div>
      {accessPage.map((item: any, index: number) => {
        return (
          <div key={index}>{componentItem[item.code].JSXItem(item.value)}</div>
        );
      })}
    </div>
  );
};

export default SwitchOptionTable;
const componentItem: any = {
  A1: {
    JSXItem: (value: any) => (
      <SimpleButton
        handelClick={() => ExportExcel(value)}
        text="خروجی اکسل"
        icon={<GoDesktopDownload color="black" />}
        className="centering rounded-lg text-black w-full"
      />
    ),
    code: "A1",
  },
  A2: {
    JSXItem: (
      <>
        <Link to={""}>
          <SimpleButton
            text="افزودن"
            className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
            icon={<BiPlus color="white" />}
          />
        </Link>
      </>
    ),
    code: "A2",
  },
  A3: {
    JSXItem: (value: any) => (
      <>
        <CustomSwitch active={value.data} handleChange={value.action} />
      </>
    ),
    code: "A3",
  },
};
