import React, { FC, useEffect, useState } from "react";
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
import { apiRoute } from "../../services/apiRoute";
import AddEditPerson from "./view/AddEditPerson";
import EditPersonRole from "./view/EditPersonRole";

import PersonnelSearchFrom from "./view/PersonnelSearchFrom";

interface PersonnelProps {}

const Personnel: FC<PersonnelProps> = (): JSX.Element => {
  const dispatch = useDispatch();

  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { personnelList, isUpdating } = useSelector(
    (state: any) => state.personnel
  );

  const [isActive, setIsActive] = useState<boolean>(true);
  const [filterData, setFilterData] = useState({
    personelCode: "",
    name: "",
    nationalCode: "",
    mobile: "",
    email: "",
    username: "",
    isActive: isActive,
    pageNumber: pageNumbers,
  });

  const handleGetnewDataOnDelete = () => {
    dispatch(PersonnelData({ ...filterData, pageNumber: pageNumbers }) as any);
  };

  useEffect(() => {
    dispatch(PersonnelData({ ...filterData, pageNumber: pageNumbers }) as any);

    return () => dispatch(clearPersonnel() as any);
  }, [dispatch, isUpdating, isActive, filterData, pageNumbers]);

  const data: any =
    personnelList?.content || personnelList?.content?.length !== 0
      ? personnelList?.content?.map((item: any) => {
          return {
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
                  route={`http://boxi.local:40000/resource-api/employee/${item.id}`}
                  updating={updating}
                  handleDeleteActionNewData={handleGetnewDataOnDelete}
                />
                <EditPersonRole currentData={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="مدیریت پرسنل" />
      <PersonnelSearchFrom isActive={isActive} setFilterData={setFilterData} />
      <OptionsTable
        addComponentProps={() => <AddEditPerson />}
        setIsActive={(value) => {
          setFilterData({
            ...filterData,
            isActive: value,
          });
          setIsActive(!isActive);
        }}
        isActive={isActive}
      />
      <StaticTable
        data={data ? data : []}
        column={PersonnelColumn}
        pagination={personnelList?.totalElements}
      />
    </div>
  );
};

export default Personnel;
