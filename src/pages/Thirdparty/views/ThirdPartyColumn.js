import TooltipWrapper from "../../../global/tooltip/TooltipWrapper";

export const ThirdPartyColumn = [
  {
    accessor: "code",
    Header: "کد شخصیت",
  },
  {
    accessor: "name",
    Header: "نام شخصیت",
  },
  {
    accessor: "selectCustomerType",
    Header: "نوع شخصیت",
    Cell: ({ cell }) => <span className="flex flex-row">{cell.value?.text}</span>,
  },
  {
    accessor: "nationalCode",
    Header: "کد/شناسه ملی",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => <span className="flex flex-row">{cell.value ? "فعال" : "غیر فعال"}</span>,
  },
  {
    accessor: "telephones",
    Header: "شماره تماس ",
    Cell: ({ cell }) =>
      cell.value.length > 1 ? (
        <div className="flex flex-row relative">
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
  // {
  //   accessor: "email",
  //   Header: "گروه شخصیت ",
  // },
  {
    accessor: "email",
    Header: "پست الکترونیک ",
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
