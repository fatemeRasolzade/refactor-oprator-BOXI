import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";
import { Dialog } from "@material-tailwind/react";
import { GrFormClose } from "react-icons/gr";
import OperationForm from "./OperationForm";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
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
      <SimpleButton icon={<MdEditNote />} handelClick={() => editHandler(id)} />
      <SimpleButton
        icon={<AiFillDelete />}
        handelClick={() => deleteHandler(id)}
      />
      <SimpleButton
        icon={<AiFillEdit />}
        handelClick={() => editPermissionHandler(id)}
      />
      <Dialog open={isOpenDelete} handler={setIsOpenDelete}>
        <SimpleButton
          icon={<GrFormClose />}
          handelClick={() => setIsOpenDelete(false)}
        />
        <OperationForm setIsOpen={setIsOpenDelete} mode={mode} />
      </Dialog>
    </div>
  );
};

export default Operation;
