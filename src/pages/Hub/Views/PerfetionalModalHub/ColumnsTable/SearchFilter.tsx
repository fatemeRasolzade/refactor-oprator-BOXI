import React, { FC, memo, useCallback, useState } from "react";
import ChipIcon from "../../../../../global/ChipIcon/ChipIcon";
import InputIcon from "../../../../../global/InputIcon/InputIcon";
import CustomSwitch from "../../../../../global/Switch/Switch";
import SwitchTooltip from "./SwitchTooltip";
interface SearchFilterInterface {
  valueName:
    | "personelCode"
    | "name"
    | "nationalCode"
    | "mobile"
    | "email"
    | "search"
    | "username"
    | "pageNumbers";

  label: string;
  isMain: boolean;
  isShow: boolean;
}
interface SearchFilterProps {
  searchFilterList: Array<any>;
  setSearchFilterList: (selectedCol: Array<any>) => void;
}
const SearchFilter: FC<SearchFilterProps> = ({
  searchFilterList,
  setSearchFilterList,
}) => {
  return (
    <div>
      <h4>
        .در اینجا می توانید بر اساس نیاز خود ، انتخاب کنید که کدام یک از فیلتر
        ها نمایش داده شوند ، دقت نمایید فقط 4 فیلتر قابلیت نمایش در صفحه اصلی
        دارند و باقی فیلترها در منو جستجو پیشرفته قرار می گیرند .با کلیک بر روی
        فلش های فیلتر های انتخاب شده ، میتوانید ترتیب نمایش فیلترها را تغییر
        دهید
      </h4>

      <div className="w-full mt-4 grid grid-cols-6 gap-3">
        <div className="col-span-5">
          <div className="flex justify-between items-center mb-3">
            <h5>فیلترهای انتخاب شده</h5>
            <h5>نمایش در صفحه اصلی</h5>
          </div>

          {/* content */}
          <div>
            <InputIcon text="جستجو" />

            {/* item for map list*/}
            <div className="mt-3 h-[300px] overflow-y-auto">
              {searchFilterList.map((item, index) => {
                return (
                  <div key={index}>
                    {!item.isMain && (
                      <SwitchTooltip
                        active={item.isShow}
                        tooltipText={item.label}
                        handelchanges={(e: any) => {
                          item.isShow = e;
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/*end item for map list*/}
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export default memo(SearchFilter);
