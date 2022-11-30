import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ServiceData } from "../../../redux/ServiceDefine/ServiceDefineReducer";
import { ServiceDefineColumns } from "./view/Column";
import SearchForm from "./view/SearchForm";
import StaticTable from "../../../components/staticTable/StaticTable";
import Operation from "./view/Operation";
import OptionsTable from "./view/OptionsTable";



const ServiceDefinition = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { fetchpost, errorMessage, postLists,isUpdating } = useSelector(
    (state: any) => state.serviceDefine
  );
  useEffect(() => {
    dispatch(
      ServiceData({
        code: "",
        name: "",
        isActive: true,
      }) as any
    );
  }, [isUpdating]);
    const data =
    postLists?.content?.length !== 0
      ? postLists?.content?.map((item: any) => {
          return {
           ...item,
            operation: <Operation itemValue={item} />,
          };
        })
      : [];


  if (fetchpost) return <p>Loading...</p>;
  return (
    <div>
      <SearchForm />
      <OptionsTable  />
      <StaticTable data={data?data:[]}  column={ServiceDefineColumns}  pagination/>
    </div>
  );
};

export default ServiceDefinition;
