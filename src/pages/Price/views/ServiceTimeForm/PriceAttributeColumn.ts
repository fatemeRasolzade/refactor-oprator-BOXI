export const PriceAttributeColumn = [
  {
    accessor: "id",
    Header: "ردیف",
    Cell: ({ row }: any) => row.index + 1,
  },
  {
    accessor: "product",
    Header: "محصول",
    Cell: ({ cell }: any) => cell?.value?.text,
  },
  {
    accessor: "consignmentType",
    Header: "نوع مرسوله",
    Cell: ({ cell }: any) => cell?.value?.text,
  },
  {
    accessor: "totalWight",
    Header: "وزن (کیلوگرم)",
    Cell: ({ cell }: any) => cell.value?.from + "-" + cell.value?.to,
  },
  {
    accessor: "totalValue",
    Header: "ارزش (ریال)",
    Cell: ({ cell }: any) => cell.value?.from + "-" + cell.value?.to,
  },
  {
    accessor: "totalNumber",
    Header: "تعداد",
    Cell: ({ cell }: any) => cell.value?.from + "-" + cell.value?.to,
  },
  {
    accessor: "fromCountryDevision",
    Header: "مبدا",
    Cell: ({ cell }: any) => cell?.value && cell?.value.length !== 0 && cell?.value?.map((item: any) => item?.text)?.join(","),
  },
  {
    accessor: "toCountryDevision",
    Header: "مقصد",
    Cell: ({ cell }: any) => cell?.value && cell?.value.length !== 0 && cell?.value?.map((item: any) => item?.text)?.join(","),
  },
  {
    accessor: "customDevision",
    Header: "رده سفارشی",
    Cell: ({ cell }: any) => cell?.value?.text,
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }: any) => (cell.value ? "فعال" : "غیر فعال"),
  },
  {
    accessor: "price",
    Header: "قیمت",
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
