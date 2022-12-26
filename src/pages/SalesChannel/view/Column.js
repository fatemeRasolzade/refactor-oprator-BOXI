export const SaleChannelColumn = [
  {
    accessor: "code",
    Header: "کد  ",

  },
  {
    accessor: "name",
    Header: "عنوان",

  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    width: "auto",
    Cell: ({ cell }) => {

    return cell.value === true ? (
      <span >فعال</span>
    ) : (
      <span>غیر فعال</span>
    );
    },

  },
  {
    accessor: "description",
    Header: "توضیحات",

  },
  
  {
    Header: "عملیات",
    accessor: "operation",
  },
 
];
