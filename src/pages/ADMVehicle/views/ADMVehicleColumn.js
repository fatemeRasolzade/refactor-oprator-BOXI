export const ADMVehicleColumn = [
  {
    accessor: "pelak",
    Header: "شماره پلاک",
  },
  {
    accessor: "vehicleMakeSelect",
    Header: "مدل",
    Cell: ({ cell }) => <span className="flex flex-row">{cell.value?.text}</span>,
  },
  {
    accessor: "weightCapacity",
    Header: "ظرفیت وزنی (کیلوگرم)",
  },
  {
    accessor: "volumeCapacity",
    Header: "ظرفیت حجمی (متر مکعب)",
  },
  {
    accessor: "selectHub",
    Header: "هاب مرکز گزارش",
    Cell: ({ cell }) => <span className="flex flex-row">{cell.value?.text}</span>,
  },
  {
    accessor: "timeWork",
    Header: "بازه زمان کاری",
  },
  {
    accessor: "selectRoute",
    Header: "مسیر",
    Cell: ({ cell }) => <span className="flex flex-row">{cell.value?.text}</span>,
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
