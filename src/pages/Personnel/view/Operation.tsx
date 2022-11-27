import React, { FC, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";

import ModalOperation from "./ModalOperation";

interface OperationProps {
  itemValue: any;
}
const Operation: FC<OperationProps> = ({ itemValue }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"delete" | "edit" | null>(null);

  const deleteHandler = () => {
    setIsModalOpen(true);
    setMode("delete");
  };

  const editHandler = () => {
    setIsModalOpen(true);
    setMode("edit");
  };

  return (
    <div className="flex w-full gap-3 justify-center">
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px] "
        onClick={() => editHandler()}
      >
        <AiOutlineEdit className="w-full h-full" />
      </button>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px]"
        onClick={() => deleteHandler()}
      >
        <BiTrash className="w-full h-full	" />
      </button>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px]"
        onClick={() => deleteHandler()}
      >
        <BsKey className="w-full h-full" />
      </button>
      {/* modal  */}
      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => {
            setIsModalOpen(false);
            setMode(null);
          }}
        >
          <GrFormClose />
        </button>
        {ModalOperation({
          type: mode,
          itemValue: itemValue,
          setMode: (value) => setMode(value),
          setOnClose: (value) => setIsModalOpen(value),
        })}
      </Dialog>
    </div>
  );
};

export default Operation;
