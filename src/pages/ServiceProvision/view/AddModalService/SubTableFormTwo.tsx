<<<<<<< HEAD
import InputText from "../../../../global/InputText/InputText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { BiPlus } from "react-icons/bi";
import StaticTable from "../../../../components/staticTable/StaticTable";
import { useFormik } from "formik";
import { BiTrash } from "react-icons/bi";
import * as Yup from "yup";
import { useState } from "react";
=======
import InputText from '../../../../global/InputText/InputText'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton'
import { BiPlus } from 'react-icons/bi';
import StaticTable from '../../../../components/staticTable/StaticTable';
import {useFormik} from "formik"
import { BiTrash } from 'react-icons/bi';
import * as Yup from "yup"
import { useState } from 'react';
>>>>>>> 4ed856f3a22b506646a7ebb8dd102effef5dd037

const SubTableTwo = ({ title, setTableTwo }: { title?: string; formik?: any; setTableTwo?: any }) => {
  const validationSchema = Yup.object().shape({
    discountFrom: Yup.number().required(),
    discountPercent: Yup.number().required(),
    discountTo: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      discountFrom: "",
      discountPercent: "",
      discountTo: "",
      serviceDelivery: null,
      type: { id: 1, text: "محاسباتی" },
    },
    validationSchema,
    onSubmit: (values) => {
      setTableTwo((prev: any) => [...prev, values]);
      setdataTableTwo((prev: any) => [...prev, { ...values, id: crypto.randomUUID() }]);
    },
  });

  const [dataTableTwo, setdataTableTwo] = useState<any>([]);
  return (
    <fieldset className="border rounded-lg p-5 !pt-0 mt-5">
      <legend>{title}</legend>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <InputText
          label="از"
          name="discountFrom"
          handleChange={formik.handleChange}
          values={formik.values.discountFrom}
          important
          wrapperClassName=" col-span-1 mt-3"
          error={formik.touched.discountFrom && formik.errors.discountFrom}
        />
        <InputText
          label="تا"
          name="discountTo"
          handleChange={formik.handleChange}
          values={formik.values.discountTo}
          important
          wrapperClassName=" col-span-1 mt-3"
          error={formik.touched.discountTo && formik.errors.discountTo}
        />
        <InputText
          label="درصد"
          name="discountPercent"
          handleChange={formik.handleChange}
          values={formik.values.discountPercent}
          important
          wrapperClassName=" col-span-1 mt-3"
          error={formik.touched.discountPercent && formik.errors.discountPercent}
        />
        <SimpleButton text="درج در لیست" icon={<BiPlus />} className="full-tomato-btn mt-3" type="submit" />
      </form>
      <div className="table w-full">
        <StaticTable
          data={dataTableTwo}
          column={[
            {
              Header: "از",
              accessor: "discountFrom",
            },
            {
              Header: "تا",
              accessor: "discountTo",
            },
            {
              Header: "درصد",
              accessor: "discountPercent",
            },
            {
              accessor: "action",
              Header: "عملیات",

              Cell: ({ cell }: any) => (
                <div
                  className="text-center"
                  onClick={() => {
                    // const datas=dataTableTwo.filter((item:any)=>!item.id.includes(cell.row.original.id))
                    const datas = dataTableTwo.filter((item: any, index: any) => index !== cell.row.index);
                    setdataTableTwo(datas);
                    setTableTwo(datas);
                  }}
                >
                  <BiTrash size={20} className="mx-auto" />
                </div>
              ),
            },
          ]}
          pagination
          selectable={false}
        />
      </div>
    </fieldset>
  );
};

export default SubTableTwo;
