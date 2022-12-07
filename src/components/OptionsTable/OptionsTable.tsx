import { FC } from "react";
import { BiPlus, BiEdit, BiTrash } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GoDesktopDownload, GoGear } from "react-icons/go";

import CustomSwitch from "./../../global/Switch/Switch";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import AddButton from "../../global/addButton/AddButton";
import AddExcel from "../exel/AddExcel";

interface OptionsTableProps {
  isActive?: boolean;
  setIsActive?: (value: boolean) => void;
  addExcelProps?: () => JSX.Element;
  addComponentProps?: () => JSX.Element;
  exportExcel?: any;
}
const OptionsTable: FC<OptionsTableProps> = ({
  isActive,
  setIsActive,
  addExcelProps,
  addComponentProps,
  exportExcel,
}) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        <li>
          {/* <AddButton />  */}
          {addComponentProps ? (
            addComponentProps()
          ) : (
            <Link to="/hub/add">
              <SimpleButton
                text="افزودن"
                className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
                icon={<BiPlus color="white" />}
              />
            </Link>
          )}
        </li>
        {addExcelProps && <li>{addExcelProps()}</li>}
        <li>
          <SimpleButton
            text="ویرایش"
            className="centering rounded-lg text-black"
            icon={<BiEdit color="black" />}
          />
        </li>
        <li>
          <SimpleButton
            text="حذف"
            className="centering rounded-lg text-black"
            icon={<BiTrash color="black" />}
          />
        </li>
        <li>
          <CustomSwitch
            active={isActive ? isActive : false}
            handleChange={(value: boolean) => setIsActive && setIsActive(value)}
          />
        </li>
        <li>
          <SimpleButton
            handelClick={exportExcel}
            text="خروجی اکسل"
            icon={<GoDesktopDownload color="black" />}
            className="centering rounded-lg text-black"
          />
        </li>
        <li>
          <SimpleButton
            text="شخصی سازی"
            icon={<GoGear color="black" />}
            className="centering rounded-lg text-black"
          />
        </li>
      </ul>
    </div>
  );
};

export default OptionsTable;
