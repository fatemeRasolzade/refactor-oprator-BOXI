import axios from "axios";
import { useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import { ProductInfoColumn } from "../../../global/Column/Columns";
import ProductInfoForm from "./view/ProductInfoForm";

const ProductInfo = () => {
  const [tableList, setTableList] = useState<Array<any>>([]);
  const data = tableList.map((item) => {
    return {
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
      operation: <div>ulgdhj</div>,
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
