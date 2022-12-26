import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { CRMCustomerColumn } from "../../global/Column/Columns";
import Modal from "../../global/Modal/Modal";
import {
  clearCRMCustomer,
  fetchCRMCustomer,
} from "../../redux/CRMCustomerGroup/CRMCustomerGroupReducer";
import AddEditCRMManagement from "./views/AddEditCRMManagement";
import CRMManagmentFilter from "./views/CRMManagmentFilter";

const CRMManagment = () => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isModalAddEdit, setIsModalAddEdit] = useState({
    isOpen: false,
    data: {},
  });

  const getDataList = useCallback(async () => {
    try {
      const res = await axios({
        url: "http://boxi.local:40000/core-api/customersegment?filter=",
        method: "post",
        data: {
          isActive: "",
          code: "",
          name: "",
          description: "",
          segmentCustomers: {
            Id: "",
            customerId: "",
          },
        },
      });
      dispatch(fetchCRMCustomer(res.data.payload));
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getDataList();
    return () => {
      dispatch(clearCRMCustomer());
    };
  }, [dispatch, getDataList]);

  return (
    <div>
      <Breadcrumb curentPage="تعریف گروه مشتری" beforePage="CRM" />
      <CRMManagmentFilter />
      <OptionsTable
        // exportExcel={() => ExportExcel(rolesList?.content)}
        isActive={isActive}
        setIsActive={(value: boolean) => {
          //   setFilterData({
          //     permission: "",
          //     name: "",
          //     isActive: value,
          //     pageSize: 10,
          //     pageNumber: pageNumbers,
          //   });
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
        data={[]}
        column={CRMCustomerColumn}
        pagination={2}
        selectable={false}
      />
      <Modal
        visible={isModalAddEdit.isOpen}
        setVisible={(e: any) =>
          setIsModalAddEdit((prev) => {
            return { ...prev, isOpen: e };
          })
        }
        title={isModalAddEdit.data ? "ویرایش" : "افزودن"}
      >
        <>
          <AddEditCRMManagement
            currentData={isModalAddEdit.data}
            setIsModalAddEdit={setIsModalAddEdit}
          />
        </>
      </Modal>
    </div>
  );
};

export default CRMManagment;
