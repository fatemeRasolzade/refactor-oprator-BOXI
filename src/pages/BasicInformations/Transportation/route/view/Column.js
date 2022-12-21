export const RouteColumns = [
  {
    accessor: "id",
    Header: "",
    
    Cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },

  {
    accessor: "code",
    Header: "کد مسیر",
    
  },
  {
    accessor: "name",
    Header: "نام مسیر ",
    
  },
  {
    accessor: "selectSourceHub",
    Header: "مبدا",
    
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{cell.value.text.split(/([0-9]+)/)[0]}</span>;
    },
  },
  {
    accessor: "selectTargetHub",
    Header: "مقصد",
    
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{cell.value.text.split(/([0-9]+)/)[0]}</span>;
    },
  },

  {
    accessor: "nodes",
    Header: "تعداد گره ها",
    
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
