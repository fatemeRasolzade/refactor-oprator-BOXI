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

const TestCustomOptions = ({ options = [] }) => {
  const SwitchOptions = (type) => {
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
        return <CustomSwitch />;
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
    <div className="flex-start-center gap-2">
      {options.map((item) => SwitchOptions(item))}
    </div>
  );
};

export default TestCustomOptions;
