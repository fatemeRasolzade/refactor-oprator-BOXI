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
    Header: "شماره مرسوله",
    accessor: "code",
  },
  {
    Header: "زمان ایجاد",
    accessor: "createdAt",
  },
  {
    Header: "وضعیت",
    accessor: "status",
  },
  {
    Header: "نوع مرسوله",
    accessor: "ConsignmentType",
  },
  {
    Header: "تخصیص شده به سفر",
    accessor: "trip",
  },
  {
    Header: "تعداد قطعات",
    accessor: "contentNumber",
  },
  {
    Header: "نام مشتری",
    accessor: "customerName",
  },
  {
    Header: "آدرس گیرنده",
    accessor: "receiverAddress",
  },
  {
    Header: "پین کد مقصد",
    accessor: "destinationAddress",
  },
  {
    Header: "نام گیرنده",
    accessor: "receiverName",
  },
  {
    Header: "تلفن گیرنده",
    accessor: "receiverPhone",
  },
  {
    Header: "وزن(کیلوگرم)",
    accessor: "Weight",
  },
  {
    Header: "آخرین بروز رسانی",
    accessor: "lastUpdate",
  },
  {
    Header: "هاب جاری",
    accessor: "currentHub",
  },
  {
    Header: "هاب توقف",
    accessor: "hubStop",
  },
  {
    Header: "هاب مبدا",
    accessor: "OriginHub",
  },
  {
    Header: "هاب مقصد",
    accessor: "destinationHub",
  },
  {
    Header: "تاریخ زمان بندی مجدد",
    accessor: "RescheduleDate",
  },
  {
    Header: "مدت زمان تا تحویل",
    accessor: "DeliveryTime",
  },
  {
    Header: "شهر",
    accessor: "city",
  },
  {
    Header: "جابجایی",
    accessor: "Movement",
  },
  {
    Header: "ارزش اظهاری",
    accessor: "DeclarativeValue",
  },
  {
    Header: "ارزش اظهاری",
    accessor: "DeclarativeValueStatus",
  },
  {
    Header: "جهت حرکت مرسوله",
    accessor: "directionOfMovementOfTheShipment",
  },
  {
    Header: "عنوان خطای ایجاد شده",
    accessor: "TheTitleOfTheGeneratedError",
  },
  {
    Header: "ادرس اینترنتی قبض صادره",
    accessor: "InternetAddressOfIssuedInvoice",
  },
  {
    Header: "وضعیت پرداخت",
    accessor: "PaymentStatus",
  },
  {
    Header: "شماره سفر جمع آوری",
    accessor: "CollectionTripNumber",
  },
  {
    Header: "شماره سفر  رهسپاری",
    accessor: "TravelNumber",
  },
  {
    Header: "شماره سفر تحویل",
    accessor: "DeliveryTripNumber",
  },
  {
    Header: "هاب بعدی",
    accessor: "nextHub",
  },
  {
    Header: "شماره کیسه ",
    accessor: "bagNumber",
  },
  {
    Header: "یادداشت های آخرین رویداد",
    accessor: "NotesOfTheLastEvent",
  },
  {
    Header: "فرستنده",
    accessor: "sender",
  },
  {
    Header: "شماره قفسه",
    accessor: "shelfNumber",
  },
  {
    Header: "تعداد مراحعه جهت تحویل",
    accessor: "NumberReferralsForDelivery",
  },
  {
    Header: "تعداد مراجعه جهت جمع آوری",
    accessor: "NumberOfReferralsForCollection",
  },
  {
    Header: "آخرین دلیل عدم تحویل موفق",
    accessor: "TheLastReasonForTheUnsuccessfulDelivery",
  },
  {
    Header: "آخرین دلیل عدم جمع آوری موفق",
    accessor: "TheLastReasonForNotCollectingSuccessfully",
  },
  {
    Header: "وزن مبنای محاسبه",
    accessor: "CalculationBasisWeight",
  },
  {
    Header: "وزن حجمی",
    accessor: "WeightVolumetric",
  },
  {
    Header: "تاریخ تسویه حساب",
    accessor: "SettlementDate",
  },
  {
    Header: "مسئول ارزش گذاری نهایی مرسوله",
    accessor: "ResponsibleForTheFinalValuationOfTheShipment",
  },

  {
    Header: "نوع تحویل",
    accessor: "DeliveryType",
  },
  {
    Header: "پین کد فرستنده",
    accessor: "PinCodeOfTheSender",
  },
  {
    Header: "آدرس کد فرستنده",
    accessor: "SenderCodeAddress",
  },
  {
    Header: "شهر فرستنده",
    accessor: "senderCity",
  },
  {
    Header: "تلفن فرستنده",
    accessor: "SenderPhone",
  },
  {
    Header: "نوع سوریس",
    accessor: "SourisType",
  },
  {
    Header: "شماره صورت حساب",
    accessor: "AccountNumber",
  },
  {
    Header: "برنامه ریزی شده در تاریخ",
    accessor: "ScheduledOnThedate",
  },
  {
    Header: "وضعیت QC",
    accessor: "statusQC",
  },
  {
    Header: "پرداخت با اسکناس",
    accessor: "PaymentByBanknote",
  },
  {
    Header: "IMEI1",
    accessor: "IMEI1",
  },
  {
    Header: "دستگاه1",
    accessor: "device1",
  },
  {
    Header: "IMEI2",
    accessor: "IMEI2",
  },
  {
    Header: "دستگاه2",
    accessor: "device2",
  },
  {
    Header: "IMEI3",
    accessor: "IMEI3",
  },
  {
    Header: "دستگاه3",
    accessor: "device3",
  },
  {
    Header: "شماره سیمکارت",
    accessor: "SIMCardNumber",
  },
  {
    Header: "منطقه گیرنده",
    accessor: "recipientArea",
  },
  {
    Header: "منطقه فرستنده",
    accessor: "SenderArea",
  },
  {
    Header: "ناحیه گیرنده",
    accessor: "receiverArea",
  },
  {
    Header: "ناحیه فرستنده",
    accessor: "senderArea",
  },
  {
    Header: "بازه زمانی تحویل",
    accessor: "DeliveryTimePeriod",
  },

  {
    Header: "مبلغ قابل پرداخت",
    accessor: "TheAmountPayable",
  },
  {
    Header: "عملیات",
    accessor: "operation",
  },
];
