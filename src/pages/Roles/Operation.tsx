import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FiAlertCircle } from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import Modal from "../../global/Modal/Modal";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";
import OperationForm from "./OperationForm";
interface OperationProps {
  id: number;
}
const Operation = ({ id }: OperationProps) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [mode, setmode] = useState<"delete" | "edit" | null>(null);
  const deleteHandler = (id: number) => {
    setIsOpenDelete(true);
    setmode("delete");
  };
  const editHandler = (id: number) => {
    setIsOpenDelete(true);
    setmode("edit");
  };
  const editPermissionHandler = (id: number) => {
    setIsOpenDelete(true);
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
      <Dialog open={isOpenDelete} handler={setIsOpenDelete}>
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsOpenDelete(false)}
        >
          <GrFormClose />
        </button>
        <OperationForm setIsOpen={setIsOpenDelete} mode={mode} />
      </Dialog>
    </div>
  );
};

export default Operation;
