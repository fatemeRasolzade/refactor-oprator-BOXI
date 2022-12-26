import { FC} from "react";
import { GrFormClose } from "react-icons/gr";
import { Dialog } from "@material-tailwind/react";
import { DeleteDataParams } from "../../../../services/Service_call";
import { SuccessAlert } from "../../../../global/alert/Alert";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

interface DeleteOperationProps {
  title: string;
  itemId: number;
  route: string;
  updating?: any;
  handleDeleteActionNewData?: any;
  setIsModalOpenDelete?:any,
  isModalOpenDelete?:any
}
const DeleteModal: FC<DeleteOperationProps> = ({
  title,
  itemId,
  route,
  handleDeleteActionNewData,
  setIsModalOpenDelete,
  isModalOpenDelete
}): JSX.Element => {
 

  const deleteHandler = async (id: number) => {
    try {
      await DeleteDataParams(route);
      SuccessAlert("با موفقیت حذف شد");
      setIsModalOpenDelete(false);
      handleDeleteActionNewData && handleDeleteActionNewData();
    } catch (error) {
        setIsModalOpenDelete(false);
      ErrorAlert("خطایی رخ داده است.");
    }
  };
  return (
    <>
    <Dialog
        open={isModalOpenDelete}
        handler={setIsModalOpenDelete}
        className="min-w-[400px] w-[500px]"
      >
        <button
          className="flex w-[50px] h-[50px]  border-none items-center justify-center"
          onClick={() => setIsModalOpenDelete(false)}
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
                handelClick={() => setIsModalOpenDelete(false)}
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

export default DeleteModal;
function ErrorAlert(arg0: string) {
  throw new Error("Function not implemented.");
}
