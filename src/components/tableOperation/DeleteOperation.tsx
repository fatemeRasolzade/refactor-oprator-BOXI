import React, { FC } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { DeleteDataParams } from "../../services/Service_call";

interface DeleteOperationProps {
  title: string;
  itemId: number;
  route: string;
  setOnClose: (value: boolean) => void;
  updating: any;
  setMode: (value: "delete" | "edit" | null) => void;
}
const DeleteOperation: FC<DeleteOperationProps> = ({
  title,
  itemId,
  route,
  setOnClose,
  updating,
  setMode,
}): JSX.Element => {
  const dispatch = useDispatch();

  const deleteHandler = async (id: number) => {
    try {
      dispatch(updating(true));
      await DeleteDataParams(route);
      dispatch(updating(false));
      setOnClose(false);
      setMode(null);
    } catch (error) {
      dispatch(updating(false));
    }
  };
  return (
    <div className="flex w-full flex-col items-center gap-6 mb-6">
      <div className="w-full justify-center flex">
        <h3 className="text-gray-700 font-bold text-lg">{title}</h3>
      </div>
      <p className="w-full flex justify-center">
        آیا از حذف این مورد اطمینان دارید؟
      </p>
      <div className="flex w-full justify-center gap-4">
        <Button
          className="border-none bg-[#E41020]  text-gray-200"
          onClick={() => deleteHandler(itemId)}
        >
          بله
        </Button>
        <Button
          className="border-none bg-[#FFF8F0] text-gray-500"
          onClick={() => setOnClose(false)}
        >
          خیر
        </Button>
      </div>
    </div>
  );
};

export default DeleteOperation;
