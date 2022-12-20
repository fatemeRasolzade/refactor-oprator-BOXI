export const PriceAttributeColumn = [
  {
    accessor: "id",
    Header: "ردیف",
    Cell: ({ row, cell }) => row.index + 1,
  },
  {
    accessor: "product",
    Header: "محصول",
    Cell: ({ cell }) => cell?.value?.text,
  },
  {
    accessor: "consignmentType",
    Header: "نوع مرسوله",
    Cell: ({ cell }) => cell?.value?.text,
  },
  {
    accessor: "totalWight",
    Header: "وزن (کیلوگرم)",
    Cell: ({ cell }) => cell.value?.from + "-" + cell.value?.to,
  },
  {
    accessor: "totalValue",
    Header: "ارزش (ریال)",
    Cell: ({ cell }) => cell.value?.from + "-" + cell.value?.to,
  },
  {
    accessor: "totalNumber",
    Header: "تعداد",
    Cell: ({ cell }) => cell.value?.from + "-" + cell.value?.to,
  },
  {
    accessor: "fromCountryDevision",
    Header: "مبدا",
    Cell: ({ cell }) => cell?.value && cell?.value.length !== 0 && cell?.value?.map((item) => item?.text)?.join(","),
  },
  {
    accessor: "toCountryDevision",
    Header: "مقصد",
    Cell: ({ cell }) => cell?.value && cell?.value.length !== 0 && cell?.value?.map((item) => item?.text)?.join(","),
  },
  {
    accessor: "customDevision",
    Header: "رده سفارشی",
    Cell: ({ cell }) => cell?.value?.text,
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => (cell.value ? "فعال" : "غیر فعال"),
  },
  {
    accessor: "price",
    Header: "قیمت",
  },

  // {
  //     accessor: "handover",
  //     Header: "عملیات",
  //
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
