import { BiPlus, BiEdit, BiTrash } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { GoDesktopDownload, GoGear } from "react-icons/go";
import CustomSwitch from "../../../../global/Switch/Switch";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

import { useNavigate } from "react-router-dom";
import AddButton from "../../../../pages/ServiceManagement/ServiceDefinition/view/AddButton";

interface propsData {
  actions?: any;
}

const OptionsTable = ({ actions }: propsData) => {
  return (
    <div className="mt-6">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        <>
          <li>
            <AddButton />
            {/* <SimpleButton text="افزودن" className="full-tomato-btn" icon={<BiPlus color="white" />} /> */}
          </li>
          <li>
            <SimpleButton
              text="افزودن گروهی"
              icon={<GrDocumentPdf color="black" />}
            />
          </li>
          <li>
            <SimpleButton text="ویرایش" icon={<BiEdit color="black" />} />
          </li>
          <li>
            <SimpleButton text="حذف" icon={<BiTrash color="black" />} />
          </li>
          <li>
            <CustomSwitch
              active={true}
              handleChange={(checked: boolean) =>
                console.log("isactive", checked)
              }
            />
          </li>
          <li>
            <SimpleButton
              text="خروجی اکسل"
              icon={<GoDesktopDownload color="black" />}
            />
          </li>
          <li>
            <SimpleButton text="شخصی سازی" icon={<GoGear color="black" />} />
          </li>
        </>
      </ul>
    </div>
  );
};

export default OptionsTable;
