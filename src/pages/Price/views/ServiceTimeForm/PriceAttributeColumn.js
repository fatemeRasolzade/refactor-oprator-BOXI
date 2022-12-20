export const PriceAttributeColumn = [
  {
    accessor: "id",
    Header: "",
    width: "auto",
    Cell: ({ row, cell }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessor: "product",
    Header: "محصول",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value?.text}</>;
    },
  },
  {
    accessor: "consignmentType",
    Header: "نوع مرسوله",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value?.text}</>;
    },
  },
  {
    accessor: "totalWight",
    Header: "وزن (کیلوگرم)",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell.value?.from + "-" + cell.value?.to}</>;
    },
  },
  {
    accessor: "totalValue",
    Header: "ارزش (ریال)",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell.value?.from + "-" + cell.value?.to}</>;
    },
  },
  {
    accessor: "totalNumber",
    Header: "تعداد",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell.value?.from + "-" + cell.value?.to}</>;
    },
  },
  {
    accessor: "fromCountryDevision",
    Header: "مبدا",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value && cell?.value.length !== 0 && cell?.value?.map((item) => item?.text)?.join(",")}</>;
    },
  },
  {
    accessor: "toCountryDevision",
    Header: "مقصد",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value && cell?.value.length !== 0 && cell?.value?.map((item) => item?.text)?.join(",")}</>;
    },
  },
  {
    accessor: "customDevision",
    Header: "رده سفارشی",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value?.text}</>;
    },
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    width: "auto",
    Cell: ({ cell }) => {
      return cell.value === true ? <span className="flex items-center">فعال</span> : <span>غیر فعال</span>;
    },
  },
  {
    accessor: "price",
    Header: "قیمت",
    width: "auto",
  },

  // {
  //     accessor: "handover",
  //     Header: "عملیات",
  //     width: "auto",
  //     Cell: ({ value, row }) => (
  //         <div className="flex ">
  //             <ActionButton
  //                 theme={"mainButton"}
  //                 onClick={() => handleManualDeletes(row.index, row.original, "حذف نرخ نامه")}
  //             >
  //                 {" "}
  //                 <IconTrash />
  //             </ActionButton>
  //             <ActionButton
  //                 theme={"mainButton"}
  //                 onClick={() => handleAction(row.index, row.original)}
  //             >
  //                 <IconPencil />
  //             </ActionButton>
  //         </div>
  //     ),
  // },
];
