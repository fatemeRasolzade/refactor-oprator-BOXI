import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { BiChevronDown, BiCog } from "react-icons/bi";
import SimpleButton from "../../global/SimpleButton/SimpleButton";

interface propsData {
  formData?: any;
  text?: string;
  LeftIcon?: JSX.Element;
  children?: JSX.Element;
  handleReset?: any;
}

const PerfesionalSearch = ({
  formData,
  handleReset,
  children,
}: propsData): JSX.Element => {
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
          <Button className="border-none bg-transparent text-dark !shadow-none centering gap-3 text-base font-normal pt-2">
            <span>جستجوی پیشرفته </span>
            <BiChevronDown size={25} />
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <div className="" style={{ width: "500px" }}>
            <div className="flex  justify-between items-center gap-4 mt-5">
              {children}
            </div>
            <div className="flex-between-center">
              <SimpleButton
                text="شخصی سازی"
                icon={<BiCog color="gray" />}
                className="centering p-0"
              />
              <SimpleButton
                text="پاک کردن ورودی ها"
                className="p-0"
                handelClick={handleReset}
              />
              <SimpleButton searchBtn handelClick={formData} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PerfesionalSearch;
