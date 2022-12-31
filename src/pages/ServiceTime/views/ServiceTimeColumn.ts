export const ServiceTimeColumn = [
  {
    accessor: "name",
    Header: "عنوان ",
  },
  {
    accessor: "from",
    Header: "از ",
  },
  {
    accessor: "to",
    Header: "تا ",
  },
  {
    accessor: "selecttedtimeUnit",
    Header: "واحد ",
    Cell: ({ cell }: any) => cell.value?.text,
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }: any) => (cell.value ? "فعال" : "غیر فعال"),
  },
  {
    accessor: "description",
    Header: "توضیحات",
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
