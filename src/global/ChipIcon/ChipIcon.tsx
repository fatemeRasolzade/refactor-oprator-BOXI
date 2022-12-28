import { Chip } from "@material-tailwind/react";
import React, { useState } from "react";

const ChipIcon = ({
  text,
  value,
  isRequire,
  id,
  setDelete,
}: {
  text?: string | undefined;
  value?: string;
  isRequire?: boolean;
  id: string;
  setDelete?: (value: string) => void;
}) => {
  const [show, setShow] = useState(true);
  return (
    <>
      <Chip
        className="bg-gray-100 text-dark w-full  my-1 chips"
        show={show}
        animate={{
          mount: { y: 0 },
          unmount: { y: 50 },
        }}
        dismissible={{
          onClose: () => {
            !isRequire && setShow(false);
            setDelete && setDelete(id);
          },
        }}
        value={`${text}`}
      />
    </>
  );
};

export default ChipIcon;
