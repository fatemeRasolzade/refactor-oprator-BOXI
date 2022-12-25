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
    isRequire: true,
    Header: "کد پرسنلی",
    accessor: "personelCode",
  },
  {
    isRequire: false,

    Header: "کد ملی",
    accessor: "nationalCode",
  },
  {
    isRequire: false,
    Header: "نام و نام خانوادگی",
    accessor: "name",
  },
  {
    isRequire: false,
    Header: "شماره موبایل",
    accessor: "mobile",
  },
  {
    isRequire: false,
    Header: "پست الکترونیک",
    accessor: "email",
  },
  {
    isRequire: false,
    Header: "آخرین ورود",
    accessor: "lastlogin",
  },
  {
    isRequire: false,
    Header: "ایجاد شده در ",
    accessor: "createdat",
  },
  {
    isRequire: false,
    Header: " آخرین بروز رسانی توسط ",
    accessor: "lastupdatedatperson",
  },
  {
    isRequire: false,
    Header: "تاریخ آخرین بروز رسانی",
    accessor: "lastupdatedat",
  },
  {
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
