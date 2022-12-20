
import {SplitString} from '../../../../../tools/functions/Methods'
export const VehicleColumns = [
  {
    accessor: "id",
    Header: "",
    width: "auto",
    Cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },
  {
    accessor: "bagNumber",
    Header: "شماره کیسه",
    width: "auto",
  },

  {
    accessor: "selectSourceHub",
    Header: "هاب مبدا ",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value?.text}</>;
    },
  },
  {
    accessor: "selectDestinationHub",
    Header: "هاب مقصد",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value?.text}</>;
    },
  },
  {
    accessor: "selectBagType",
    Header: "نوع کیسه",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{cell?.value?.text}</>;
    },
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
