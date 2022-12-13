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
    accessor: "selectThirdPartyType",
    Header: "نوع شخصیت",
    Cell: ({ cell }) => <span className="centering">{cell.value?.text}</span>,
  },
  {
    accessor: "nationalCode",
    Header: "کد/شناسه ملی",
  },
  {
    accessor: "isActive",
    Header: "وضعیت",
    Cell: ({ cell }) => <span className="centering">{cell.value ? "فعال" : "غیر فعال"}</span>,
  },
  {
    accessor: "telephones",
    Header: "شماره تماس ",
    Cell: ({ cell }) =>
      cell.value.length > 1 ? (
        <div className="centering">
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
        <div className="centering">
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
    accessor: "selectThirdPartyCategory",
    Header: "گروه شخصیت ",
    Cell: ({ cell }) => <span className="centering">{cell.value?.text}</span>,
  },
  {
    accessor: "email",
    Header: "پست الکترونیک ",
  },
  {
    accessor: "operation",
    Header: "عملیات",
  },
];
