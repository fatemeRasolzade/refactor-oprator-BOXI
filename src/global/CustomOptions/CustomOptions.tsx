import { GoGear } from "react-icons/go";
import CustomSwitch from "../Switch/Switch";
import { GrDocumentPdf } from "react-icons/gr";
import { HiFolderDownload } from "react-icons/hi";
import SimpleButton from "../SimpleButton/SimpleButton";
import {
  ACTIVE_OPTION,
  ADD_EXCEL_OPTION,
  CUSTOMIZATION_OPTION,
  DOWNLOAD_OPTION,
} from "./CustomOptionsKeyword";

const CustomOptions = ({ options = [] }: any) => {
  const SwitchOptions = (type: {name: any, handleClick: () => void, value?: boolean}) => {
    switch (type.name) {
      case ADD_EXCEL_OPTION:
        return (
          <SimpleButton
            text="افزودن گروهی "
            icon={<GrDocumentPdf color="black" />}
            handelClick={type.handleClick}
          />
        );
      case ACTIVE_OPTION:
        return (
          <CustomSwitch active={type?.value} handleChange={type.handleClick} />
        );
      case DOWNLOAD_OPTION:
        return (
          <SimpleButton
            text="دانلود"
            icon={<HiFolderDownload />}
            handelClick={type.handleClick}
          />
        );
      case CUSTOMIZATION_OPTION:
        return (
          <SimpleButton
            text="شخصی سازی"
            icon={<GoGear color="black" />}
            handelClick={type.handleClick}
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="flex-start-center gap-10">
      {options.map((item: any) => SwitchOptions(item))}
    </div>
  );
};

export default CustomOptions;
