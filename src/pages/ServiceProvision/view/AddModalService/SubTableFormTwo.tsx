import { ErrorMessage } from 'formik'
import InputText from '../../../../global/InputText/InputText'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton'
import { BiPlus } from 'react-icons/bi';
import StaticTable from '../../../../components/staticTable/StaticTable';
import {useFormik} from "formik"
import * as Yup from "yup"
const column=[
    {
        Header: "از",
        accessor: "title",
    },{
        Header: "تا",
        accessor: "title2",
    },{
        Header: "درصد",
        accessor: "title3",
    },{
        Header: "عملیات",
        accessor: "title4",
    },
]

const data=[
    {
       
        title:"test",
        title2:"rrrrr",
        title3:"ttttt",
        title4:"qqqqqq"
    }
   
]
    




const SubTableTwo = ({title}:{title?:string,formik?:any}) =>{


const validationSchema=Yup.object().shape({
    discountFrom:Yup.string().required("مقدار خالی زا پر کنید"),
    discountPercent:Yup.string().required("مقدار خالی زا پر کنید"),
    discountTo: Yup.string().required("مقدار خالی زا پر کنید"),
})

    const formik=useFormik({
        initialValues:{
            discountFrom:"",
            discountPercent:"",
            discountTo: ""
        },
        // validationSchema:{validationSchema},
        onSubmit:(values)=>{
            console.log(values)
        }
    })
return(
    

    <>
        <fieldset className='border border-gray-300 p-4'>
            <legend>{title}</legend>
            <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-2 mt-4'>
            <div ><InputText label='از' name="discountFrom" handleChange={formik.handleChange} values={formik.values.discountFrom} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountFrom && formik.errors.discountFrom}/>
               
            </div>
            <div ><InputText label='تا' name="discountTo" handleChange={formik.handleChange} values={formik.values.discountTo} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountTo && formik.errors.discountTo}/>
                
            </div>
            <div ><InputText label='درصد' name="discountPercent" handleChange={formik.handleChange} values={formik.values.discountPercent} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountPercent && formik.errors.discountPercent}/>
               
            </div>
            <div>
                <SimpleButton text='درج در لیست' icon={<BiPlus/>} className="bg-tomato text-sm w-fit text-white !px-3" type='submit' handelClick={()=>formik.handleSubmit}/> 
            </div>


            </div>
            </form>
            <div className='table w-full'>
                <StaticTable data={data} column={column} pagination selectable={false}/>

            </div>
        </fieldset>
    </>
)




}






export default SubTableTwo