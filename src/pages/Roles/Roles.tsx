import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AddExcel from "../../components/exel/AddExcel";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { RoleColumn } from "../../global/Column/Columns";
import { clearRole, RoleData, updating } from "../../redux/RolsData/RolesData";
import { apiRoute } from "../../services/apiRoute";
import AddEditRole from "./view/AddRole";
import SearchFilter from "./view/SearchFilter";

interface RolesProps {}

const Roles: FC<RolesProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { rolesList, isUpdating } = useSelector((state: any) => state.role);

  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    dispatch(
      RoleData({
        code: "",
        name: "",
        isActive: isActive,
      }) as any
    );
    return () => dispatch(clearRole() as any);
  }, [dispatch, isActive]);

  const data =
    rolesList?.content?.length !== 0
      ? rolesList?.content?.map((item: any) => {
          return {
            name: item.name,
            selectPermissions: item?.selectPermissions?.map(
              (permissionItem: any) => permissionItem.text
            ),
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <AddEditRole
                  currentData={item}
                  title="تغییر مدیریت نقش"
                  isActive={isActive}
                />
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف نقش"}
                  route={apiRoute().delete.role + `/${item.id}`}
                  updating={updating}
                />
                <AddEditRole
                  currentData={item}
                  title="تغییر مدیریت نقش"
                  isActive={isActive}
                />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="هاب" />
      <SearchFilter isActive={isActive} />
      <OptionsTable
        isActive={isActive}
        setIsActive={setIsActive}
        addComponentProps={() => (
          <AddEditRole title="تغییر مدیریت نقش" isActive={isActive} />
        )}
      />
      <StaticTable data={data ? data : []} column={RoleColumn} pagination />
    </div>
  );
};

export default Roles;
