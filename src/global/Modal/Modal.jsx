import Rodal from "rodal";

const Modal = ({ visible, setVisible, children, width, height}) => {
  return (
    <div>
      <Rodal
        visible={visible}
        onClose={() => setVisible(false)}
        width={width}
        height={height}
        closeOnEsc
       
      >
        <div className="pt-6">{children}</div>
      </Rodal>
    </div>
  );
};

export default Modal;