import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { PersonnelColumn } from "../../global/Column/Columns";
import {
  clearPersonnel,
  PersonnelData,
} from "../../redux/PersonData/PersonsData";

const Personnel = () => {
  const dispatch = useDispatch();
  const { personnelList } = useSelector((state: any) => state.personnel);

  useEffect(() => {
    dispatch(PersonnelData() as any);
    return () => dispatch(clearPersonnel() as any);
  }, []);

  const data: any =
    personnelList?.content || personnelList?.content?.length !== 0
      ? personnelList?.content?.map((item: any) => {
          return {
            personelCode: item.personelCode,
            nationalCode: item.nationalCode,
            name: item.name,
            mobile: item.mobile,
            email: item.email,
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="مدیریت پرسنل" />
      <NavbarSearch
        firstTextInput="کد پرسنلی"
        secondTextInput="نام و نام خانوادگی"
      />
      <OptionsTable />
      <StaticTable
        data={data ? data : []}
        column={PersonnelColumn}
        pagination
      />
    </div>
  );
};

export default Personnel;
