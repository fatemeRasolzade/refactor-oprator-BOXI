import { Button } from "@material-tailwind/react";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import DeleteOperation from "../../../components/tableOperation/DeleteOperation";
import { updating } from "../../../redux/RolsData/RolesData";
import { apiRoute } from "../../../services/apiRoute";

interface ModalOperationProps {
  itemValue: any;
  type: "delete" | "edit" | null;
  setOnClose: (value: boolean) => void;
  setMode: (value: "delete" | "edit" | null) => void;
}

const ModalOperation: FC<ModalOperationProps> = ({
  type,
  itemValue,
  setOnClose,
  setMode,
}): JSX.Element => {
  switch (type) {
    case "delete":
      return (
        <></>
        // <DeleteOperation
        //   title="حذف نقش"
        //   itemId={itemValue.id}
        //   route={apiRoute().delete.role + `/${itemValue.id}`}
        //   updating={updating}
        //   setOnClose={setOnClose}
        //   setMode={setMode}
        // />
      );

    case "edit":
      return <EditOperation />;

    default:
      return <></>;
  }
};

export default ModalOperation;

const EditOperation = () => {
  return <></>;
};
