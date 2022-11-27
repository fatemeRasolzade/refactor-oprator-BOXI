import { FC, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";

import Modal from "../../../global/Modal/Modal";
import ModalOperation from "./ModalOperation";

interface OperationProps {
  id: number;
}
const Operation: FC<OperationProps> = ({ id }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"delete" | "edit" | null>(null);

  const deleteHandler = (id: number) => {
    setIsModalOpen(true);
    setMode("delete");
  };

  const editHandler = (id: number) => {
    setIsModalOpen(true);
    setMode("edit");
  };

  const editPermissionHandler = (id: number) => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex w-full gap-3 justify-center">
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px] "
        onClick={() => editHandler(id)}
      >
        <MdEditNote className="w-full h-full" />
      </button>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px]"
        onClick={() => deleteHandler(id)}
      >
        <AiFillDelete className="w-full h-full	" />
      </button>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px]"
        onClick={() => editPermissionHandler(id)}
      >
        <AiFillEdit className="w-full h-full" />
      </button>
      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        {ModalOperation({
          type: mode,
          itemId: 1,
          setOnClose: (value) => setIsModalOpen(value),
        })}
      </Dialog>
    </div>
  );
};

export default Operation;
