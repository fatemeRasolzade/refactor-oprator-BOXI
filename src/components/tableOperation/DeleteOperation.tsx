import { FC, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { Dialog } from "@material-tailwind/react";
import { SuccessAlert } from "../../global/alert/Alert";
import { DeleteDataParams } from "../../services/Service_call";
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
              <h3 className="text-darkGray font-bold text-lg">{title}</h3>
            </div>
            <p className="w-full flex justify-center">
              آیا از حذف این مورد اطمینان دارید؟
            </p>
            <div className="flex w-full justify-center gap-4">
              <SimpleButton
                type="submit"
                text="خیر"
                className="full-lightTomato-btn w-28 "
                handelClick={() => setIsModalOpen(false)}
              />
              <SimpleButton
                type="submit"
                text="بله"
                className="full-tomato-btn w-28 "
                handelClick={() => deleteHandler(itemId)}
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
