import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { RoleColumn } from "../../global/Column/Columns";
import { clearRole, RoleData } from "../../redux/RolsData/RolesData";
import Operation from "./Operation";

const Roles = () => {
  const dispatch = useDispatch();
  const { rolesList } = useSelector((state: any) => state.role);

  useEffect(() => {
    dispatch(RoleData() as any);
    return () => dispatch(clearRole() as any);
  }, []);

  const data =
    rolesList?.content || rolesList?.content?.length !== 0
      ? rolesList?.content?.map((item: any) => {
          return {
            name: item.name,
            selectPermissions: item?.selectPermissions.map(
              (permissionItem: any) => permissionItem.text
            ),
            operation: <Operation id={item.id} />,
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد  هاب" />
      <OptionsTable />
      <StaticTable data={data ? data : []} column={RoleColumn}  pagination/>
    </div>
  );
};

export default Roles;
