import React, { FC, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { DeleteDataParams } from "../../services/Service_call";
import { BiTrash } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { SuccessAlert } from "../../global/alert/Alert";
import SimpleButton from "../../global/SimpleButton/SimpleButton";

interface DeleteOperationProps {
  title: string;
  itemId: number;
  route: string;
  updating?: any;
  handleDeleteActionNewData?: any;
}
const DeleteOperation: FC<DeleteOperationProps> = ({
  title,
  itemId,
  route,
  updating,
  handleDeleteActionNewData,
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = async (id: number) => {
    try {
      await DeleteDataParams(route);
      SuccessAlert("با موفقیت حذف شد");
      setIsModalOpen(false);
      handleDeleteActionNewData && handleDeleteActionNewData();
    } catch (error) {
      setIsModalOpen(false);
      ErrorAlert("خطایی رخ داده است.");
    }
  };
  return (
    <>
      <button
        className=" border-none	text-[14px]  w-[20px] h-[20px]"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <BiTrash size={20} className="w-full h-full	" />
      </button>
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="min-w-[400px] w-[500px]"
      >
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
              <SimpleButton
                type="submit"
                text="بله"
                className="full-tomato-btn px-[50px] "
                handelClick={() => deleteHandler(itemId)}
              />
              <SimpleButton
                type="submit"
                text="خیر"
                className="full-lightTomato-btn px-[50px] "
                handelClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteOperation;
function ErrorAlert(arg0: string) {
  throw new Error("Function not implemented.");
}
