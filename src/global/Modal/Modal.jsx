import Rodal from "rodal";
import { BiXCircle } from "react-icons/bi";

const Modal = ({ visible, setVisible, children, title }) => {
  return (
    <Rodal
      className="flex-rodal"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <div className="inline-block align-bottom bg-white rounded-xl p-5 shadow-lg transition sm:align-middle z-20">
        <div className="flex-between-center mb-7">
          <span className="text-dark text-base">{title}</span>
          <BiXCircle
            size={25}
            className="text-darkGray cursor-pointer"
            onClick={() => setVisible(false)}
          />
        </div>
        {children}
      </div>
    </Rodal>
  );
};

export default Modal;
