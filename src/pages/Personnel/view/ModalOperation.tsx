import { Button } from "@material-tailwind/react";
import React, { FC } from "react";

import DeleteOperation from "../../../components/tableOperation/DeleteOperation";
import { updating } from "../../../redux/PersonData/PersonsData";
import { apiRoute } from "../../../services/apiRoute";

interface ModalOperationProps {
  itemId: number;
  type: "delete" | "edit" | null;
  setOnClose: (value: boolean) => void;
  setMode: (value: "delete" | "edit" | null) => void;
}

const ModalOperation: FC<ModalOperationProps> = ({
  type,
  itemId,
  setOnClose,
  setMode,
}): JSX.Element => {
  switch (type) {
    case "delete":
      return (
        <DeleteOperation
          title="حذف پرسنل"
          itemId={itemId}
          route={apiRoute().delete.personnel + `/${itemId}`}
          updating={updating}
          setOnClose={setOnClose}
          setMode={setMode}
        />
      );
    default:
      return <></>;
  }
};

export default ModalOperation;
