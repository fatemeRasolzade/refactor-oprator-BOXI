import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { FetchGeoColumn } from "../../global/Column/Columns";
import {
  clearGeoList,
  fetchGeoList,
} from "../../redux/customGeo/customGeoReducer";
import { ExportExcel } from "../../tools/functions/Methods";
import SearchFilter from "./views/SearchFilter";

const CustomGeographic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filter, geoData } = useSelector((state: any) => state.customGeo);

  const [isActive, setIsActive] = useState<boolean>(true);
  const getDataTable = useCallback(async () => {
    try {
      const res = await axios({
        url: "http://boxi.local:40000/core-api/customcountrydevision/filter?pageNumber=1&pageSize=10",
        method: "POST",
        data: { ...filter, isActive },
      });
      dispatch(fetchGeoList(res.data?.payload));
    } catch (error) {}
  }, [dispatch, filter, isActive]);

  const handleGetnewDataOnDelete = () => {
    getDataTable();
  };
  useEffect(() => {
    getDataTable();
    return () => {
      dispatch(clearGeoList());
    };
  }, [dispatch, getDataTable]);

  const data: any = geoData
    ? geoData?.content?.map((item: any) => {
        return {
          name: item?.name,
          code: item?.code,
          status: <span>{item?.isActive ? "فعال" : "غیر فعال"}</span>,
          operation: (
            <div className="">
              <DeleteOperation
                itemId={item.id}
                title={"حذف کارمند"}
                route={`http://boxi.local:40000/core-api/customcountrydevision/${item?.id}`}
                handleDeleteActionNewData={handleGetnewDataOnDelete}
              />

              <button
                onClick={() => {
                  navigate(
                    "/basic-information/custom-geographic-category/edit",
                    {
                      state: item,
                    }
                  );
                }}
              >
                <AiOutlineEdit className="w-full h-full" />
              </button>
            </div>
          ),
        };
      })
    : [];
  // const data: any = [];
  return (
    <div>
      <Breadcrumb
        curentPage="اطلاعات پایه"
        beforePage="تعریف رده جغرافیایی سفارشی"
      />
      <SearchFilter />
      <OptionsTable
        exportExcel={() => ExportExcel(geoData?.content)}
        // addComponentProps={() => <AddEditGeographic />}
        btnLink="/basic-information/custom-geographic-category/add"
        setIsActive={(value) => {
          // setFilterData({
          //   ...filterData,
          //   isActive: value,
          // });
          setIsActive(!isActive);
        }}
        isActive={isActive}

        // customComponent={() => <AddEditGeographic isGroup={true} />}
      />
      <StaticTable
        data={data ? data : []}
        column={FetchGeoColumn}
        pagination={geoData?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default CustomGeographic;
