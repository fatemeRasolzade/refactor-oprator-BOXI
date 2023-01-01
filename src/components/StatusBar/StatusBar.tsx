import { BsCartCheck, BsFillGridFill, BsMinecartLoaded, BsUpcScan } from "react-icons/bs";
import { MdOutlineCallMissed, MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { GiSwapBag } from "react-icons/gi";
import { ImEnter } from "react-icons/im";
import { FiXSquare } from "react-icons/fi";

interface OptionsProps {
  name: string;
}

interface StatusBarProps {
  Options: Array<OptionsProps>;
}

const Elements: any = {
  All: {
    icon: <BsFillGridFill size={32} className="text-[#F59E0B]" />,
    text: "همه",
  },
  Planned: {
    icon: <MdOutlineTimer size={30} className="text-[#06B6D4]" />,
    text: "برنامه ریزی شده",
  },
  NotPlanned: {
    icon: <MdOutlineTimerOff size={30} className="text-[#EC4899]" />,
    text: "برنامه ریزی نشده",
  },
  InTransit: {
    icon: <BsCartCheck size={30} className="text-[#0EA5E9]" />,
    text: "در حال حمل",
  },
  SuccessfulDelivery: {
    icon: <IoMdCheckboxOutline size={30} className="text-[#10B981]" />,
    text: "تحویل موفق",
  },
  UnsuccessfulDelivery: {
    icon: <FiXSquare size={30} className="text-[#F43F5E]" />,
    text: "تحویل ناموفق",
  },
  ScanInHub: {
    icon: <BsUpcScan size={30} className="text-[#EAB308]" />,
    text: "اسکن در هاب",
  },
  Bagged: {
    icon: <GiSwapBag size={30} className="text-[#A16207]" />,
    text: "کیسه شده",
  },
  Loaded: {
    icon: <BsMinecartLoaded size={30} className="text-[#84CC16]" />,
    text: "بارگیری شده",
  },
  EntranceToHub: {
    icon: <ImEnter size={30} className="text-[#9CA3AF]" />,
    text: "ورودی به هاب",
  },
  BackToOrigin: {
    icon: <MdOutlineCallMissed size={30} className="text-[#3B82F6]" />,
    text: "بازگشتی به مبدا",
  },
};

const StatusBar = ({ Options }: StatusBarProps) => {
  return (
    <div className="flex-start-start gap-7">
      {Options.map((item: any) => (
        <div className="flex-start-center gap-2">
          <div>{Elements[item.name].icon}</div>
          <div className="flex-between-start flex-col ">
            <p className="!text-darkGray">{item.value}</p>
            <p className="!text-darkGray">{Elements[item.name].text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusBar;
