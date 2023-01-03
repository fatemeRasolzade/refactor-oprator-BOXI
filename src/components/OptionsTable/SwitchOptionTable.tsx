import { FC } from "react";

import { componentItem } from "../../models/SwitchOptionsModel";

interface accessPageObject {}
interface SwitchOptionTableProps {
  accessPage: Array<accessPageObject>;
}
const SwitchOptionTable: FC<SwitchOptionTableProps> = ({ accessPage }) => {
  return (
    <div className="flex justify-start items-center gap-5 mt-3 flex-wrap">
      {accessPage.map((item: any, index: number) => {
        return <div key={index}>{componentItem[item.code].JSXItem(item.value)}</div>;
      })}
    </div>
  );
};

export default SwitchOptionTable;
