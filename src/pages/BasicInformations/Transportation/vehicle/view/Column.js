
import {SplitNumber} from '../../../../../tools/functions/Methods'
export const VehicleColumns = [
  {
    accessor: "id",
    Header: "",
    Cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },

  {
    accessor: "pelak",
    Header: "شماره پلاک",
    width: "auto",
  },

  {
    accessor: "vehicleCategorySelect",
    Header: "نوع وسیله نقلیه",
    width: "auto",
    Cell: ({ cell }) => {
    return (
      <>{cell.value?.text}</>
    );
    },
  },
  {
    accessor: "fleetTypeSelect",
    Header: "نوع ناوگان",
    width: "auto",
    Cell: ({ cell }) => {
    return <>{cell.value?.text}</>;
    },
  },

  {
    accessor: "selectHub",
    Header: "کد هاب",
    width: "auto",
    Cell: ({ cell }) => {
    return <>{SplitNumber(cell.value?.text)}</>;
    },
  },
  {
    accessor: "hubname",
    Header: "نام هاب",
    width: "auto",
    // Cell: ({ cell }) => {
    //   return <>{cell.value?.text}</>;
    //   },
  },
  {
    accessor: "vehicleMakeSelect",
    Header: "مدل",
    width: "auto",
    Cell: ({ cell }) => {
    return <>{cell.value?.text}</>;
    },
  },
  {
    accessor: "weightCapacity",
    Header: "ظرفیت وزنی (کیلوگرم)",
    width: "auto",
  },
  {
    accessor: "volumeCapacity",
    Header: "ظرفیت حجمی (متر مکعب)",
    width: "auto",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
