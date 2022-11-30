import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "./../../components/staticTable/StaticTable";
import { HubColumn } from "../../global/Column/Columns";
import { useDispatch, useSelector } from "react-redux";
import { clearHub, HubData } from "../../redux/HubData/HubData";
import AddButton from "../../global/addButton/AddButton";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AddExcel from "../../components/exel/AddExcel";
import { apiRoute } from "../../services/apiRoute";
const Hub = () => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.hub.postLists);
  const { pageNumbers } = useSelector((state) => state.paginate);

  useEffect(() => {
    dispatch(HubData());
    console.log("first", payload);
    return () => dispatch(clearHub());
  }, []);

  useEffect(() => {
    dispatch(HubData(pageNumbers));
  }, [pageNumbers]);

  const data =
    payload?.content?.length > 0
      ? payload.content.map((hubItem) => {
          return {
            code: hubItem.code ? hubItem.code : "",
            name: hubItem.name ? hubItem.name : "",
            hubType:
              hubItem.selectHubType !== null ? hubItem.selectHubType?.text : "",
            category:
              hubItem.selectHubCategory !== null
                ? hubItem.selectHubCategory?.text
                : "",
            parentHub:
              hubItem.selectParentHub !== null
                ? hubItem.selectParentHub?.text
                : "",
            addressLine1: hubItem.addressLine1 ? hubItem.addressLine1 : "",
            Ragen:
              hubItem.selectRegion !== null ? hubItem.selectRegion?.text : "",
            deliver: hubItem.dropOffAllowed ? "بله" : "خیر",
            editBy: hubItem.name ? hubItem.name : "",
            EditTime:
              hubItem.locationStartDate !== null
                ? `${hubItem.locationStartDate?.year}/${hubItem.locationStartDate?.month}/${hubItem.locationStartDate?.day} `
                : "",
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable
        addExcelProps={() => (
          <AddExcel
            url={apiRoute().postExcel.exception + "/addinexcel?Entity=service"}
            fileSampleName="transportation.xlsx"
          />
        )}
      />
      <StaticTable
        data={data ? data : []}
        column={HubColumn}
        pagination={payload?.totalElements}
      />
    </div>
  );
};

export default Hub;
