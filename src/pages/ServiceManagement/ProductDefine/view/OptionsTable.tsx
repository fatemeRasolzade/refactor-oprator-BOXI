import { GoDesktopDownload } from "react-icons/go";
import CustomSwitch from "../../../../global/Switch/Switch";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

interface propsData {
  setIsACtive?: (value: boolean) => void;
  isActive: Boolean | string;
  addComponentProps?: () => JSX.Element;
  exportExcel: () => void;
}

const OptionsTable = ({
  setIsACtive,
  addComponentProps,
  exportExcel,
}: propsData) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        <>
          <li>
            {addComponentProps ? addComponentProps() : ""}
            {/*<AddButton   />*/}
            {/* <SimpleButton text="افزودن" className="full-tomato-btn" icon={<BiPlus color="white" />} /> */}
          </li>
          <li>
            <CustomSwitch
              active={true}
              handleChange={(value: boolean) =>
                setIsACtive && setIsACtive(value)
              }
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
        </>
      </ul>
    </div>
  );
};

export default OptionsTable;
