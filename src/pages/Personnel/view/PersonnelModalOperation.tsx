import { Button } from "@material-tailwind/react";
import React, { FC } from "react";

import DeleteOperation from "../../../components/tableOperation/DeleteOperation";
import { updating } from "../../../redux/PersonData/PersonsData";
import { apiRoute } from "../../../services/apiRoute";
import EditPersonnel from "./EditPersonnel";

interface ModalOperationProps {
  itemValue: any;
  type: "delete" | "edit" | null;
  setOnClose: (value: boolean) => void;
  setMode: (value: "delete" | "edit" | null) => void;
}

const PersonnelModalOperation: FC<ModalOperationProps> = ({
  type,
  itemValue,
  setOnClose,
  setMode,
}): JSX.Element => {
  switch (type) {
    case "edit":
      return <EditPersonnel setMode={setMode} itemValue={itemValue} />;

    case "delete":
      return (
        <DeleteOperation
          title="حذف پرسنل"
          itemId={itemValue.id}
          route={apiRoute().delete.personnel + `/${itemValue.id}`}
          updating={updating}
          setOnClose={setOnClose}
          setMode={setMode}
        />
      );
    default:
      return <></>;
  }
};

export default PersonnelModalOperation;
