
import {SplitString,SplitNumber} from '../../../../../tools/functions/Methods'
export const DockColumns = [
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
    Header: "کد بارانداز",
    width: "auto",
  },
  {
    accessor: "name",
    Header: "نام بارانداز",
    width: "auto",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
