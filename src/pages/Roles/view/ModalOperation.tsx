import { Button } from "@material-tailwind/react";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updating } from "../../../redux/RolsData/RolesData";
import { apiRoute } from "../../../services/apiRoute";
import { DeleteDataParams } from "../../../services/Service_call";

interface ModalOperationProps {
  itemId: number;
  type: "delete" | "edit" | null;
  setOnClose: (value: boolean) => void;
}

const ModalOperation: FC<ModalOperationProps> = ({
  type,
  itemId,
  setOnClose,
}): JSX.Element => {
  switch (type) {
    case "delete":
      return <DeleteOperation setOnClose={setOnClose} itemId={itemId} />;

    case "edit":
      return <EditOperation />;

    default:
      return <></>;
  }
};

export default ModalOperation;
interface DeleteOperationProps {
  itemId: number;
  setOnClose: (value: boolean) => void;
}
const DeleteOperation: FC<DeleteOperationProps> = ({ itemId, setOnClose }) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id: number) => {
    try {
      dispatch(updating(true));
      await DeleteDataParams(apiRoute().delete.role + `/${itemId}`);
      dispatch(updating(false));
      setOnClose(false);
    } catch (error) {
      dispatch(updating(false));
    }
  };
  return (
    <div className="flex w-full flex-col items-center gap-6 mb-6">
      <div className="w-full justify-center flex">
        <h3 className="text-gray-700 font-bold text-lg">حذف نقش</h3>
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
const EditOperation = () => {
  return <></>;
};
