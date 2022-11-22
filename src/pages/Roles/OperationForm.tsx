import { FiAlertCircle } from "react-icons/fi";
import { Input, Button } from "@material-tailwind/react";

import InputIcon from "react-multi-date-picker/components/input_icon";
import InputSelect from "../../global/InputSelect/InputSelect";
import InputText from "../../global/InputText/InputText";

interface OperationFormProps {
  setIsOpen: (value: boolean) => void;
  mode: "delete" | "edit" | null;
}
const OperationForm = ({ setIsOpen, mode }: OperationFormProps) => {
  switch (mode) {
    case "edit":
      return (
        <div className="flex flex-col justify-center items-center	w-full h-full gap-y-11 pb-12">
          <form style={{ position: "relative" }}>
            <div className="w-72">
              <Input label="Username" />
            </div>
          </form>
        </div>
      );
    case "delete":
      return (
        <div className="flex flex-col justify-center items-center	w-full h-full gap-y-11 pb-12">
          <div className="w-[50px] h-[50px] flex">
            <FiAlertCircle className="w-full h-full  text-tomato" />
          </div>
          <h3 className="font-bold">حذف نقش</h3>
          <div className="h-[20px]">آیا از حذف مورد اطمینان دارید؟</div>
          <div className="flex w-full justify-center h-[20px] pb-[20px] gap-x-10">
            <Button className=" w-[20%]  h-40 px-4 flex justify-center items-center  bg-tomato border-none rounded-lg text-md  text-white">
              بله
            </Button>
            <Button
              className="w-[20%]  h-40 px-4 flex justify-center items-center  bg-[#FFF3E5] border-none rounded-lg text-md  text-black"
              onClick={() => setIsOpen(false)}
            >
              خیر
            </Button>
          </div>
        </div>
      );

    default:
      return <></>;
  }
};

export default OperationForm;
