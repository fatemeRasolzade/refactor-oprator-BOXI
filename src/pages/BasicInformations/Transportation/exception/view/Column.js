
import {SplitString,SplitNumber} from '../../../../../tools/functions/Methods'
export const ExceptionColumns = [
  {
    accessor: "code",
    Header: "کد",
    width: "auto",
  },
  {
    accessor: "name",
    Header: "عنوان",
    width: "auto",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    width: "auto",
    Cell: ({ value, row }) => {
      console.log("row", value);
      return <>{value ? "فعال" : "غیر فعال"}</>;
    },
  },
  {
    accessor: "distanceFromPreviousHub",
    Header: "نوع",
    width: "auto",
    Cell: ({ value, row }) => {
      return <>{row.original.type.type}</>;
    },
  },
  {
    accessor: "description",
    Header: "توضیحات",
    width: "auto",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
