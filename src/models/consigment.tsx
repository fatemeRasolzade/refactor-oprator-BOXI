export var searchFilterListInitConsignment: Array<any> = [
  {
    id: crypto.randomUUID(),
    isMain: true,
    isShow: false,
    label: "شماره مرسوله",
    valueName: "code",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "نوع سرویس",
    valueName: "SourisType",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "شماره مشتری",
    valueName: "customerNumber",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "راننده تخصیصی",
    valueName: "تخصیصی",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "تخصیص شده به سفر",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "تخصیص شده به راننده",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "دلیل زمانبندی مجدد",
    valueName: "trip",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "تخصیص منطقه",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "منطقه",
    valueName: "trip",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "نوع انتقال",
    valueName: "trip",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "خطا",
    valueName: "trip",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "نوع مرسوله",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "تعداد مراجعات جهت تحویل",
    valueName: "trip",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "تعداد مراجعات جهت جمع آوری",
    valueName: "trip",
    type: "multiSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "عنوان سرویس",
    valueName: "code",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "جمع آوری از هاب ",
    valueName: "code",
    type: "status",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "وضعیت اجرا",
    valueName: "code",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "ارزش مرسوله",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "تسویه حساب",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "توزیع از هاب",
    valueName: "code",
    type: "status",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "کد گیرنده",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "کد فرستنده",
    valueName: "code",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "هاب بعدی",
    valueName: "code",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "هاب مقصد",
    valueName: "code",
    type: "text",
    options: null,
  },
  {
    id: crypto.randomUUID(),
    isMain: false,
    isShow: false,
    label: "زمان اجرا",
    valueName: "trip",
    type: "inputSelect",
    options: "some",
  },
];

export enum StatusEnum {
  ACCEPT = "قبول",
  NOT_ACCEPT = "عدم قبول",
}
