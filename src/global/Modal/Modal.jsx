import { Dialog } from "@material-tailwind/react";
import { BiXCircle } from "react-icons/bi";

const Modal = ({ visible, setVisible, children, title }) => {
  return (
    <Dialog
      open={visible}
      handler={setVisible}
      className={"overflow-visible p-5"}
    >
      <div className="flex-between-center">
        <span className="text-dark">{title}</span>{" "}
        <BiXCircle size={25} className="text-dark" />
      </div>
      <div>{children}</div>
    </Dialog>
  );
};

export default Modal;
