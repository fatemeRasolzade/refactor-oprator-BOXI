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
    Cell: ({ cell }) => cell.value?.text,
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => (cell.value ? "فعال" : "غیر فعال"),
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
