import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportExcel } from "../../tools/functions/Methods";
import { PRICE_API } from "../../services/apiRoute";
import StaticTable from "../../components/staticTable/StaticTable";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";
import { ACTIVE_OPTION, DOWNLOAD_OPTION } from "../../global/CustomOptions/CustomOptionsKeyword";
import { priceData, updating } from "../../redux/PriceData/PriceData";
import PriceForm from "./views/ServiceTimeForm/PriceForm";
import PriceSearchForm from "./views/PriceSearchForm";
import { PriceColumn } from "./views/PriceColumn";

const Price = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const handleGetExcel = () => ExportExcel(priceList?.content);

  const options = [
    {
      name: ACTIVE_OPTION,
      handleClick: () => setIsActive(!isActive),
      value: isActive,
    },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

  const { priceList, isUpdating } = useSelector((state: any) => state.price);

  const handleDeleteActionNewData = () => {
    setLoading(true);
    dispatch(
      priceData({
        name: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
    setLoading(false);
  };

  const data =
    priceList?.content?.length !== 0
      ? priceList?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف نرخ نامه"}
                  route={PRICE_API + `/${item.id}`}
                  updating={updating}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                />
                <PriceForm currentData={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="نرخ نامه" />
      <PriceSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <div className="flex-start-center gap-20 mt-6">
        <PriceForm />
        <TestCustomOptions options={options} />
      </div>
      <StaticTable selectable={false} data={data ? data : []} column={PriceColumn} pagination={priceList?.totalElements} loading={Loading} />
    </>
  );
};

export default Price;
