export const ServiceDefineColumns = [
  {
    accessor: "id",
    Header: "",

    // Cell: ({ row }) => {
    // return <>{row.index + 1}</>;
    // },
  },

  {
    accessor: "product",
    Header: "محصول ",
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{cell?.value?.text}</span>;
    },
  },
  {
    accessor: "code",
    Header: "کد ",

   
  },
  {
    accessor: "priceList",
    Header: "نرخ نامه ",
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{cell.value?.text}</span>;
    },
  },
  {
    accessor: "name",
    Header: "عنوان ",

  },
  {
    accessor: "minimumOrderQuantity",
    Header: "حداقل سفارش ",

  },
  {
    accessor: "description",
    Header: "شرح سرویس ",

  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
 
];
