import React, { FC } from "react";

interface EditPersonnelProps {
  itemValue: any;
  setMode: (value: "delete" | "edit" | null) => void;
}

const EditPersonnel: FC<EditPersonnelProps> = ({
  itemValue,
  setMode,
}): JSX.Element => {
  return (
    <div className="flex w-full items-center flex-col">
      <div className="flex w-[80%]">
        <h3 className="text-gray-700 font-bold text-lg">ویرایش</h3>
      </div>
      <div></div>
    </div>
  );
};

export default EditPersonnel;
