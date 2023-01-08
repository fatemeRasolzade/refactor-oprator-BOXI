import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useOnClickOutSide } from "../../tools/hooks/click-outSide-handler";

const CustomSearchOption = ({ Error, important, setFieldValue, formik, WrapperClassName }: any) => {
  const [Open, setOpen] = useState(false);
  const [Name, setName] = useState<any>({
    Name: "",
    text: "",
  });
  const [Value, setValue] = useState("");
  const WrapperRef = useRef(null);
  useOnClickOutSide(WrapperRef, Open, setOpen);

  useEffect(() => {
    if (Name.name && Value) {
      setFieldValue(Name.name, Value);
    }
  }, [Name, Value, setFieldValue]);

  const handleClick = (item: any) => {
    setName(item);
    setOpen(false);
  };

  return (
    <div className={`autocompleteWrapper  ${WrapperClassName}`}>
      <div className={`autocompleteLabel  top-[-17px]`}>نوع جستجو</div>
      <div ref={WrapperRef} className="w-[50%] relative flex-between-center border-l pl-1">
        <input
          autoComplete="off"
          className=" focus:outline-none mr-2 mt-1"
          value={Name.text}
          onFocus={() => setOpen(true)}
          name="select"
        />
        <span className={`${Open && "rotate-180"} transition-all duration-500`}>
          <RiArrowDownSLine size={17} className="text-darkGray  cursor-pointer" />
        </span>
        {Open && Options.length > 0 && (
          <ul className="ToggleContainer">
            {Options.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item)}
                className={`ToggleElements ${item.text === Name.text ? "selected" : ""}`}
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-between-center w-full">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="w-[50%] focus:outline-none mr-2 mt-1"
        />
        <span className="mr-2">
          <FiSearch size={19} className="text-darkGray" />
        </span>
      </div>
    </div>
  );
};

export default CustomSearchOption;

CustomSearchOption.defaultProps = {
  WrapperClassName: "w-[30rem]",
};

const Options = [
  { id: 1, text: "شماره جمع آوری", name: "code", onclick },
  { id: 2, text: "کد مشتری", name: "customercode", onclick },
  { id: 3, text: "شماره مرسوله ", name: "consigmentnumber", onclick },
  { id: 4, text: "شماره سفر", name: "tripnumber", onclick },
];
