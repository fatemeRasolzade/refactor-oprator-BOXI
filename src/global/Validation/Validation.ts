import * as Yup from "yup"


export const addHubschema =Yup.object().shape({
  code:Yup.string().required("کد هاب الزامی می باشد"),
  name:Yup.string().required("نام هاب الزامی می باشد"),
    //  selectHubType:Yup.object().shape({
    //     label: Yup.string().required().label("نوع هاب"),
    //     value: Yup.string().required().label("نوع هاب"),
        
    //   }),
    //  selectHubCategory:Yup.object().nullable(true).shape({
    //   label: Yup.string().required().label("دسته بندی هاب"),
    //   value: Yup.string().required().label("دسته بندی هاب"),
    //   }),
    //  selectParentHub:Yup.object().nullable(true).shape({
    //   label: Yup.string().required().label("والد هاب"),
    //   value: Yup.string().required().label("والد هاب"),
    //   }),
    pinCode:Yup.string().nullable(true).label("پین کد"),
    locationStartDate:Yup.object().nullable(true).shape({
    day:Yup.number(),
    mounth:Yup.number(),
    year:Yup.number()
    }),
    isActive: Yup.boolean().nullable(true).label("فعال"),
     mandatoryArrivalScan:Yup.boolean().nullable(true).label("اسکن مرسوله در ورودی هاب اجباری است"),
     dropOffAllowed:Yup.boolean().nullable(true).label("امکان تحویل مرسوله دارد"),
    //  selectRegion:Yup.object().nullable(true).shape({
    //   label: Yup.string().required().label("استان"),
    //   value: Yup.string().required().label("استان"),
    //   }),
      // selectCity:Yup.object().nullable(true).shape({
      //   label: Yup.string().required().label("شهر"),
      //   value: Yup.string().required().label("شهر"),
      // }),
      // selectState:Yup.object().nullable(true).shape({
      //   label: Yup.string().required().label("منطقه"),
      //   value: Yup.string().required().label("منطقه"),
      // }),
      plateNumber:Yup.number().nullable(true).label("پلاک").typeError('به عدد وارد شود'),
      addressLine1:Yup.string().nullable(true).label("آدرس 1"),
      addressLine2:Yup.string().nullable(true).label("آدرس 2"), 
      locLate: Yup.string().nullable(true),
      locLong: Yup.string().nullable(true),
    //   fullName:Yup.string().nullable(true),
    //  phone:Yup.number().nullable(true).typeError('فرمت تلفن اشتباه است'),
    //  email:Yup.string().nullable(true).email("آدرس ایمیل معتبر نیست")

})

