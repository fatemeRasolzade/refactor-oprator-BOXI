export const ProductColumns = [
  {
    accessor: "id",
    Header: "",
    key: "id",
    header: "id",
    // Cell: ({ row }) => {
    // return <>{row.index + 1}</>;
    // },
  },

  {
    accessor: "code",
    Header: "کد ",
    key: "code",
    header: "کد ",
  },
  {
    accessor: "name",
    Header: "عنوان",
    key: "name",
    header: " عنوان",
  },
  {
    accessor: "productGroup",
    Header: "گروه بندی محصول ",
    width: "auto",

    // Cell: ({ cell }) => {
    //   return cell.value?.text;
    // },
    key: "productGroup",
    header: "گروه بندی محصول ",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    width: "auto",
    Cell: ({ cell }) => {
      return cell.value === true ? <span>فعال</span> : <span>غیر فعال</span>;
    },
    key: "isActive",
    header: "وضعیت",
  },
  {
    accessor: "description",
    Header: "توضیحات",
    width: "auto",
    key: "description",
    header: " توضیحات",
  },
  {
    Header: "عملیات",
    accessor: "operation",
    key: "",
    header: " ",
  },
];
