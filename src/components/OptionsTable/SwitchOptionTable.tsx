import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../global/Switch/Switch";
import { ExportExcel } from "../../tools/functions/Methods";

interface SwitchOptionTableProps {
  accessPage: Array<string>;
}
const SwitchOptionTable: FC<SwitchOptionTableProps> = ({ accessPage }) => {
  const componentItem: any = {
    A1: {
      JSXItem: (
        <SimpleButton
          handelClick={() => ExportExcel([])}
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
      JSXItem: (
        <>
          <CustomSwitch
            active={false}
            handleChange={(value: boolean) => console.log()}
          />
        </>
      ),
      code: "A3",
    },
  };
  return (
    <div>
      {accessPage.map((item: string, index: number) => {
        return <div key={index}>{componentItem[item].JSXItem}</div>;
      })}
    </div>
  );
};

export default SwitchOptionTable;
