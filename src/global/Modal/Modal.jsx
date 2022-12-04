import { Dialog } from "@material-tailwind/react";
import { BiXCircle } from "react-icons/bi";

const Modal = ({ visible, setVisible, children, title }) => {
  return (
    <Dialog
      open={visible}
      handler={setVisible}
      className={
        "inline-block align-bottom bg-white rounded-[30px]   p-3  shadow-xl transform transition-all sm:align-middle"
      }
    >
      <div className="flex-between-center mb-6">
        <span className="text-dark">{title}</span>{" "}
        <BiXCircle
          size={25}
          className="text-dark cursor-pointer"
          onClick={() => setVisible(false)}
        />
      </div>
      <div>{children}</div>
    </Dialog>
  );
};

export default Modal;
