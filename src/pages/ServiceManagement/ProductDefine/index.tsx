import { useState } from "react";

import { useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../components/tableOperation/DeleteOperation";
import { updating } from "../../../redux/ProductDefineData/ProductDefineData";
import { apiRoute } from "../../../services/apiRoute";
import { ExportExcel } from "../../../tools/functions/Methods";
import ActionForms from "./view/ActionsForm";
import { ProductColumns } from "./view/Column";

import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
// import * as XLSX  from "xlsx-js-style"

const ProductDefine = () => {
  // @ts-ignore
  const [isActive, setIsACtive] = useState(true);
  const { errorMessage, productLists, isUpdating } = useSelector(
    (state: any) => state.productDefine
  );
  const exportExcel = () => {
    // let row = [
    //     { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
    //     { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "#a50202" } } } },
    //     { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "#a50202" } } } },
    //     { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
    // ];
    // XLSX.utils.aoa_to_sheet([row])
    //
    // let web=XLSX.utils.book_new(),
    //     ws=XLSX.utils.json_to_sheet(payload.content)
    //
    // XLSX.utils.book_append_sheet(web,ws,"myfile")
    // XLSX.writeFile(web,"MyExcel.xlsx")
  };

  // useEffect(() => {
  //   dispatch(
  //     productData({
  //       code: "",
  //       name: "",
  //       isActive: isActive,
  //     }) as any
  //   );
  // }, [isUpdating]);
  const data =
    productLists?.content?.length !== 0
      ? productLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف محصول"}
                  route={apiRoute().delete.productDefine + `/${item.id}`}
                  updating={updating}
                />
                <ActionForms itemValue={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="تعریف محصول" />
      <SearchForm isActive={isActive} isUpdating={isUpdating} />
      <OptionsTable
        setIsACtive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <ActionForms />}
        exportExcel={() => ExportExcel(productLists?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={ProductColumns}
        pagination={productLists?.totalElements}
      />
    </div>
  );
};

export default ProductDefine;
