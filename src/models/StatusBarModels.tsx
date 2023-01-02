
import { BsBox, BsCartCheck, BsFillGridFill, BsMinecartLoaded, BsTruck, BsUpcScan } from "react-icons/bs";
import { MdOutlineCallMissed, MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { GiSwapBag } from "react-icons/gi";
import { ImEnter } from "react-icons/im";
import { FiXSquare } from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import { CgCheck, CgClose } from "react-icons/cg";
import { TbBoxOff } from "react-icons/tb";
import { SlSocialDropbox } from "react-icons/sl";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

interface ElementsValue {
  icon: JSX.Element;
  text: string;
}

export const StatusBarElements: Record<string, ElementsValue> = {
    All: {
      icon: <BsFillGridFill size={32} className="text-[#F59E0B]" />,
      text: "کل",
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
    AllocationToRegion: {
      icon: <TiLocation size={30} className="text-red" />,
      text: "تخصیص به منطقه",
    },
    AllocationToDriver: {
      icon: <BsTruck size={30} className="text-red" />,
      text: "تخصیص به راننده",
    },
    Collected: {
      icon: (
        <div className="relative">
          <CgCheck size={25} className="absolute -top-5 -right-2" />
          <BsBox size={30} />
        </div>
      ),
      text: "جمع آوری شده",
    },
    FaildedCollected: {
      icon: (
        <div className="relative">
          <CgClose size={16} className="absolute -top-[.9rem] -right-2" />
          <BsBox size={30} />
        </div>
      ),
      text: "عدم جمع آوری موفق",
    },
    Uncollectible: {
      icon: <SlSocialDropbox size={30} className="text-red" />,
      text: "غیر قابل جمع آوری ",
    },
    Canceled: {
      icon: <TbBoxOff size={30} className="text-red" />,
      text: "لغو شده",
    },
    Undeliverable: {
      icon: <HiOutlineArchiveBoxXMark size={30} className="text-red" />,
      text: "غیر قابل تحویل",
    },
  };