import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";
import { BiChevronDown, BiCog } from "react-icons/bi";
import SimpleButton from "../../global/SimpleButton/SimpleButton";


interface propsData {
  formData?: any;
  text?: string;
  LeftIcon?: JSX.Element;
  children?: JSX.Element;
}

const PerfesionalSearch = ({ LeftIcon, text, formData, children }: propsData): JSX.Element => {
  return (
    <div className="w-160 relative">
      <Popover
        placement="bottom"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button className="border-none bg-transparent text-dark shadow-none flex justify-around items-center w-[140px] px-0 py-3">
            جستجوی پیشرفته{" "}
            <span className="mr-5">
              <BiChevronDown />
            </span>
            <span></span>
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <div className="" style={{ width: "550px" }}>
            <div className="flex  justify-between items-center gap-4">
              {children}
              </div>
            <div className="flex justify-between items-center mt-5">
              <SimpleButton text="شخصی سازی" icon={<BiCog color="gray" />} className="centering p-3"/>
              <SimpleButton text="پاک کردن ورودی ها" className="p-2"/>
              <SimpleButton handelClick={()=>formData.handleSubmit()}  className="full-tomato-btn py-2 px-3 text-white rounded-md" text="جستجو" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PerfesionalSearch;
