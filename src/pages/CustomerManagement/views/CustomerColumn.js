import TooltipWrapper from "../../../global/tooltip/TooltipWrapper";

export const CustomerColumns = [
  {
    accessor: "code",
    Header: "شماره مشتری",
  },
  {
    accessor: "name",
    Header: "نام مشتری",
  },
  {
    accessor: "selectCustomerType",
    Header: "نوع مشتری",
    Cell: ({ cell }) => cell.value?.text,
  },
  {
    accessor: "nationalCode",
    Header: "کد/شناسه ملی",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => (cell.value ? "فعال" : "غیر فعال"),
  },
  {
    accessor: "selectParentCustomer",
    Header: "مشتری والد",
    Cell: ({ cell }) => cell.value?.text,
  },
  {
    accessor: "telephones",
    Header: "شماره تماس ",
    Cell: ({ cell }) =>
      cell.value.length > 1 ? (
        <TooltipWrapper
          textProps={cell?.value?.map((tel) => (
            <div className="text-white">{tel.telNumber}</div>
          ))}
        >
          {cell.value.length > 0 && (
            <>
              {cell.value[0].telephonePrefix}
              {cell.value[0].telNumber}
            </>
          )}
        </TooltipWrapper>
      ) : (
        cell.value.length > 0 && (
          <>
            {cell.value[0].telephonePrefix}
            {cell.value[0].telNumber}
          </>
        )
      ),
  },
  {
    accessor: "email",
    Header: "پست الکترونیک ",
  },
  {
    accessor: "currentCredit",
    Header: "اعتبار جاری ",
  },
  {
    accessor: "creditLimit",
    Header: "سقف اعتبار  ",
  },
  {
    accessor: "initialCredit",
    Header: "اعتبار اولیه  ",
  },
  {
    accessor: "addresses",
    Header: "آدرس",
    Cell: ({ cell }) =>
      cell.value.length > 1 ? (
        <TooltipWrapper
          textProps={cell?.value?.map((a) => (
            <div className="text-white">{a.address}</div>
          ))}
        >
          {cell.value.length > 0 && <>{cell.value[0].address}</>}
        </TooltipWrapper>
      ) : (
        cell.value.length > 0 && <>{cell.value[0].address}</>
      ),
  },
  // {
  // 	accessor: "name",
  // 	Header: "تاریخ ایجاد",
  // 	width: "auto",
  // },
  // {
  // 	accessor: "name",
  // 	Header: "ایجاد کننده ",
  // 	width: "auto",
  // },
  // {
  // 	accessor: "name",
  // 	Header: "آخرین بروزرسانی توسط",
  // 	width: "auto",
  // },
  // {
  // 	accessor: "name",
  // 	Header: "تاریخ آخرین بروزرسانی",
  // 	width: "auto",
  // },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
