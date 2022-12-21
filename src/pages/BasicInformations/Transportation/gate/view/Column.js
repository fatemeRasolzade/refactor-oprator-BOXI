
import {SplitString,SplitNumber} from '../../../../../tools/functions/Methods'
export const GateColumns = [
  {
    accessor: "id",
    Header: "",
    width: "auto",
    Cell: ({ row }) => {
      return <>{row.index + 1}</>;
    },
  },

  // {
  //   accessor: "selectHub",
  //   Header: "کد هاب ",
  //   width: "auto",
  //   Cell: ({ cell }) => {
  //     return <>{SplitNumber(cell?.value?.text)}</>;
  //   },
  // },
  {
    accessor: "selectHub",
    Header: "نام هاب",
    width: "auto",
    Cell: ({ cell }) => {
      return <>{SplitString(cell?.value?.text)}</>;
    },
  },
  {
    accessor: "code",
    Header: "کد درب",
    width: "auto",
  },
  {
    accessor: "name",
    Header: "نام درب",
    width: "auto",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
