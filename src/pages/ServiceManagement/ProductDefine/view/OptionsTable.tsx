import { BiPlus, BiEdit, BiTrash } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { GoDesktopDownload, GoGear } from "react-icons/go";
import CustomSwitch from "../../../../global/Switch/Switch";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import AddButton from "./AddButton";

interface propsData {
  formData?: any,
  setIsACtive?:any,
  isActive:Boolean
}

const OptionsTable = ({ formData,setIsACtive,isActive }: propsData) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        <>
          <li>
            <AddButton   />
            {/* <SimpleButton text="افزودن" className="full-tomato-btn" icon={<BiPlus color="white" />} /> */}
          </li>
          <li>
            <CustomSwitch handleChange={(value:any)=>setIsACtive(value)} />
          </li>
        </>
      </ul>
    </div>
  );
};

export default OptionsTable;
