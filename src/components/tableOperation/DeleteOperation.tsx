import React, { FC, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { DeleteDataParams } from "../../services/Service_call";
import { BiTrash } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

interface DeleteOperationProps {
  title: string;
  itemId: number;
  route: string;
  updating?: any;
}
const DeleteOperation: FC<DeleteOperationProps> = ({
  title,
  itemId,
  route,
  updating,
}): JSX.Element => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = async (id: number) => {
    try {
      dispatch(updating(true));
      await DeleteDataParams(route);
      setIsModalOpen(false);
      dispatch(updating(false));
    } catch (error) {
      dispatch(updating(false));
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px]"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <BiTrash className="w-full h-full	" />
      </button>
      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <GrFormClose />
        </button>
        <div className="flex  justify-center  mb-6">
          <div className="flex flex-col  w-[80%] gap-6">
            <div className="w-full justify-center flex">
              <h3 className="text-gray-700 font-bold text-lg">{title}</h3>
            </div>
            <p className="w-full flex justify-center">
              آیا از حذف این مورد اطمینان دارید؟
            </p>
            <div className="flex w-full justify-center gap-4">
              <Button
                className="border-none bg-[#ef5644] w-[30%] text-gray-200"
                onClick={() => deleteHandler(itemId)}
              >
                بله
              </Button>
              <Button
                className="border-none bg-[#FFF8F0] w-[30%] text-gray-500"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                خیر
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteOperation;
