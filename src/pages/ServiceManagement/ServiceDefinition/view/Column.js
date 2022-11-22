export const ServiceDefineColumns = [
  {
    accessor: "id",
    Header: "",
    width: "auto",
    // Cell: ({ row }) => {
    // return <>{row.index + 1}</>;
    // },
  },

  {
    accessor: "product",
    Header: "محصول ",
    width: "auto",
    Cell: ({ cell }) => {
      return <span className="flex items-center ">{console.log(cell?.value)}</span>;
    },
  },
  // {
  //   accessor: "code",
  //   Header: "کد ",
  //   width: "auto",
  //   // Cell: ({ cell }) => {
  //   // return <span className="flex items-center ">{SplitNumber(cell.value.text)}</span>;
  //   // },
  // },
  // {
  //   accessor: "priceList",
  //   Header: "نرخ نامه ",
  //   width: "auto",
  //   Cell: ({ cell }) => {
  //     return <span className="flex items-center ">{cell.value?.text}</span>;
  //   },
  // },
  {
    accessor: "name",
    Header: "عنوان ",
    width: "auto",
  },
  // {
  //   accessor: "minimumOrderQuantity",
  //   Header: "حداقل سفارش ",
  //   width: "auto",
  // },
  // {
  //   accessor: "description",
  //   Header: "شرح سرویس ",
  //   width: "auto",
  // },
  // {
  //   accessor: "isActive",
  //   Header: "وضعیت",
  //   width: "auto",
  //   Cell: ({ cell }) => {
  //     return cell.value === true ? (
  //       <span className="flex items-center">فعال</span>
  //     ) : (
  //       <span>غیر فعال</span>
  //     );
  //   },
  // },
  // {
  //   accessor: "handover",
  //   Header: "عملیات",
  //   width: "auto",
  //   Cell: ({ value, row }) => (
  //     <div className="flex ">
  //       <ActionButton
  //         theme={"mainButton"}
  //         onClick={() =>
  //           handleDeletes(deleteService, row.original, "حذف سرویس")
  //         }
  //       >
  //         {" "}
  //         <IconTrash />
  //       </ActionButton>
  //       <ActionButton
  //         theme={"mainButton"}
  //         onClick={() => handleAction(row.original)}
  //       >
  //         <IconPencil />
  //       </ActionButton>
  //     </div>
  //   ),
  // },
];
