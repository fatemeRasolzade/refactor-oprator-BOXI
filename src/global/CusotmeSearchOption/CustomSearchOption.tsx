import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

const CustomSearchOption = ({ Error, important }: any) => {
  return (
    <div className={`autocompleteWrapper w-[30rem] ${Error && "border-red"}`}>
      <div className={`autocompleteLabel  ${Error && "text-red"} top-[-17px]`}>
        نوع جستجو <span className="text-tomato font-extrabold text-lg h-4">{important ? "*" : " "}</span>
      </div>
      <input className="w-48  h-100" />
      <span className="border-l pr-3 pl-1">
        <RiArrowDownSLine size={23} className="text-darkGray" />
      </span>
      <input className="w-48" />
      <FiSearch size={19} className="text-darkGray mr-3" />
    </div>
  );
};

export default CustomSearchOption;
