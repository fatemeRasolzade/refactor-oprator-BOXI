import { BsUpcScan } from "react-icons/bs";
import StaticTable from "../../../components/staticTable/StaticTable";
import InputSelect from "../../../global/InputSelect/InputSelect";
import InputText from "../../../global/InputText/InputText";
import Modal from "../../../global/Modal/Modal";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface OutPutScanFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const OutPutScanForm = ({ open, setOpen }: OutPutScanFormProps) => {
  return (
    <Modal visible={open} setVisible={setOpen} title="اسکن ورود در هاب">
      <InputSelect wrapperClassName="w-full" important label="هاب" />
      <InputText
        wrapperClassName="w-full -mb-5"
        leftIcon={<BsUpcScan size={30} className="text-[#EAB308] " />}
        placeholder="کد مرسوله را وارد کنید یا اسکن کنید"
      />
      <StaticTable
        data={[]}
        column={[
          {
            accessor: "code",
            Header: "کد مرسوله",
          },
        ]}
        pagination={1}
        selectable={false}
      />
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
    </Modal>
  );
};

export default OutPutScanForm;
