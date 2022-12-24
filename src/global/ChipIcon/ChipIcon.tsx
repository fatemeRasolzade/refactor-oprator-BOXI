import { Chip } from "@material-tailwind/react";
import React, { useState } from "react";

const ChipIcon = ({
  text,
  value,
  setDelete,
}: {
  text?: string | undefined;
  value?: string;
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
            setShow(false);
            setDelete && setDelete(value ? value : "");
          },
        }}
        value={`${text}`}
      />
    </>
  );
};

export default ChipIcon;
