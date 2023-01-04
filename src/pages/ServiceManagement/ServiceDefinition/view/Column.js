export const ServiceDefineColumns = [
  {
    accessor: "id",
    Header: "",
    key: "id",
    header: "",
    // Cell: ({ row }) => {
    // return <>{row.index + 1}</>;
    // },
  },

  {
    accessor: "product",
    Header: "محصول ",
    key: "product",
    header: "محصول",
    // Cell: ({ cell }) => {
    //   return <>{cell.value?.text}</>;
    // },
  },
  {
    accessor: "code",
    Header: "کد ",
    width: "auto",
    key: "code",
    header: "کد",
    // Cell: ({ cell }) => {
    // return <>{SplitNumber(cell.value.text)}</>;
    // },
  },
  {
    accessor: "priceList",
    Header: "نرخ نامه ",

    // Cell: ({ cell }) => {
    //   return <>{cell.value?.text}</>;
    // },
    key: "priceList",
    header: "نرخ نامه",
  },
  {
    accessor: "name",
    Header: "عنوان ",
    key: "name",
    header: "عنوان",
  },
  {
    accessor: "minimumOrderQuantity",
    Header: "حداقل سفارش ",
    key: "minimumOrderQuantity",
    header: "حداقل سفارش",
  },
  {
    accessor: "description",
    Header: "شرح سرویس ",
    key: "description",
    header: "شرح سرویس ",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    key: "isActive",
    header: "وضعیت ",
    // width: "auto",
    // Cell: ({ cell }) => {
    //   return cell.value === true ? <>فعال</> : <>غیر فعال</>;
    // },
  },
  {
    Header: "عملیات",
    accessor: "operation",
    key: "",
    header: "",
  },
];
