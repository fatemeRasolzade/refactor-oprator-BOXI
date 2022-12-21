import { getDay } from "../../../tools/functions/Methods";

export const PriceColumn = [
  {
    accessor: "priceListCode",
    Header: "شماره نرخ نامه ",
  },
  {
    accessor: "priceListName",
    Header: "عنوان ",
  },
  {
    accessor: "priceListDate",
    Header: "تاریخ نرخ نامه ",
    Cell: ({ cell }) => (cell?.value ? getDay(cell?.value) : ""),
  },
  {
    accessor: "validDateTo",
    Header: "تاریخ اعتبار ",
    Cell: ({ cell }) => (cell?.value ? getDay(cell?.value) : ""),
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => (cell.value ? "فعال" : "غیر فعال"),
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
