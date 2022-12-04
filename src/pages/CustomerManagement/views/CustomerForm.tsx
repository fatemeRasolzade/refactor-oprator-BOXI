import Modal from "../../../global/Modal/Modal";

type CustomerFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  currentData?: any
};

const CustomerForm = ({ open, setOpen, currentData }: CustomerFormProps) => {
  return (
    <Modal visible={open} setVisible={setOpen} title={currentData ? "ویرایش مشتری" : "افزودن مشتری"}>

    </Modal>
  );
};

export default CustomerForm;
