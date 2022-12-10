import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { RoleColumn } from "../../global/Column/Columns";
import TooltipWrapper from "../../global/tooltip/TooltipWrapper";
import { clearRole, RoleData, updating } from "../../redux/RolsData/RolesData";
import { apiRoute } from "../../services/apiRoute";
import AddEditRole from "./view/AddRole";
import SearchFilter from "./view/SearchFilter";

interface RolesProps {}

const Roles: FC<RolesProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { rolesList } = useSelector((state: any) => state.role);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const [isActive, setIsActive] = useState<boolean>(true);
  const [filterData, setFilterData] = useState({
    permission: "",
    name: "",
    isActive: isActive,
    pageSize: 10,
    pageNumber: pageNumbers,
  });

  useEffect(() => {
    dispatch(RoleData({ ...filterData, pageNumber: pageNumbers }) as any);

    return () => dispatch(clearRole() as any);
  }, [dispatch, isActive, pageNumbers, filterData]);

  const handleDeleteActionNewData = () => {
    dispatch(
      RoleData({
        permission: "",
        name: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    rolesList?.content?.length !== 0
      ? rolesList?.content?.map((item: any) => {
          return {
            name: item.name,
            selectPermissions: (
              <div className="w-full flex justify-center">
                <TooltipWrapper
                  textProps={item?.selectPermissions?.map(
                    (permissionItem: any) => (
                      <div>{permissionItem.text}</div>
                    )
                  )}
                >
                  <div>
                    {item?.selectPermissions?.map(
                      (permissionItem: any) => permissionItem.text
                    )}
                  </div>
                </TooltipWrapper>
              </div>
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
                  handleDeleteActionNewData={handleDeleteActionNewData}
                />
                <AddEditRole
                  isSomeEdit={true}
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
      <Breadcrumb curentPage="مدیریت نقش" />
      <SearchFilter isActive={isActive} setFilterData={setFilterData} />
      <OptionsTable
        isActive={isActive}
        setIsActive={(value: boolean) => {
          setFilterData({
            permission: "",
            name: "",
            isActive: value,
            pageSize: 10,
            pageNumber: pageNumbers,
          });
          setIsActive(value);
        }}
        addComponentProps={() => (
          <AddEditRole title="تغییر مدیریت نقش" isActive={isActive} />
        )}
      />
      <StaticTable
        data={data ? data : []}
        column={RoleColumn}
        pagination={rolesList?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Roles;
