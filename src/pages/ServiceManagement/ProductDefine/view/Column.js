export const ProductColumns = [
  {
    accessor: "id",
    Header: "",

    // Cell: ({ row }) => {
    // return <>{row.index + 1}</>;
    // },
  },

  {
    accessor: "code",
    Header: "کد ",
  },
  {
    accessor: "name",
    Header: "عنوان",
  
  },
  {
    accessor: "productGroup",
    Header: "گروه بندی محصول ",
    width: "auto",
    Cell: ({ cell }) => {
    return <span className="flex items-center ">{cell.value?.text}</span>;
    },

  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    width: "auto",
    Cell: ({ cell }) => {

    return cell.value === true ? (
      <span className="flex items-center">فعال</span>
    ) : (
      <span>غیر فعال</span>
    );
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
