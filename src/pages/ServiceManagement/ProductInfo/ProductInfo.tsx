import { Dialog } from "@material-tailwind/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { useLocation } from "react-router-dom";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import { ProductInfoColumn } from "../../../global/Column/Columns";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import TooltipWrapper from "../../../global/tooltip/TooltipWrapper";
import AddProductInfo from "./view/AddProductInfo";
import ProductInfoForm from "./view/ProductInfoForm";

const ProductInfo = () => {
  const { state } = useLocation();
  const [tableList, setTableList] = useState<Array<any>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDeleteHandler = (id: number) => {
    setTableList(tableList.filter((item) => item.tableId !== id));
    setIsModalOpen(false);
  };
  const getProductInfoData = useCallback(() => {
    axios({
      url: "http://boxi.local:40000/core-api/productattribute/filter?pageNumber=1&pageSize=20",
      method: "POST",
      data: {
        product: state,
      },
    });
  }, [state]);

  useEffect(() => {
    if (state) {
      getProductInfoData();
    }
  }, [getProductInfoData, state]);

  return (
    <div>
      <Breadcrumb curentPage="تعریف مشخصات محصول" beforePage="مدیریت سرویس" />
      <ProductInfoForm
        setTableList={(values) =>
          setTableList((prev) => {
            return [...prev, values];
          })
        }
        tableList={tableList}
        isEdit
      />
      <StaticTable
        data={tableList.map((item, index) => {
          return {
            id: item.id,
            product: <span>{item.product.text}</span>,
            status: <span>{item.isActive ? "فعال" : "غیرفعال"}</span>,
            weight: (
              <span>
                {item.fromWeight ? item.fromWeight : " - "} &nbsp;تا &nbsp;
                {item.toWeight ? item.toWeight : " - "}
              </span>
            ),
            dimension: (
              <span>
                {item.fromDim ? item.fromDim : " - "}&nbsp;تا &nbsp;
                {item.toDimension ? item.toDimension : " - "}
              </span>
            ),
            usingProducts: (
              <div className="w-full flex justify-center">
                <TooltipWrapper
                  textProps={item?.usingProduct?.map(
                    (item: any, index: number) => (
                      <div className="text-white" key={index}>
                        {item?.child.text}
                      </div>
                    )
                  )}
                >
                  <div>
                    {item?.usingProduct?.map(
                      (item: any, index: number) => item?.child.text
                    )}
                  </div>
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
                    {item?.fromCountryDevision?.map(
                      (country: any) => country.text
                    )}
                  </div>
                </TooltipWrapper>
                {item?.fromSourceCity && item?.fromSourceCity.length !== 0 && (
                  <>
                    <span>&nbsp; - &nbsp;</span>
                    <TooltipWrapper
                      textProps={item?.fromSourceCity?.map((city: any) => {
                        return (
                          <div className="text-white" key={city.id}>
                            {city.text}
                          </div>
                        );
                      })}
                    >
                      <div>
                        {item?.fromSourceCity?.length !== 0 &&
                          item?.fromSourceCity[item?.fromSourceCity?.length - 1]
                            .text}
                      </div>
                    </TooltipWrapper>
                  </>
                )}
                {item?.fromSourceLocation &&
                  item?.fromSourceLocation.length !== 0 && (
                    <>
                      <span>&nbsp; - &nbsp;</span>
                      <TooltipWrapper
                        textProps={item?.fromSourceLocation?.map(
                          (location: any) => {
                            return (
                              <div className="text-white" key={location.id}>
                                {location.text}
                              </div>
                            );
                          }
                        )}
                      >
                        <div>
                          {item?.fromSourceLocation?.length !== 0 &&
                            item?.fromSourceLocation[
                              item?.fromSourceLocation?.length - 1
                            ].text}
                        </div>
                      </TooltipWrapper>
                    </>
                  )}
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
                    {item?.toCountryDevision?.map(
                      (country: any) => country.text
                    )}
                  </div>
                </TooltipWrapper>
                {item?.fromDestinationCity &&
                  item?.fromDestinationCity.length !== 0 && (
                    <>
                      <span>&nbsp; - &nbsp;</span>
                      <TooltipWrapper
                        textProps={item?.fromDestinationCity?.map(
                          (city: any) => {
                            return (
                              <div className="text-white" key={city.id}>
                                {city.text}
                              </div>
                            );
                          }
                        )}
                      >
                        <div>
                          {item?.fromDestinationCity?.length !== 0 &&
                            item?.fromDestinationCity[
                              item?.fromDestinationCity?.length - 1
                            ].text}
                        </div>
                      </TooltipWrapper>
                    </>
                  )}
                {item?.fromDestinationLocation &&
                  item?.fromDestinationLocation.length !== 0 && (
                    <>
                      <span>&nbsp; - &nbsp;</span>
                      <TooltipWrapper
                        textProps={item?.fromDestinationLocation?.map(
                          (location: any) => {
                            return (
                              <div className="text-white" key={location.id}>
                                {location.text}
                              </div>
                            );
                          }
                        )}
                      >
                        <div>
                          {item?.fromDestinationLocation?.length !== 0 &&
                            item?.fromDestinationLocation[
                              item?.fromDestinationLocation?.length - 1
                            ].text}
                        </div>
                      </TooltipWrapper>
                    </>
                  )}
              </div>
            ),
            operation: (
              <div className="flex w-full gap-3 justify-center">
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
                            handelClick={() => onDeleteHandler(item.tableId)}
                          />
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </div>
              </div>
            ),
          };
        })}
        column={ProductInfoColumn}
        pagination={7}
        selectable={false}
      />
      <AddProductInfo tableList={tableList} setTableList={setTableList} />
    </div>
  );
};

export default ProductInfo;
