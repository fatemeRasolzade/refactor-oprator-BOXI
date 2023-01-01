export const HubColumn = [
  {
    Header: "کد هاب",
    accessor: "code",
  },
  {
    Header: "نام هاب",
    accessor: "name",
  },
  {
    Header: "نوع هاب",
    accessor: "hubType",
  },
  {
    Header: "گونه هاب",
    accessor: "category",
  },
  {
    Header: "هاب والد",
    accessor: "parentHub",
  },
  {
    Header: "آدرس",
    accessor: "addressLine1",
  },
  {
    Header: "منطقه",
    accessor: "Ragen",
  },
  {
    Header: "امکان تحویل مرسوله دارد",
    accessor: "deliver",
  },
  {
    Header: "آخرین ویرایش توسط",
    accessor: "editBy",
  },
  {
    Header: "تاریخ آخرین ویرایش",
    accessor: "EditTime",
  },
  {
    Header: "ویرایش",
    accessor: "edit",
  },
  {
    Header: "حذف",
    accessor: "delete",
  },
];

export const RoleColumn = [
  {
    Header: "عنوان نقش",
    accessor: "name",
  },
  {
    Header: "دسترسی ها",
    accessor: "selectPermissions",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
export const PersonnelColumn = [
  {
    id: crypto.randomUUID(),
    isRequire: true,
    Header: "کد پرسنلی",
    accessor: "personelCode",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,

    Header: "کد ملی",
    accessor: "nationalCode",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نام و نام خانوادگی",
    accessor: "name",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره موبایل",
    accessor: "mobile",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پست الکترونیک",
    accessor: "email",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین ورود",
    accessor: "lastlogin",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ایجاد شده در ",
    accessor: "createdat",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: " آخرین بروز رسانی توسط ",
    accessor: "lastupdatedatperson",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تاریخ آخرین بروز رسانی",
    accessor: "lastupdatedat",
  },
  {
    id: crypto.randomUUID(),
    isRequire: true,
    Header: "عملیات",
    accessor: "operation",
  },
];

export const ProductInfoColumn = [
  {
    Header: "محصول",
    accessor: "product",
  },
  {
    Header: "قابل ارائه در محصول	",
    accessor: "usingProducts",
  },
  {
    Header: "وزن (کیلوگرم)	",
    accessor: "weight",
  },
  {
    Header: "ابعاد (سانتیمتر)	",
    accessor: "dimension",
  },
  {
    Header: "مدت ارائه خدمت	",
    accessor: "timeCommitment",
  },
  {
    Header: "مبدا",
    accessor: "from",
  },
  {
    Header: "مقصد",
    accessor: "destination",
  },
  {
    Header: "وضعیت",
    accessor: "status",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];

export const ServiceProvisionColumns = [
  {
    Header: "کد",
    accessor: "code",
  },
  {
    Header: "عنوان",
    accessor: "name",
  },
  {
    Header: "سرویس",
    accessor: "service",
  },
  {
    Header: "وضعیت",
    accessor: "isActive",
  },
  {
    Header: "تاریخ اعتبار از",
    accessor: "validDateFrom",
  },
  {
    Header: "تاریخ اعتبار تا",
    accessor: "validDateTo",
  },
  {
    Header: "نوع تخفیف",
    accessor: "type",
  },
  {
    Header: "عملیات",
    accessor: "handover",
  },
];

export const HubCategoryColumn = [
  {
    Header: "عنوان",
    accessor: "name",
  },
  {
    Header: "کد",
    accessor: "code",
  },
  {
    Header: "توضیحات",
    accessor: "description",
  },
  {
    Header: "عملیات",
    accessor: "handover",
  },
];
export const FetchGeoColumn = [
  {
    Header: "کد",
    accessor: "code",
  },
  {
    Header: "عنوان",
    accessor: "name",
  },
  {
    Header: "وضعیت",
    accessor: "status",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
export const AddGeoColumn = [
  {
    Header: "مبداء",
    accessor: "fromCountryDevision",
  },
  {
    Header: "مقصد",
    accessor: "toCountryDevision",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];

export const ProductGroupCulumn = [
  {
    Header: "کد",
    accessor: "code",
  },
  {
    Header: "عنوان",
    accessor: "name",
  },
  {
    Header: "توضیحات",
    accessor: "description",
  },
  {
    Header: "وضعیت",
    accessor: "isActive",
  },
  {
    Header: "عملیات",
    accessor: "actionProduct",
  },
];

export const CRMCustomerColumn = [
  {
    Header: "کد",
    accessor: "code",
  },
  {
    Header: "عنوان",
    accessor: "name",
  },
  {
    Header: "توضیحات",
    accessor: "description",
  },
  {
    Header: "وضعیت",
    accessor: "isActive",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];

export const ConsignmentManageCol = [
  {
    id: crypto.randomUUID(),
    isRequire: true,
    Header: "شماره مرسوله",
    accessor: "code",
    type: "text",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "زمان ایجاد",
    accessor: "createdAt",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وضعیت",
    accessor: "status",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نوع مرسوله",
    accessor: "ConsignmentType",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تخصیص شده به سفر",
    accessor: "trip",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تعداد قطعات",
    accessor: "contentNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نام مشتری",
    accessor: "customerName",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آدرس گیرنده",
    accessor: "receiverAddress",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پین کد مقصد",
    accessor: "destinationAddress",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نام گیرنده",
    accessor: "receiverName",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تلفن گیرنده",
    accessor: "receiverPhone",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وزن(کیلوگرم)",
    accessor: "Weight",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین بروز رسانی",
    accessor: "lastUpdate",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب جاری",
    accessor: "currentHub",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب توقف",
    accessor: "hubStop",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب مبدا",
    accessor: "OriginHub",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب مقصد",
    accessor: "destinationHub",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تاریخ زمان بندی مجدد",
    accessor: "RescheduleDate",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "مدت زمان تا تحویل",
    accessor: "DeliveryTime",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شهر",
    accessor: "city",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "جابجایی",
    accessor: "Movement",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ارزش اظهاری",
    accessor: "DeclarativeValue",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ارزش اظهاری",
    accessor: "DeclarativeValueStatus",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "جهت حرکت مرسوله",
    accessor: "directionOfMovementOfTheShipment",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "عنوان خطای ایجاد شده",
    accessor: "TheTitleOfTheGeneratedError",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ادرس اینترنتی قبض صادره",
    accessor: "InternetAddressOfIssuedInvoice",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وضعیت پرداخت",
    accessor: "PaymentStatus",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سفر جمع آوری",
    accessor: "CollectionTripNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سفر  رهسپاری",
    accessor: "TravelNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سفر تحویل",
    accessor: "DeliveryTripNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب بعدی",
    accessor: "nextHub",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره کیسه ",
    accessor: "bagNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "یادداشت های آخرین رویداد",
    accessor: "NotesOfTheLastEvent",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "فرستنده",
    accessor: "sender",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره قفسه",
    accessor: "shelfNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تعداد مراحعه جهت تحویل",
    accessor: "NumberReferralsForDelivery",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تعداد مراجعه جهت جمع آوری",
    accessor: "NumberOfReferralsForCollection",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین دلیل عدم تحویل موفق",
    accessor: "TheLastReasonForTheUnsuccessfulDelivery",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین دلیل عدم جمع آوری موفق",
    accessor: "TheLastReasonForNotCollectingSuccessfully",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وزن مبنای محاسبه",
    accessor: "CalculationBasisWeight",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وزن حجمی",
    accessor: "WeightVolumetric",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تاریخ تسویه حساب",
    accessor: "SettlementDate",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "مسئول ارزش گذاری نهایی مرسوله",
    accessor: "ResponsibleForTheFinalValuationOfTheShipment",
    type: "time",
  },

  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نوع تحویل",
    accessor: "DeliveryType",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پین کد فرستنده",
    accessor: "PinCodeOfTheSender",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آدرس کد فرستنده",
    accessor: "SenderCodeAddress",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شهر فرستنده",
    accessor: "senderCity",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تلفن فرستنده",
    accessor: "SenderPhone",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نوع سوریس",
    accessor: "SourisType",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره صورت حساب",
    accessor: "AccountNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "برنامه ریزی شده در تاریخ",
    accessor: "ScheduledOnThedate",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وضعیت QC",
    accessor: "statusQC",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پرداخت با اسکناس",
    accessor: "PaymentByBanknote",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "IMEI1",
    accessor: "IMEI1",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "دستگاه1",
    accessor: "device1",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "IMEI2",
    accessor: "IMEI2",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "دستگاه2",
    accessor: "device2",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "IMEI3",
    accessor: "IMEI3",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "دستگاه3",
    accessor: "device3",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سیمکارت",
    accessor: "SIMCardNumber",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "منطقه گیرنده",
    accessor: "recipientArea",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "منطقه فرستنده",
    accessor: "SenderArea",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ناحیه گیرنده",
    accessor: "receiverArea",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ناحیه فرستنده",
    accessor: "senderArea",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "بازه زمانی تحویل",
    accessor: "DeliveryTimePeriod",
    type: "time",
  },

  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "مبلغ قابل پرداخت",
    accessor: "TheAmountPayable",
    type: "time",
  },
  {
    id: crypto.randomUUID(),
    isRequire: true,
    Header: "عملیات",
    accessor: "operation",
    type: "operation",
  },
];
