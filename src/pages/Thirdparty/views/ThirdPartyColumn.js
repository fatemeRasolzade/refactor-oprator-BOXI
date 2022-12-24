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
    accessor: "telephones",
    Header: "شماره تماس ",
    Cell: ({ cell }) =>
      cell.value.length > 1 ? (
        <TooltipWrapper
          textProps={cell?.value?.map((tel) => (
            <div className="text-white">
              {tel.telephonePrefix}
              {tel.telNumber}
            </div>
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
    accessor: "selectThirdPartyCategory",
    Header: "گروه شخصیت ",
    Cell: ({ cell }) => cell.value?.text,
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
