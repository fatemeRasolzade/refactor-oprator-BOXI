import axios from "axios";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import ProductInfoForm from "./view/ProductInfoForm";

const ProductInfo = () => {
  return (
    <div>
      <Breadcrumb beforePage="تعریف مشخصات محصول" curentPage="مدیریت سرویس" />
      <ProductInfoForm />
      <StaticTable data={[]} column={[]} pagination={7} selectable={false} />
    </div>
  );
};

export default ProductInfo;
