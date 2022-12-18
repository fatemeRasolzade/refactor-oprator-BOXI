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
    Cell: ({ cell }) => <span className="flex flex-row">{cell.value?.text}</span>,
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => <span className="centering">{cell.value ? "فعال" : "غیر فعال"}</span>,
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
