import axios from "axios";
import React, { FC, useCallback } from "react";
import { toast } from "react-toastify";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

interface AddListToApiProps {
  tableList: Array<any>;
}
const AddListToApi: FC<AddListToApiProps> = ({ tableList }) => {
  const saveDataHandler = useCallback(async () => {
    if (tableList.length === 0) {
      toast.error("داده ای وجود ندارد");
      return;
    }
    try {
      axios({
        url: "http://boxi.local:40000/core-api/productattribute",
        method: "POST",
        data: tableList,
      });
      toast.success("مقادیر مورد نظر با موفقیت اضافه گردید");
    } catch (error) {}
  }, [tableList]);
  return (
    <div className="my-6">
      <div className="flex w-full justify-end gap-4">
        <SimpleButton
          type="submit"
          text="لغو"
          className="full-lightTomato-btn w-28 "
          //   handelClick={() => setIsModalOpen(false)}
        />
        <SimpleButton
          type="submit"
          text="افزودن"
          className="full-tomato-btn w-28 "
          handelClick={() => saveDataHandler()}
        />
      </div>
    </div>
  );
};

export default AddListToApi;
