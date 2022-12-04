import React, { useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";

import InputIcon from "../../../global/InputIcon/InputIcon";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

const PersonnelSearchFrom = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState<string>("");

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // dispatch(
      //   RoleData({
      //     code: "",
      //     name: role,
      //     isActive: isActive,
      //   }) as any
      // );
    } catch (error) {}
  };
  return (
    <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
      <form onSubmit={handelSubmit}>
        {" "}
        <div className=" flex gap-3 justify-start items-center flex-wrap">
          <div className="Max-sm:mb-3">
            <InputIcon
              text={"نقش"}
              handleOnSearch={setRole}
              handleOnSelect={undefined}
            />
          </div>
          <div>
            <InputIcon
              text={"نام و نام خانوادگی"}
              handleOnSearch={setRole}
              handleOnSelect={undefined}
            />
          </div>

          <SimpleButton
            className="full-gray-btn w-[160px] h-[40px] centering rounded-md"
            icon={<BiSearch size={20} />}
            text="جستجو"
          />
        </div>
      </form>
      <PerfesionalSearch text="جستجوی پیشرفته" LeftIcon={<BiChevronDown />}>
        <div className="flex flex-col gap-6 my-6">
          <div className="flex gap-6">
            <InputIcon
              text={"کد ملی"}
              handleOnSearch={setRole}
              handleOnSelect={undefined}
            />
            <InputIcon
              text={"شماره مموبایل"}
              handleOnSearch={setRole}
              handleOnSelect={undefined}
            />
          </div>
          <div className="flex gap-6">
            <InputIcon
              text={"پست الکترونیک"}
              handleOnSearch={setRole}
              handleOnSelect={undefined}
            />
            <InputIcon
              text="نام کاربری"
              handleOnSearch={setRole}
              handleOnSelect={undefined}
            />
          </div>
        </div>
      </PerfesionalSearch>
    </div>
  );
};

export default PersonnelSearchFrom;
