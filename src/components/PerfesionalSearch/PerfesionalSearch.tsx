import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";
import { BiChevronDown, BiCog } from "react-icons/bi";
import SimpleButton from "../../global/SimpleButton/SimpleButton";

interface propsData {
  formData?: any;
  text?: string;
  LeftIcon?: JSX.Element;
  children?: JSX.Element;
  handleReset?: any;
  perfetionalClik?: any;
  sizeWidth?: string;
}

const PerfesionalSearch = ({ formData, handleReset, children, perfetionalClik, sizeWidth = "500px" }: propsData): JSX.Element => {
  return (
    <div className="w-160 relative">
      <Popover
        placement="bottom-end"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button className="border-none bg-transparent text-darkGray !shadow-none centering gap-3 text-base font-normal pt-2">
            <span>جستجوی پیشرفته </span>
            <BiChevronDown size={25} />
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <div
            className={`max-h-[500px] px-4`}
            // style={{ width: sizeWidth }}
          >
            <div className="flex-between-start gap-4 mt-5">{children}</div>
            <div className="flex-between-center">
              <SimpleButton text="شخصی سازی" icon={<BiCog color="gray" />} className="centering p-0" handelClick={perfetionalClik} />
              <SimpleButton text="پاک کردن ورودی ها" className="p-0" handelClick={handleReset} />
              <SimpleButton searchBtn handelClick={formData} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PerfesionalSearch;
