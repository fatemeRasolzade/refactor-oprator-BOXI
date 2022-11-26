import  { useState } from "react";

interface PropAddButton{
  text?:string,
  subItemOne?:string,
  subItemTwo?:string,
  RightIcon?:JSX.Element,
  LeftIcon?:JSX.Element,
  color?:string,
  textColor?:string
}

const AddButton = ({ text, subItemOne, subItemTwo, RightIcon, LeftIcon,color,textColor }:PropAddButton) => {
  const [toggle, setToggle] = useState(false);

  const handelClick = () => {
    setToggle(false); 
  };

  return (
    <div className="w-160 relative">
      <button
        className={`w-160 h-10 bg-${color} text-${textColor} rounded-lg border-none flex justify-around items-center flex-row-reverse`}
        onClick={() => setToggle(!toggle)}
      >
        <span>{LeftIcon}</span> <span className="text-lg">{text}</span>{" "}
        <span>{RightIcon}</span>
      </button>
      {toggle ? (
        <div className="w-full bg-white  absolute top-40 right-0 shadow-lg rounded-md ">
          <ul>
            <li>
              <button
                className="w-full py-2 px-3 border-none hover:bg-gray-200 text-sm text-right "
                onClick={handelClick}
              >
                {subItemOne}
              </button>
            </li>
            <li>
              <button
                className="w-full py-2 px-3 border-none hover:bg-gray-200 text-right"
                onClick={handelClick}
              >
                {subItemTwo}
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default AddButton;
