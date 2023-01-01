import InputText from "../../../../global/InputText/InputText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { BiPlus } from "react-icons/bi";
import StaticTable from "../../../../components/staticTable/StaticTable";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

const SubTableOne = ({ title, setTableOne }: { title?: string; formik?: any; setTableOne?: any }) => {
  const validationSchema = Yup.object().shape({
    discountFrom: Yup.number().required(),
    discountPercent: Yup.number().required(),
    discountTo: Yup.number().required(),
  });

  const [dataTable, setdataTable] = useState<any>([]);

  return (
    <fieldset className="border rounded-lg p-5 !pt-0 mt-5">
      <legend>{title}</legend>
      <Formik
        initialValues={{
          discountFrom: "",
          discountPercent: "",
          discountTo: "",
          serviceDelivery: null,
          type: { id: 0, text: "تعدادی" },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setTableOne((prev: any) => [...prev, values]);
          setdataTable((prev: any) => [values, ...prev]);
        }}
      >
        {(formik) => (
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
        )}
      </Formik>
      <div className="table w-full">
        <StaticTable
          data={dataTable}
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
                <div className="text-center">
                  <BiTrash
                    size={20}
                    className="mx-auto"
                    onClick={() => {
                      console.log(cell);
                      const datas = dataTable.filter((item: any, index: any) => index !== cell.row.index);
                      setdataTable(datas);
                      setTableOne(datas);
                      // const datas=dataTable.filter((item:any)=>!item.id.includes(cell.row.original.id))
                      // setdataTable(datas)
                    }}
                  />
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

export default SubTableOne;
