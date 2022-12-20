export const ADMVehicleColumn = [
  {
    accessor: "pelak",
    Header: "شماره پلاک",
  },
  {
    accessor: "vehicleMakeSelect",
    Header: "مدل",
    Cell: ({ cell }) => cell.value?.text,
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
    Cell: ({ cell }) => cell.value?.text,
  },
  {
    accessor: "timeWork",
    Header: "بازه زمان کاری",
  },
  {
    accessor: "selectRoute",
    Header: "مسیر",
    Cell: ({ cell }) => cell.value?.text,
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
