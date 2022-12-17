import axios from "axios";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import { ProductInfoColumn } from "../../../global/Column/Columns";
import TooltipWrapper from "../../../global/tooltip/TooltipWrapper";
import ProductInfoForm from "./view/ProductInfoForm";

const ProductInfo = () => {
  const [tableList, setTableList] = useState<Array<any>>([]);
  const onDeleteHandler = (id: number) => {
    setTableList(tableList.filter((item) => item.id !== id));
  };
  const data = tableList.map((item, index) => {
    return {
      id: item.id,
      product: <span>{item.product.text}</span>,
      status: <span>{item.isActive ? "فعال" : "غیرفعال"}</span>,
      weight: (
        <span>
          {item.fromWeight}-{item.toWeight}
        </span>
      ),
      dimension: (
        <span>
          {item.fromDim}-{item.toDimension}
        </span>
      ),
      usingProducts: (
        <div className="w-full flex justify-center">
          <TooltipWrapper
            textProps={item?.usingProduct?.map((prod: any) => (
              <div className="text-white" key={prod.id}>
                {prod.text}
              </div>
            ))}
          >
            <div>{item?.usingProduct?.map((prod: any) => prod.text)}</div>
          </TooltipWrapper>
        </div>
      ),
      from: (
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
      timeCommitment: <span>{item.timeCommitment.text}</span>,
      destination: (
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
          <div>
            <button
              className=" border-none	text-[14px]  w-[20px] h-[20px] "
              // onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <AiOutlineEdit className="w-full h-full" />
            </button>
          </div>
          <div>
            <button
              className=" border-none	text-[14px]  w-[20px] h-[20px]"
              onClick={() => onDeleteHandler(item.id)}
            >
              <BiTrash size={20} className="w-full h-full	" />
            </button>
          </div>
        </div>
      ),
    };
  });

  return (
    <div>
      <Breadcrumb beforePage="تعریف مشخصات محصول" curentPage="مدیریت سرویس" />
      <ProductInfoForm
        setTableList={(values) =>
          setTableList((prev) => {
            return [...prev, values];
          })
        }
        tableList={tableList}
      />
      <StaticTable
        data={data}
        column={ProductInfoColumn}
        pagination={7}
        selectable={false}
      />
    </div>
  );
};

export default ProductInfo;
