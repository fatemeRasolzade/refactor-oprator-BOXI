export const HubColumn = [
  {
    Header: "کد هاب",
    accessor: "code",
    key:"code",
    header:"کد هاب"
  },
  {
    Header: "نام هاب",
    accessor: "name",
    key:"name",
    header:"نام هاب"
  },
  {
    Header: "نوع هاب",
    accessor: "hubType",
    key:"hubType",
    header:"نوع هاب"
  },
  {
    Header: "گونه هاب",
    accessor: "category",
    key:"category",
    header:"گونه هاب"
  },
  {
    Header: "هاب والد",
    accessor: "parentHub",
    key:"parentHub",
    header:"هاب والد"
  },
  {
    Header: "آدرس",
    accessor: "addressLine1",
    key:"addressLine1",
    header:"آدرس"
  },
  {
    Header: "منطقه",
    accessor: "Ragen",
    key:"Ragen",
    header:"منطقه"
  },
  {
    Header: "امکان تحویل مرسوله دارد",
    accessor: "deliver",
    key:"deliver",
    header:"امکان تحویل مرسوله دارد"
  },
  {
    Header: "آخرین ویرایش توسط",
    accessor: "editBy",
    key:"editBy",
    header:"آخرین ویرایش توسط"
  },
  {
    Header: "تاریخ آخرین ویرایش",
    accessor: "EditTime",
    key:"EditTime",
    header:"تاریخ آخرین ویرایش"
  },
  {
    Header: "ویرایش",
    accessor: "edit",
   key:"",
   header:""
  },
  {
    Header: "حذف",
    accessor: "delete",
    key:"",
    header:""
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
