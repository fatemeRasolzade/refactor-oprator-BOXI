import { GoDesktopDownload } from "react-icons/go";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../../global/Switch/Switch";


interface propsData {
  setIsActive?: (value: boolean) => void;
  isActive: boolean;
  addComponentProps?: () => JSX.Element;
  exportExcel: () => void;
}

const OptionsTable = ({ setIsActive, addComponentProps, exportExcel, isActive }: propsData) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-6 justify-start items-center flex-wrap">

          <li>
            {addComponentProps ? addComponentProps() : ""}
            {/*<AddButton   />*/}
            {/* <SimpleButton text="افزودن" className="full-tomato-btn" icon={<BiPlus color="white" />} /> */}
          </li>
          <li>
            <SimpleButton
                handelClick={exportExcel}
                text="خروجی اکسل"
                icon={<GoDesktopDownload color="black" />}
                className="centering rounded-lg text-black w-full"
            />
          </li>
         


      </ul>
    </div>
  );
};

export default OptionsTable;
