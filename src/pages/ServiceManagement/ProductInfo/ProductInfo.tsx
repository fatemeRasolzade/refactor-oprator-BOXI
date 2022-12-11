import axios from "axios";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import InputSelect from "../../../global/InputSelect/InputSelect";
import CustomSwitch from "../../../global/Switch/Switch";

const ProductInfo = () => {
  const getOptionsData = useCallback(async () => {
    try {
      const res = await axios({});
    } catch (error) {}
  }, []);

  const saveData = useCallback(async () => {
    try {
    } catch (error) {}
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: {},
    initialValues: {
      isActive: true,
      isSuperAdmin: {},
    },
    onSubmit: async (values, { resetForm }) => {},
  });
  return (
    <div>
      <Breadcrumb beforePage="تعریف مشخصات محصول" curentPage="مدیریت سرویس" />
      <form className=" w-full">
        <div className="grid grid-cols-7 my-6 border rounded-xl gap-6 pt-6 px-6">
          <div className="col-span-2">
            <InputSelect
              important
              wrapperClassName="w-full"
              name="isSuperAdmin"
              label="سوپر ادمین"
              values={formik.values.isSuperAdmin}
              handleChange={formik.setFieldValue}
              options={[]}
              error={formik.touched.isSuperAdmin && formik.errors.isSuperAdmin}
            />
          </div>
          <div className="col-span-2">
            <InputSelect
              important
              wrapperClassName="w-full"
              name="isSuperAdmin"
              label="سوپر ادمین"
              values={formik.values.isSuperAdmin}
              handleChange={formik.setFieldValue}
              options={[]}
              error={formik.touched.isSuperAdmin && formik.errors.isSuperAdmin}
            />
          </div>
          <div className="col-span-2">
            <InputSelect
              important
              wrapperClassName="w-full"
              name="isSuperAdmin"
              label="سوپر ادمین"
              values={formik.values.isSuperAdmin}
              handleChange={formik.setFieldValue}
              options={[]}
              error={formik.touched.isSuperAdmin && formik.errors.isSuperAdmin}
            />
          </div>
          <div className="py-3 col-span-1">
            <CustomSwitch
              active={formik.values.isActive}
              handleChange={(checked: any) =>
                formik.setFieldValue("isActive", checked)
              }
            />
          </div>
        </div>
      </form>
      <StaticTable data={[]} column={[]} pagination={7} selectable={false} />
    </div>
  );
};

export default ProductInfo;
