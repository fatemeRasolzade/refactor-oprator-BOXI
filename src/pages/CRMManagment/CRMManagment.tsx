import { useCallback, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiPlus, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { CRMCustomerColumn } from "../../global/Column/Columns";
import DeleteModal from "../../global/DeleteModal/DeleteModal";
import Modal from "../../global/Modal/Modal";
import {
  clearCRMCustomer,
  fetchCRMCustomer,
} from "../../redux/CRMCustomerGroup/CRMCustomerGroupReducer";
import { deleteUrls, filterUrls } from "../../services/api.enums";
import { filterTableDataAPI } from "../../services/CRUDServices";
import { ExportExcel } from "../../tools/functions/Methods";
import AddEditCRMManagement from "./views/AddEditCRMManagement";
import CRMManagmentFilter from "./views/CRMManagmentFilter";

const CRMManagment = () => {
  const dispatch = useDispatch();
  const { filter, crmCustomerData } = useSelector(
    (state: any) => state.crmCustomer
  );

  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isModalAddEdit, setIsModalAddEdit] = useState({
    isOpen: false,
    data: null,
  });

  const getDataTable = useCallback(async () => {
    try {
      // const res = await axios({
      //   url: `http://boxi.local:40000/core-api/customersegment/filter?pageNumber=${pageNumbers}&pageSize=10`,
      //   method: "POST",
      //   data: { ...filter, isActive },
      // });
      const res = await filterTableDataAPI(filterUrls.customerSegment, pageNumbers, {
        ...filter,
        isActive,
      });
      dispatch(fetchCRMCustomer(res.data.payload));
    } catch (error) {}
  }, [dispatch, filter, isActive, pageNumbers]);

  const handleDeleteActionNewData = () => {
    getDataTable();
  };

  useEffect(() => {
    if (!isModalAddEdit.isOpen) {
      getDataTable();
    }

    return () => {
      dispatch(clearCRMCustomer());
    };
  }, [dispatch, getDataTable, isModalAddEdit.isOpen]);

  const data: any = crmCustomerData
    ? crmCustomerData?.content?.map((item: any) => {
        return {
          code: item.code,
          name: item.name,
          description: item.description,
          isActive: <span>{item?.isActive ? "فعال" : "غیر فعال"}</span>,
          operation: (
            <div className="flex w-full gap-3 justify-center">
              {/* <DeleteOperation
                itemId={item.id}
                title={"حذف مشتری"}
                route={`http://boxi.local:40000/core-api/customersegment/${item?.id}`}
                handleDeleteActionNewData={() => getDataTable()}
              /> */}
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
                  setIsModalAddEdit((prev) => {
                    return { ...prev, isOpen: !prev.isOpen, data: item };
                  })
                }
              >
                <AiOutlineEdit size={20} className="w-full h-full" />
              </button>
            </div>
          ),
        };
      })
    : [];
  return (
    <div>
      <Breadcrumb curentPage="تعریف گروه مشتری" beforePage="CRM" />
      <CRMManagmentFilter />
      <OptionsTable
        exportExcel={() => ExportExcel(crmCustomerData?.content)}
        isActive={isActive}
        setIsActive={(value: boolean) => {
          setIsActive(value);
        }}
        addComponentProps={() => (
          <button
            className={`btn full-tomato-btn w-full`}
            onClick={() =>
              setIsModalAddEdit((prev) => {
                return { ...prev, isOpen: !prev.isOpen };
              })
            }
          >
            <span className="px-5">افزودن</span>
            <span>
              <BiPlus color="white" />
            </span>
          </button>
        )}
      />
      <StaticTable
        data={data ? data : []}
        column={CRMCustomerColumn}
        pagination={crmCustomerData?.totalElements}
        selectable={false}
      />
      <Modal
        visible={isModalAddEdit.isOpen}
        setVisible={(e: any) =>
          setIsModalAddEdit((prev) => {
            return { ...prev, isOpen: false, data: null };
          })
        }
        title={isModalAddEdit.data ? "ویرایش گروه" : "افزودن گروه"}
      >
        <>
          <AddEditCRMManagement
            currentData={isModalAddEdit.data}
            setIsModalAddEdit={setIsModalAddEdit}
          />
        </>
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
        route={deleteUrls.customersegment}
        handleDeleteActionNewData={handleDeleteActionNewData}
      />
    </div>
  );
};

export default CRMManagment;
