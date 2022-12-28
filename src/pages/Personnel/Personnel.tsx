import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { PersonnelColumn } from "../../global/Column/Columns";
import {
  clearPersonnel,
  PersonnelData,
  updating,
} from "../../redux/PersonData/PersonsData";
import { clearRows } from "../../redux/selectRowTable/selectRowTable";
import { ExportExcel } from "../../tools/functions/Methods";
import AddEditPerson from "./view/AddEditPerson";
import EditPersonRole from "./view/EditPersonRole";
import PersonnelSearchFrom from "./view/PersonnelSearchFrom";
import ScopeOfOperation from "./view/ScopeOfOperation";

interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
}

interface PersonnelProps {}

const Personnel: FC<PersonnelProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { personnelList, isUpdating } = useSelector(
    (state: any) => state.personnel
  );
  const userInfo = useSelector((state: any) => state.userInfo);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [selectedCol, setSelectedCol] = useState<Array<SelectedColInterface>>([
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "کد پرسنلی",
      accessor: "personelCode",
    },
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "عملیات",
      accessor: "operation",
    },
  ]);
  const [filterData, setFilterData] = useState({
    personelCode: "",
    name: "",
    nationalCode: "",
    mobile: "",
    email: "",
    username: "",
    isActive: isActive,
    pageNumber: pageNumbers,
    hubList: userInfo?.hublist,
  });

  const handleGetnewDataOnDelete = () => {
    dispatch(
      PersonnelData({
        ...filterData,
        pageNumber: pageNumbers,
        hublist: userInfo?.hublist,
      }) as any
    );
  };
  const handleGetPersonnelCustomization = useCallback(async () => {}, []);

  useEffect(() => {
    dispatch(
      PersonnelData({
        ...filterData,
        pageNumber: pageNumbers,
        hublist: userInfo?.hublist,
      }) as any
    );

    return () => {
      dispatch(clearPersonnel() as any);
      dispatch(clearRows());
    };
  }, [
    dispatch,
    isUpdating,
    isActive,
    filterData,
    pageNumbers,
    userInfo?.hublist,
  ]);
  useEffect(() => {
    handleGetPersonnelCustomization();
  }, [handleGetPersonnelCustomization]);

  const data: any =
    personnelList?.content || personnelList?.content?.length !== 0
      ? personnelList?.content?.map((item: any) => {
          return {
            id: item.id,
            personelCode: item.personelCode,
            nationalCode: item.nationalCode,
            name: item.name,
            mobile: item.mobile,
            email: item.email,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <AddEditPerson currentData={item} />
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف کارمند"}
                  route={`http://boxi.local:40000/resource-api/employee/${item?.id}`}
                  updating={updating}
                  handleDeleteActionNewData={handleGetnewDataOnDelete}
                />
                <EditPersonRole currentData={item} />
                <ScopeOfOperation currentData={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="مدیریت پرسنل" />
      <PersonnelSearchFrom
        isActive={isActive}
        setFilterData={setFilterData}
        selectedCol={selectedCol}
        setSelectedCol={(value: Array<SelectedColInterface>) =>
          setSelectedCol(value)
        }
      />
      <OptionsTable
        addComponentProps={() => <AddEditPerson />}
        exportExcel={() => ExportExcel(personnelList?.content)}
        setIsActive={(value) => {
          setFilterData({
            ...filterData,
            isActive: value,
          });
          setIsActive(!isActive);
        }}
        isActive={isActive}
        customComponent={() => <EditPersonRole isGroup={true} />}
      />

      <StaticTable
        data={data ? data : []}
        column={selectedCol.length > 2 ? selectedCol : PersonnelColumn}
        pagination={personnelList?.totalElements}
        selectable={true}
      />
    </div>
  );
};

export default Personnel;
