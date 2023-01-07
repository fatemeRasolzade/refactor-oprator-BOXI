export const CollectColumns = [
  {
    accessor: "code",
    Header: "شماره جمع آوری",
  },
  //   {
  //     accessor: "consignments", //array and tooltip
  //     Header: " مرسولات",
  //   },
  {
    accessor: "selectcustomer", //use text
    Header: "کد و نام مشتری",
    Cell: ({ cell }: any) => cell.value?.text,
  },
  //   {
  //     accessor: "d",
  //     Header: "نام فرستنده",
  //   },
  //   {
  //     accessor: "e",
  //     Header: "تلفن محل جمع آوری",
  //   },
  {
    accessor: "selectaddress", //text
    Header: "آدرس فرستنده(جمع آوری)",
    Cell: ({ cell }: any) => cell.value?.text,
  },
  //   {
  //     accessor: "g",
  //     Header: " منطقه",
  //   },
  //   {
  //     accessor: "h", //convert
  //     Header: " بازه زمانی جمع آوری",
  //   },
  //   {
  //     accessor: "i",
  //     Header: " آخرین فرصت جمع آوری",
  //   },
  {
    accessor: "status",
    Header: "  وضعیت جمع آوری",
    Cell: ({ cell }: any) => cell.value?.text,
  },
  //   {
  //     accessor: "k",
  //     Header: " تعداد بسته های تحویلی",
  //   },
  //   {
  //     accessor: "l",
  //     Header: "    اطلاعات مقصد",
  //   },
  //   {
  //     accessor: "m",
  //     Header: "جمع آوری از ",
  //   },
  //   {
  //     accessor: "n", //getFromCustomer
  //     Header: "    نوع مشتری ",
  //   },
  {
    accessor: "selectallocatedHub", //text
    Header: "هاب جمع آوری ",
    Cell: ({ cell }: any) => cell.value?.text,
  },
  //   {
  //     accessor: "p",
  //     Header: "    راننده  تخصیصی",
  //   },
  //   {
  //     accessor: "failedReasons", // array
  //     Header: "دلیل عدم جمع آوری ",
  //   },
  //   {
  //     accessor: "r",
  //     Header: "COP",
  //   },
];
