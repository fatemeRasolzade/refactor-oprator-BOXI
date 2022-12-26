export const ServiceDefineColumns = [
  {
    accessor: "id",
    Header: "",
    width: "auto",
    // Cell: ({ row }) => {
    // return <>{row.index + 1}</>;
    // },
  },

  {
    accessor: "product",
    Header: "محصول ",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell.value?.text}</>;
    },
  },
  {
    accessor: "code",
    Header: "کد ",
    width: "auto",
    // Cell: ({ cell }) => {
    // return <>{SplitNumber(cell.value.text)}</>;
    // },
  },
  {
    accessor: "priceList",
    Header: "نرخ نامه ",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell.value?.text}</>;
    },
  },
  {
    accessor: "name",
    Header: "عنوان ",
    width: "auto",
  },
  {
    accessor: "minimumOrderQuantity",
    Header: "حداقل سفارش ",
    width: "auto",
  },
  {
    accessor: "description",
    Header: "شرح سرویس ",
    width: "auto",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    width: "auto",
    Cell: ({ cell }) => {
      return cell.value === true ? <>فعال</> : <>غیر فعال</>;
    },
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
