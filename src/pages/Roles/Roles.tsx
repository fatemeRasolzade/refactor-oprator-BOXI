import React, { useCallback } from "react";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { RoleColumn } from "../../global/Column/Columns";

const Roles = () => {
  const getData = useCallback(() => {
    const params = `/filter?pageNumber=1&pageSize=20`;
    
  }, []);

  return (
    <div>
      <Breadcrumb curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable />
      <StaticTable data={[]} column={RoleColumn} />
    </div>
  );
};

export default Roles;
