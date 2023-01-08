import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useOnClickOutSide } from "../../tools/hooks/click-outSide-handler";

const CustomSearchOption = ({
  Error,
  important,
  setFieldValue,
  formik,
  wrapperClass = "w-[30rem]",
}: any) => {
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
    <div
      className={`autocompleteWrapper ${wrapperClass} w-full ${
        Error && "border-red"
      }`}
    >
      <div className={`autocompleteLabel  ${Error && "text-red"} top-[-17px]`}>
        نوع جستجو{" "}
        <span className="text-tomato font-extrabold text-lg h-4">
          {important ? "*" : " "}
        </span>
      </div>
      <div ref={WrapperRef} className="relative flex border-l pl-1 w-[50%]">
        <input
          autoComplete="off"
          className="w-full focus:outline-none mr-2 mt-1"
          value={Name.text}
          onFocus={() => setOpen(true)}
          name="select"
        />
        <span className={`${Open && "rotate-180"} transition-all duration-500`}>
          <RiArrowDownSLine size={23} className="text-darkGray" />
        </span>
        {Open && Options.length > 0 && (
          <ul className="ToggleContainer">
            {Options.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item)}
                className={`ToggleElements ${
                  item.text === Name.text ? "selected" : ""
                }`}
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="w-[50%] focus:outline-none mr-2 mt-1"
      />
      <span className="mr-2">
        <FiSearch size={19} className="text-darkGray" />
      </span>
    </div>
  );
};

export default CustomSearchOption;

const Options = [
  { id: 1, text: "شماره جمع آوری", name: "code", onclick },
  { id: 2, text: "کد مشتری", name: "customercode", onclick },
  { id: 3, text: "شماره مرسوله ", name: "consigmentnumber", onclick },
  { id: 4, text: "شماره سفر", name: "tripnumber", onclick },
];
