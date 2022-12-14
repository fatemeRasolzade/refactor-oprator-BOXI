import { FC } from "react";

import { BiPlus} from "react-icons/bi";

import { Link } from "react-router-dom";

import { GoDesktopDownload, GoGear } from "react-icons/go";

import CustomSwitch from "./../../global/Switch/Switch";
import SimpleButton from "../../global/SimpleButton/SimpleButton";


interface OptionsTableProps {
  isActive?: boolean;
  setIsActive?: (value: boolean) => void;
  addExcelProps?: () => JSX.Element;
  addComponentProps?: () => JSX.Element;
  customComponent?: () => JSX.Element;
  exportExcel?: any;
  btnLink?: string;
  
}
const OptionsTable: FC<OptionsTableProps> = ({
  btnLink,
  isActive,
  setIsActive,
  addExcelProps,
  addComponentProps,
  customComponent,
  exportExcel,
 
}) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        {/* <AddButton />  */}
        {addComponentProps && <li>{addComponentProps()}</li>}
        {btnLink && (
          <li>
            <Link to={btnLink}>
              <SimpleButton
                text="افزودن"
                className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
                icon={<BiPlus color="white" />}
              />
            </Link>
          </li>
        )}
        {addExcelProps && <li>{addExcelProps()}</li>}

        {customComponent && customComponent()}
        <li>
          <SimpleButton
            handelClick={exportExcel}
            text="خروجی اکسل"
            icon={<GoDesktopDownload color="black" />}
            className="centering rounded-lg text-black w-full"
          />
        </li>
        <li>
          <CustomSwitch
            active={isActive ? isActive : false}
            handleChange={(value: boolean) =>
              setIsActive && setIsActive(value as boolean)
            }
          />
        </li>
        <li>
          <SimpleButton
            text="شخصی سازی"
            icon={<GoGear color="black" />}
            className="centering rounded-lg text-black w-full"
          />
        </li>
      </ul>
    </div>
  );
};

export default OptionsTable;
