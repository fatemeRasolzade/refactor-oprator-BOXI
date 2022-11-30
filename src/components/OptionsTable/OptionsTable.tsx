import { BiPlus, BiEdit, BiTrash } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { GoDesktopDownload, GoGear } from "react-icons/go";
import CustomSwitch from "./../../global/Switch/Switch";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import AddButton from "../../global/addButton/AddButton";
import { Link} from "react-router-dom";
const OptionsTable = ({exportExcel}:{exportExcel?:any}) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        <li>
          {/* <AddButton />  */}
          <Link to="/hub/add">
          <SimpleButton
            text="افزودن"
            className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
            icon={<BiPlus color="white" />}
          />
          </Link>
        </li>
        <li>
          <SimpleButton
          className=" w-[160px] h-[40px] centering rounded-lg text-black"
            text="افزودن گروهی"
            icon={<GrDocumentPdf color="black" />}
          />
        </li>
        <li>
          <SimpleButton text="ویرایش" className="centering rounded-lg text-black" icon={<BiEdit color="black" />} />
        </li>
        <li>
          <SimpleButton text="حذف" className="centering rounded-lg text-black" icon={<BiTrash color="black" />} />
        </li>
        <li>
          <CustomSwitch />
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
          <SimpleButton text="شخصی سازی" icon={<GoGear color="black" />} className="centering rounded-lg text-black"/>
        </li>
      </ul>
    </div>
  );
};

export default OptionsTable;
