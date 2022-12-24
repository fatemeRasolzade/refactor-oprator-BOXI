import { Chip } from "@material-tailwind/react";
import React, { FC, useCallback, useState } from "react";
import ChipIcon from "../../../../../global/ChipIcon/ChipIcon";
import InputIcon from "../../../../../global/InputIcon/InputIcon";
import Checkbox from "./../../../../../components/checkbox/Checkbox";
interface SelectedColInterface {
  accessor: string;
  Header: string;
}
interface ColumnsTableProps {
  columns: Array<SelectedColInterface>;
  selectedCol: Array<SelectedColInterface>;
  setSelectedCol: (selectedCol: Array<SelectedColInterface>) => void;
}

const ColumnsTable: FC<ColumnsTableProps> = ({
  columns,
  selectedCol,
  setSelectedCol,
}) => {
  const addvalueHandler = useCallback((value: any, isCheck: boolean) => {
    if (isCheck) {
      setSelectedCol([...selectedCol, value]);
    }
  }, [selectedCol, setSelectedCol]);
  console.log("selectedCol", selectedCol);

  return (
    <div>
      <h4>
        .در اینجا می توانید بر اساس نیاز خود ، انتخاب کنید که کدام یک از ستون
        های جدول نمایش داده شوند .با کلیک بر روی فلش های ستون های انتخاب شده ،
        میتوانید ترتیب ستون های جدول را تغییر دهید
      </h4>

      <div className="w-full flex justify-center items-start mt-4">
        <div className="flex-1 max-h-[300px] overflow-auto p-3">
          <h4 className="mb-4">تمام ستون ها</h4>
          <InputIcon text="جستجو" />
          <div className="mt-3">
            {columns.map((items, index) => {
              return (
                <React.Fragment key={index}>
                  <Checkbox
                    title={items.Header}
                    values={
                      selectedCol
                        .map((e) => e.accessor)
                        .indexOf(items.accessor) >= 0
                    }
                    handleChange={(e) =>
                      addvalueHandler(items, e.target.checked)
                    }
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="flex-1 max-h-[300px] overflow-auto p-3">
          <h4 className="mb-4">ستون های انتخاب شده</h4>
          <InputIcon text="جستجو" />
          <div className="mt-3">
            {selectedCol.map((items, index) => {
              return (
                <React.Fragment key={index}>
                  <ChipIcon
                    text={items.Header}
                    value={items.accessor}
                    setDelete={(value: string) =>
                      setSelectedCol(
                        selectedCol.filter((item) => item.accessor !== value)
                      )
                    }
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnsTable;
