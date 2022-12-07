import React, { useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

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
        <div className=" flex gap-3 justify-start items-center flex-wrap">
          <div className="Max-sm:mb-3">
            <AutocompleteInput
              items={[]}
              label={"کد پرسنلی"}
              onSelect={() => console.log()}
              // onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <AutocompleteInput
              items={[]}
              label={"نام و نام خانوادگی"}
              onSelect={() => console.log()}
              // onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <SimpleButton
            type="submit"
            className="full-gray-btn w-[160px] h-[40px] centering rounded-md"
            icon={<BiSearch size={20} />}
            text="جستجو"
          />
        </div>
      </form>
      <PerfesionalSearch text="جستجوی پیشرفته" LeftIcon={<BiChevronDown />}>
        <div className="flex flex-col gap-6 my-6">
          <div className="flex gap-6">
            <AutocompleteInput
              items={[]}
              label={"کد ملی"}
              onSelect={() => console.log()}
              // onChange={(e) => setRole(e.target.value)}
            />
            <AutocompleteInput
              items={[]}
              label={"شماره مموبایل"}
              onSelect={() => console.log()}
              // onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="flex gap-6">
            <AutocompleteInput
              items={[]}
              label={"شماره مموبایل"}
              onSelect={() => console.log()}
              // onChange={(e) => setRole(e.target.value)}
            />

            <AutocompleteInput
              items={[]}
              label={"پست الکترونیک"}
              onSelect={() => console.log()}
              // onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
      </PerfesionalSearch>
    </div>
  );
};

export default PersonnelSearchFrom;
