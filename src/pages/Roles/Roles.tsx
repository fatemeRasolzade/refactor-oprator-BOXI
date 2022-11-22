import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { RoleColumn } from "../../global/Column/Columns";
import { clearRole, RoleData } from "../../redux/RolsData/RolesData";

const Roles = () => {
  const dispatch = useDispatch();
  const { rolesList } = useSelector((state: any) => state.role);

  useEffect(() => {
    dispatch(RoleData() as any);

    return () => dispatch(clearRole() as any);
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
