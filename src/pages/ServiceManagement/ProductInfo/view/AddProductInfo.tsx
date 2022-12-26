import axios from "axios";
import React, { FC, useCallback } from "react";
import { toast } from "react-toastify";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

interface AddProductInfoProps {
  tableList: Array<any>;
  setTableList: (tableList: Array<any>) => void;
}
const AddProductInfo: FC<AddProductInfoProps> = ({
  tableList,
  setTableList,
}): JSX.Element => {
  const saveDataHandler = useCallback(async () => {
    if (tableList.length === 0) {
      toast.warning("داده ای وجود ندارد");
      return;
    }
    try {
      axios({
        url: "http://boxi.local:40000/core-api/productattribute",
        method: "POST",
        data: tableList,
      });
      toast.success("مقادیر مورد نظر با موفقیت اضافه گردید");
      setTableList([]);
    } catch (error) {}
  }, [setTableList, tableList]);

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

export default AddProductInfo;
const convertUsingProduct = (usingProduct: any, product: any) => {
  let arr = [];
  for (let x of usingProduct) {
    arr.push({
      parent: product,
      child: x,
    });
  }
  return arr;
};
