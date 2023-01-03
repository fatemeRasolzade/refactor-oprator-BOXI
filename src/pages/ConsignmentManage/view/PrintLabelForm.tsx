import InputText from "../../../global/InputText/InputText";
import Modal from "../../../global/Modal/Modal";
import MultiLineText from "../../../global/MultiLineText/MultiLineText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface PrintLabelFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const PrintLabelForm = ({ open, setOpen }: PrintLabelFormProps) => {
  return (
    <Modal visible={open} setVisible={setOpen} title="درخواست برچسب(بارکد)">
      <form>
        <div className="inputRow">
          <InputText important label="شماره درخواست" />
          <InputText important label="تاریخ درخواست" />
          <InputText important label="کد" />
        </div>
        <MultiLineText label="توضیحات" />
        <div className="flex-end-center mt-5 gap-3">
          <SimpleButton handelClick={() => setOpen(false)} text="لغو" className="full-lightTomato-btn" />
          <SimpleButton
            // handelClick={handleSubmit}
            // loading={Loading}
            type="submit"
            text="افزودن"
            className="full-tomato-btn"
          />
        </div>
      </form>
    </Modal>
  );
};

export default PrintLabelForm;
