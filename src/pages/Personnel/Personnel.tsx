import React, { FC, useEffect } from "react";
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
  const { personnelList, isUpdating } = useSelector(
    (state: any) => state.personnel
  );

  useEffect(() => {
    dispatch(PersonnelData() as any);
    return () => dispatch(clearPersonnel() as any);
  }, [dispatch, isUpdating]);

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
                  route={apiRoute().delete.role + `/${item.id}`}
                  updating={updating}
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
      <PersonnelSearchFrom />
      <OptionsTable addComponentProps={() => <AddEditPerson />} />
      <StaticTable
        data={data ? data : []}
        column={PersonnelColumn}
        pagination
      />
    </div>
  );
};

export default Personnel;
