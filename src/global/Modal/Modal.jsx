import Rodal from "rodal";

const Modal = ({ visible, setVisible, children, width, height }) => {
  return (
    <div>
      <Rodal
        visible={visible}
        onClose={() => setVisible(false)}
        // width={width}
        // height={height}
        measure={60}
        closeOnEsc
      >
        <div className=" w-full h-full ">{children}</div>
      </Rodal>
    </div>
  );
};

export default Modal;
