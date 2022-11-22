import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const InputText = ({ setSearch, text }: { text?: string; setSearch?: any }) => {
  return (
    <div>
      <div className="relative w-250">
        <span className="absolute right-10 -top-12 z-5 text-md bg-white px-2">
          {text && text}
        </span>
        <span className="absolute -left-8 top-3 bg-white h-85 w-30 rounded-lg flex justify-center items-center">
          <BiSearchAlt2 size={20} />
        </span>
        <input
          type="text"
          className="w-250 h-38 rounded-lg border-lightGray border-1 pr-2 "
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو"
        />
      </div>
    </div>
  );
};

export default InputText;
