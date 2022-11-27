import React, { useState } from "react";
import { BiSearch, BiX, BiChevronDown } from "react-icons/bi";
import Chip from "../../global/Chip/Chip";
import InputIcon from "../../global/InputIcon/InputIcon";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import PerfesionalSearch from "./../PerfesionalSearch/PerfesionalSearch";

const NavbarSearch = ({
  firstTextInput,
  secondTextInput,
}: {
  firstTextInput?: string;
  secondTextInput?: string;
}) => {
  const [shelf, setShelf] = useState<string>("");
  const [hub, sethub] = useState<string>("");

  interface PropData {
    label: string;
    number: string;
  }

  const [ChipData, setChipData] = useState<PropData[]>([
    {
      label: "کد قفسه",
      number: "123456",
    },
    {
      label: "کد هاب",
      number: "876543",
    },
  ]);
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={handelSubmit}>
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            <div className="Max-sm:mb-3">
              <InputIcon text={firstTextInput} handleOnSearch={setShelf} handleOnSelect={undefined} />
            </div>
            <div>
              <InputIcon text={secondTextInput} handleOnSearch={sethub} handleOnSelect={undefined} />
            </div>
         
            <SimpleButton
              className="full-gray-btn"
              icon={<BiSearch size={20} />}
              text="جستجو"
            />
          </div>
        </form>
        <PerfesionalSearch
          text="جستجوی ‍‍پیشرفته"
          LeftIcon={<BiChevronDown />}
        />
      </div>

      {/* list of chip */}

      <div className="flex justify-start items-center gap-3 mt-6">
        {ChipData.length > 0 ? (
          <div>
            <button
              className="w-122 h-21 flex justify-center items-center flex-row-reverse border-none text-tomato"
              onClick={() => setChipData([])}
            >
              حذف جستجوها{" "}
              <span>
                <BiX />
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NavbarSearch;
