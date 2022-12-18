import { Dialog } from "@material-tailwind/react";
import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import StaticTable from "../../../../components/staticTable/StaticTable";
import { AddGeoColumn } from "../../../../global/Column/Columns";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import TooltipWrapper from "../../../../global/tooltip/TooltipWrapper";
import AddForm from "./AddFormToList";
import AddListToApi from "./AddListToApi";

const AddEditGeographic = () => {
  const [tableList, setTableList] = useState<Array<any>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteHandler = (id: number) => {
    setTableList(tableList.filter((item) => item.id !== id));
    setIsModalOpen(false);
  };
  const data = tableList.map((item: any) => {
    return {
      fromCountryDevision: (
        <div className="w-full flex justify-center">
          <TooltipWrapper
            textProps={item?.fromCountryDevision?.map((country: any) => (
              <div className="text-white" key={country.id}>
                {country.text}
              </div>
            ))}
          >
            <div>
              {item?.fromCountryDevision?.map((country: any) => country.text)}
            </div>
          </TooltipWrapper>
        </div>
      ),
      toCountryDevision: (
        <div className="w-full flex justify-center">
          <TooltipWrapper
            textProps={item?.toCountryDevision?.map((country: any) => (
              <div className="text-white" key={country.id}>
                {country.text}
              </div>
            ))}
          >
            <div>
              {item?.toCountryDevision?.map((country: any) => country.text)}
            </div>
          </TooltipWrapper>
        </div>
      ),
      operation: (
        <div>
          <button
            className=" border-none	text-[14px]  w-[20px] h-[20px]"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <BiTrash size={20} className="w-full h-full	" />
          </button>
          <Dialog
            open={isModalOpen}
            handler={setIsModalOpen}
            className="min-w-[400px] w-[500px]"
          >
            <button
              className="flex w-[50px] h-[50px]  border-none items-center justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              <GrFormClose />
            </button>
            <div className="flex  justify-center  mb-6">
              <div className="flex flex-col  w-[80%] gap-6">
                <div className="w-full justify-center flex">
                  <h3 className="text-darkGray font-bold text-lg">
                    حذف مشخصات محصول
                  </h3>
                </div>
                <p className="w-full flex justify-center">
                  آیا از حذف این مورد اطمینان دارید؟
                </p>
                <div className="flex w-full justify-center gap-4">
                  <SimpleButton
                    type="submit"
                    text="خیر"
                    className="full-lightTomato-btn w-28 "
                    handelClick={() => setIsModalOpen(false)}
                  />
                  <SimpleButton
                    type="submit"
                    text="بله"
                    className="full-tomato-btn w-28 "
                    handelClick={() => onDeleteHandler(item.id)}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      ),
    };
  });
  return (
    <div>
      <AddForm
        setTableList={(values) =>
          setTableList((prev) => {
            return [...prev, values];
          })
        }
      />
      <StaticTable
        data={data ? data : []}
        column={AddGeoColumn}
        pagination={7}
        selectable={false}
      />
      <AddListToApi tableList={[]} />
    </div>
  );
};

export default AddEditGeographic;
