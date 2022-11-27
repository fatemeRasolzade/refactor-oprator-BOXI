import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { RoleColumn } from "../../global/Column/Columns";
import { clearRole, RoleData } from "../../redux/RolsData/RolesData";
import Operation from "./view/Operation";
import SearchFilter from "./view/SearchFilter";

interface RolesProps {}

const Roles: FC<RolesProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { rolesList, isUpdating } = useSelector((state: any) => state.role);

  useEffect(() => {
    dispatch(
      RoleData({
        code: "",
        name: "",
        isActive: true,
      }) as any
    );
    return () => dispatch(clearRole() as any);
  }, [dispatch, isUpdating]);

  const data =
    rolesList?.content?.length !== 0
      ? rolesList?.content?.map((item: any) => {
          return {
            name: item.name,
            selectPermissions: item?.selectPermissions?.map(
              (permissionItem: any) => permissionItem.text
            ),
            operation: <Operation itemValue={item} />,
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="هاب" />
      <SearchFilter />
      <OptionsTable />
      <StaticTable data={data ? data : []} column={RoleColumn} pagination />
    </div>
  );
};

export default Roles;
