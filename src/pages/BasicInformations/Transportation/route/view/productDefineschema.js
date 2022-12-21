import * as Yup from "yup"


export const productDefineschema =Yup.object().shape({
  code:Yup.string().required("اجباری است"),
  name:Yup.string().required("اجباری است"),
  productGroup: Yup.object().shape({
		text: Yup.string().required("اجباری است"),
		id: Yup.string().required("اجباری است"),
	}),

})

