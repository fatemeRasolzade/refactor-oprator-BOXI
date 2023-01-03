import { FC, useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSwitch from "../../../global/Switch/Switch";
import InputText from "../../../global/InputText/InputText";
import axios from "axios";
import MultiSelect from "../../../global/multiselect/MultiSelect";
import MultiLineText from "../../../global/MultiLineText/MultiLineText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { toast } from "react-toastify";
import { addEditUrls, getUrls, selectUrls } from "../../../services/api.enums";
import { addEditDataAPI, getAPI } from "../../../services/CRUDServices";

interface SetIsModalAddEditInterface {
  isOpen: boolean;
  data: any;
}
interface AddEditCRMManagementProps {
  currentData?: any;
  setIsModalAddEdit: (currentData: SetIsModalAddEditInterface) => void;
}
const AddEditCRMManagement: FC<AddEditCRMManagementProps> = ({
  currentData,
  setIsModalAddEdit,
}): JSX.Element => {
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>({});

  const validation = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.string().required(),
    selectcustomer: Yup.array(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      code: currentData ? currentData.code : "",
      name: currentData ? currentData.name : "",
      description: currentData ? currentData.description : "",
      selectcustomer: selectedCustomer
        ? selectedCustomer?.segmentCustomers?.map((item: any) => {
            return {
              id: item.selectcustomer.id,
              text: item.selectcustomer.text,
              csID: item?.id,
            };
          })
        : [],
      isActive: true,
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        isActive: values.isActive,
        code: values.code,
        name: values.name,
        description: values.description,
        segmentCustomers:
          values.selectcustomer &&
          values.selectcustomer?.map((item: any) => {
            return {
              selectcustomer: {
                id: item.id,
                text: item.text,
              },
            };
          }),
      };
      const updateData = {
        id: currentData && currentData.id,
        isActive: values.isActive,
        code: values.code,
        name: values.name,
        description: values.description,
        segmentCustomers:
          values.selectcustomer &&
          values.selectcustomer?.map((item: any) => {
            const exists = selectedCustomer?.segmentCustomers?.findIndex(
              (element: any) => element?.selectcustomer?.text === item?.text
            );

            if (exists > -1) {
              return {
                id: selectedCustomer?.segmentCustomers[exists].id,
                selectcustomer: {
                  id: item.id,
                  text: item.text,
                },
              };
            } else {
              return {
                selectcustomer: {
                  id: item.id,
                  text: item.text,
                },
              };
            }
          }),
      };

      try {
        // await axios({
        //   url: "http://boxi.local:40000/core-api/customersegment",
        //   method: currentData ? "put" : "POST",
        //   data: currentData ? updateData : data,
        // });
        addEditDataAPI(
          addEditUrls.customerSegment,
          currentData ? "put" : "post",
          currentData ? updateData : data
        );
        setIsModalAddEdit({
          isOpen: false,
          data: {},
        });
        resetForm();
        setSelectedCustomer({});
        toast.success(
          currentData ? "آیتم با موفقیت ویرایش شد " : "آیتم با موفقیت اضافه شد "
        );
      } catch (error) {}
    },
  });

  const handleGetSelectData = useCallback(async () => {
    try {
      const res = await getAPI(selectUrls.customers);
      setSelectOptions(res.data?.payload?.content);
    } catch (error) {}
  }, []);

  const handleGetEditInfo = useCallback(async (id: number) => {
    try {
      const res = await axios({
        url: `http://boxi.local:40000/core-api/customersegment/${id}`,
        method: "GET",
      });
      // const res = await getAPI(getUrls.customerSegment + `${id}`);
      setSelectedCustomer(res.data?.payload);
    } catch (error) {}
  }, []);

  useEffect(() => {
    handleGetSelectData();
  }, [handleGetSelectData]);
  console.log("current", currentData);

  useEffect(() => {
    if (currentData !== null) {
      handleGetEditInfo(currentData.id);
    }
  }, [currentData, handleGetEditInfo]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="p-6 ">
        <div className="grid grid-cols-5 gap-6 my-6">
          <div className="col-span-2 ">
            <InputText
              wrapperClassName="w-full"
              label="کد"
              name="code"
              handleChange={formik.handleChange}
              values={formik.values.code}
              readOnly={currentData ? true : false}
              important
              type={"text"}
              error={formik.touched.code && formik.errors.code}
            />
          </div>
          <div className="col-span-2 ">
            <InputText
              wrapperClassName="w-full"
              label="عنوان"
              name="name"
              handleChange={formik.handleChange}
              values={formik.values.name}
              important
              type={"text"}
              error={formik.touched.code && formik.errors.name}
            />
          </div>
          <div className={"col-span-1 h-[40px] mb-[20px]"}>
            <CustomSwitch
              active={formik.values.isActive}
              handleChange={(value) => formik.setFieldValue("isActive", value)}
            />
          </div>
          <div className="col-span-5">
            <MultiSelect
              label="مشتری"
              wrapperClassName="w-full"
              options={selectOptions}
              values={formik.values.selectcustomer}
              name="selectcustomer"
              handleChange={formik.setFieldValue}
            />
          </div>
          <div className="col-span-5">
            <MultiLineText
              label=" ویرایشگر"
              values={""}
              name="descriptsdion"
              handleChange={formik.handleChange}
              //   error={formik.touched.description && formik.errors.description}
            />
          </div>
          <div className="col-span-5">
            <MultiLineText
              label=" توضیحات"
              values={formik.values.description}
              name="description"
              handleChange={formik.handleChange}
              error={formik.touched.description && formik.errors.description}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 ">
          <div className="col-span-4 flex gap-4 w-full justify-end">
            <SimpleButton
              type="submit"
              text="بله"
              className="full-tomato-btn px-[90px] "
            />
            <SimpleButton
              type="button"
              text="خیر"
              className="full-lightTomato-btn px-[90px]"
              handelClick={() => {
                setIsModalAddEdit({
                  isOpen: false,
                  data: null,
                });
                formik.resetForm();
                setSelectedCustomer({});
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditCRMManagement;
