import * as Yup from "yup"


export const addHubschema =Yup.object().shape({
    codeHub:Yup.string().required("کد هاب الزامی می باشد"),
    nameHub:Yup.string().required("نام هاب الزامی می باشد"),
    typeHub:Yup.string().required("نام هاب الزامی می باشد"),
    catHub:Yup.string().required("نام هاب الزامی می باشد"),
    parentHub:Yup.string().required("نام هاب الزامی می باشد"),
    pinHub:Yup.string().required("نام هاب الزامی می باشد"),
    dateHub:Yup.string().required("نام هاب الزامی می باشد"),
    Plaque:Yup.string().required("نام هاب الزامی می باشد"),
    address:Yup.string().required("نام هاب الزامی می باشد"),
    familyName:Yup.string().required("نام هاب الزامی می باشد"),
    phone:Yup.number().required("نام هاب الزامی می باشد").typeError('فرمت تلفن اشتباه است'),
    email:Yup.string().required("نام هاب الزامی می باشد").email("آدرس ایمیل معتبر نیست")

})

