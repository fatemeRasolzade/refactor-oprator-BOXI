import React, { useState } from "react";
import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
interface EditPersonRoleProps {
  currentData?: any;
}
const EditPersonRole: FC<EditPersonRoleProps> = ({ currentData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px] "
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <AiOutlineEdit className="w-full h-full" />
      </button>
    </div>
  );
};

export default EditPersonRole;
