export const VehicleModelColumns = [
  {
    accessor: "id",
    Header: "",
    Cell: ({ row, cell }) => {
      return <>{row.index + 1}</>;
    },
  },

  {
    accessor: "name",
    Header: "نام مدل ",
  },
  {
    accessor: "code",
    Header: "کد مدل",
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
    accessor: "consignmentCapacity",
    Header: "ظرفیت مرسوله (تعداد)",
  },
  {
    accessor: "fuelTypeSelect",
    Header: "نوع سوخت",
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{cell.value?.text}</span>;
    },
  },
  {
    accessor: "vendorSelect",
    Header: "نام شرکت نقلیه",
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{cell.value?.text}</span>;
    },
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
