import { FC, useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiPlus, BiTrash } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { RoleColumn } from "../../global/Column/Columns";
import DeleteModal from "../../global/DeleteModal/DeleteModal";
import Modal from "../../global/Modal/Modal";
import TooltipWrapper from "../../global/tooltip/TooltipWrapper";
import {
  clearRole,
  fetchUpdateRuleData,
  setFilter,
} from "../../redux/RolsData/RolesData";
import { deleteUrls, filterUrls } from "../../services/api.enums";
import { ExportExcel } from "../../tools/functions/Methods";
import AddEditRole from "./view/AddRole";
import SearchFilter from "./view/SearchFilter";
interface setRuleAddEditModal {
  isOpen: boolean;
  isActive: boolean;
  data: object | undefined;
}
interface RolesProps {}

const Roles: FC<RolesProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { rolesList, filter } = useSelector((state: any) => state.role);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const [ruleAddEditModal, setRuleAddEditModal] = useState<setRuleAddEditModal>(
    {
      isOpen: false,
      isActive: false,
      data: undefined,
    }
  );
  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });
  const [isActive, setIsActive] = useState<boolean>(true);
  const handleGetTableData = useCallback(async () => {
    try {
      try {
        dispatch(
          fetchUpdateRuleData({ ...filter, pageNumber: pageNumbers }) as any
        );
      } catch (error) {
        console.log("error ", error);
      }
    } catch (error) {}
  }, [dispatch, pageNumbers, filter]);

  useEffect(() => {
    handleGetTableData();

    return () => {
      dispatch(clearRole() as any);
    };
  }, [dispatch, handleGetTableData]);

  const handleDeleteActionNewData = () => {
    handleGetTableData();
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
                      <div className="text-white" key={permissionItem.id}>
                        {permissionItem.text}
                      </div>
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
                <button
                  className=" border-none	text-[14px]  w-[20px] h-[20px] "
                  onClick={() =>
                    setRuleAddEditModal((prev) => {
                      return { ...prev, isOpen: !prev.isOpen, data: item };
                    })
                  }
                >
                  <AiOutlineEdit size={20} className="w-full h-full" />
                </button>
                <button
                  className=" border-none	text-[14px]  w-[20px] h-[20px]"
                  onClick={() =>
                    setIsOpenModalDelete((prev) => {
                      return { ...prev, isOpen: !prev.isOpen, id: item.id };
                    })
                  }
                >
                  <BiTrash size={20} className="w-full h-full	" />
                </button>
                <button
                  className=" border-none	text-[14px]  w-[20px] h-[20px] "
                  onClick={() =>
                    setRuleAddEditModal((prev) => {
                      return {
                        ...prev,
                        isOpen: !prev.isOpen,
                        data: item,
                        isActive: true,
                      };
                    })
                  }
                >
                  <BsKey size={20} className="w-full h-full" />
                </button>
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb curentPage="مدیریت نقش" />
      <SearchFilter isActive={isActive} />
      <OptionsTable
        exportExcel={() => ExportExcel(rolesList?.content)}
        isActive={isActive}
        setIsActive={(value: boolean) => {
          setIsActive(value);
          dispatch(setFilter({ ...filter, isActive: value }));
        }}
        addComponentProps={() => (
          <button
            className={`btn full-tomato-btn w-full`}
            onClick={() =>
              setRuleAddEditModal((prev) => {
                return {
                  ...prev,
                  isOpen: !prev.isOpen,
                  data: undefined,
                };
              })
            }
          >
            <span className="px-5">افزودن</span>{" "}
            <span>
              <BiPlus color="white" />
            </span>
          </button>
        )}
      />
      <StaticTable
        data={data ? data : []}
        column={RoleColumn}
        pagination={rolesList?.totalElements}
        selectable={false}
      />
      <Modal
        visible={ruleAddEditModal.isOpen}
        setVisible={() =>
          setRuleAddEditModal({
            isOpen: false,
            data: undefined,
            isActive: false,
          })
        }
        title={ruleAddEditModal.data ? "ویرایش  نقش" : "افزودن  نقش"}
      >
        <div className="min-w-[700px]">
          <AddEditRole
            setRuleAddEditModal={setRuleAddEditModal}
            currentData={ruleAddEditModal.data}
            title="تغییر مدیریت نقش"
            isSomeEdit={ruleAddEditModal.isActive}
          />
        </div>
      </Modal>
      <DeleteModal
        isModalOpenDelete={isOpenModalDelete.isOpen}
        setIsModalOpenDelete={() =>
          setIsOpenModalDelete((prev) => {
            return { ...prev, isOpen: false, id: undefined };
          })
        }
        title="حذف نقش"
        itemId={isOpenModalDelete.id}
        route={deleteUrls.rule}
        handleDeleteActionNewData={handleDeleteActionNewData}
      />
    </div>
  );
};

export default Roles;
