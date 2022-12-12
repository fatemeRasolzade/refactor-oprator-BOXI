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

    Cell: ({ cell }) => (
      <span className="flex flex-row">{cell.value?.text}</span>
    ),
  },
  {
    accessor: "nationalCode",
    Header: "کد/شناسه ملی",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",

    Cell: ({ cell }) => (
      <span className="flex flex-row">{cell.value ? "فعال" : "غیر فعال"}</span>
    ),
  },
  {
    accessor: "selectParentCustomer",
    Header: "مشتری والد",

    Cell: ({ cell }) => (
      <span className="flex flex-row">{cell.value?.text}</span>
    ),
  },
  {
    accessor: "telephones",
    Header: "شماره تماس ",

    Cell: ({ cell }) =>
      cell.value.length > 1 ? (
        <div className="flex flex-row relative">
          <TooltipWrapper
            textProps={cell?.value?.map((tel) => (
              <div>{tel.telNumber}</div>
            ))}
          >
            {cell.value.length > 0 && (
              <>
                {cell.value[0].telephonePrefix}
                {cell.value[0].telNumber}
              </>
            )}
          </TooltipWrapper>
        </div>
      ) : (
        <div className="flex flex-row relative">
          {cell.value.length > 0 && (
            <>
              {cell.value[0].telephonePrefix}
              {cell.value[0].telNumber}
            </>
          )}
        </div>
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

    Cell: ({ cell }) => {
      <span className="flex flex-row relative">
        FFFFFFFF
        {cell.value.length > 0 && cell.value[0].address}
      </span>;
    },
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
