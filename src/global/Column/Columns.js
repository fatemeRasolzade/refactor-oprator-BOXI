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
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "زمان ایجاد",
    accessor: "createdAt",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وضعیت",
    accessor: "status",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نوع مرسوله",
    accessor: "ConsignmentType",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تخصیص شده به سفر",
    accessor: "trip",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تعداد قطعات",
    accessor: "contentNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نام مشتری",
    accessor: "customerName",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آدرس گیرنده",
    accessor: "receiverAddress",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پین کد مقصد",
    accessor: "destinationAddress",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نام گیرنده",
    accessor: "receiverName",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تلفن گیرنده",
    accessor: "receiverPhone",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وزن(کیلوگرم)",
    accessor: "Weight",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین بروز رسانی",
    accessor: "lastUpdate",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب جاری",
    accessor: "currentHub",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب توقف",
    accessor: "hubStop",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب مبدا",
    accessor: "OriginHub",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب مقصد",
    accessor: "destinationHub",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تاریخ زمان بندی مجدد",
    accessor: "RescheduleDate",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "مدت زمان تا تحویل",
    accessor: "DeliveryTime",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شهر",
    accessor: "city",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "جابجایی",
    accessor: "Movement",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ارزش اظهاری",
    accessor: "DeclarativeValue",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ارزش اظهاری",
    accessor: "DeclarativeValueStatus",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "جهت حرکت مرسوله",
    accessor: "directionOfMovementOfTheShipment",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "عنوان خطای ایجاد شده",
    accessor: "TheTitleOfTheGeneratedError",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ادرس اینترنتی قبض صادره",
    accessor: "InternetAddressOfIssuedInvoice",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وضعیت پرداخت",
    accessor: "PaymentStatus",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سفر جمع آوری",
    accessor: "CollectionTripNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سفر  رهسپاری",
    accessor: "TravelNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سفر تحویل",
    accessor: "DeliveryTripNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "هاب بعدی",
    accessor: "nextHub",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره کیسه ",
    accessor: "bagNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "یادداشت های آخرین رویداد",
    accessor: "NotesOfTheLastEvent",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "فرستنده",
    accessor: "sender",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره قفسه",
    accessor: "shelfNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تعداد مراحعه جهت تحویل",
    accessor: "NumberReferralsForDelivery",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تعداد مراجعه جهت جمع آوری",
    accessor: "NumberOfReferralsForCollection",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین دلیل عدم تحویل موفق",
    accessor: "TheLastReasonForTheUnsuccessfulDelivery",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آخرین دلیل عدم جمع آوری موفق",
    accessor: "TheLastReasonForNotCollectingSuccessfully",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وزن مبنای محاسبه",
    accessor: "CalculationBasisWeight",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وزن حجمی",
    accessor: "WeightVolumetric",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تاریخ تسویه حساب",
    accessor: "SettlementDate",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "مسئول ارزش گذاری نهایی مرسوله",
    accessor: "ResponsibleForTheFinalValuationOfTheShipment",
  },

  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نوع تحویل",
    accessor: "DeliveryType",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پین کد فرستنده",
    accessor: "PinCodeOfTheSender",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "آدرس کد فرستنده",
    accessor: "SenderCodeAddress",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شهر فرستنده",
    accessor: "senderCity",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "تلفن فرستنده",
    accessor: "SenderPhone",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "نوع سوریس",
    accessor: "SourisType",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره صورت حساب",
    accessor: "AccountNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "برنامه ریزی شده در تاریخ",
    accessor: "ScheduledOnThedate",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "وضعیت QC",
    accessor: "statusQC",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "پرداخت با اسکناس",
    accessor: "PaymentByBanknote",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "IMEI1",
    accessor: "IMEI1",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "دستگاه1",
    accessor: "device1",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "IMEI2",
    accessor: "IMEI2",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "دستگاه2",
    accessor: "device2",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "IMEI3",
    accessor: "IMEI3",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "دستگاه3",
    accessor: "device3",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "شماره سیمکارت",
    accessor: "SIMCardNumber",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "منطقه گیرنده",
    accessor: "recipientArea",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "منطقه فرستنده",
    accessor: "SenderArea",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ناحیه گیرنده",
    accessor: "receiverArea",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "ناحیه فرستنده",
    accessor: "senderArea",
  },
  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "بازه زمانی تحویل",
    accessor: "DeliveryTimePeriod",
  },

  {
    id: crypto.randomUUID(),
    isRequire: false,
    Header: "مبلغ قابل پرداخت",
    accessor: "TheAmountPayable",
  },
  {
    id: crypto.randomUUID(),
    isRequire: true,
    Header: "عملیات",
    accessor: "operation",
  },
];
