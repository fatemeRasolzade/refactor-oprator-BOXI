import {
  BsCartCheck,
  BsFillGridFill,
  BsMinecartLoaded,
  BsUpcScan,
} from "react-icons/bs";
import { FiXSquare } from "react-icons/fi";
import { GiSwapBag } from "react-icons/gi";
import { ImEnter } from "react-icons/im";
import { IoMdCheckboxOutline } from "react-icons/io";
import {
  MdOutlineCallMissed,
  MdOutlineTimer,
  MdOutlineTimerOff,
} from "react-icons/md";

interface ElementsValue {
  icon: JSX.Element;
  text: string;
}
export const ElementsConsignment: Record<string, ElementsValue> = {
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
