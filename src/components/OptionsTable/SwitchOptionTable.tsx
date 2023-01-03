import { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import AddButton from "../../global/addButton/AddButton";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import { componentItem } from "../../models/SwitchOptionsModel";

interface accessPageObject {}
interface SwitchOptionTableProps {
  accessPage: Array<accessPageObject>;
}
const SwitchOptionTable: FC<SwitchOptionTableProps> = ({ accessPage }) => {
  return (
    <div className="flex justify-start items-center gap-5">
      {accessPage.map((item: any, index: number) => {
        return (
          <div key={index}>{componentItem[item.code].JSXItem(item.value)}</div>
        );
      })}
    </div>
  );
};

export default SwitchOptionTable;
