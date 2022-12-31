import InputText from '../../../../global/InputText/InputText'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton'
import { BiPlus } from 'react-icons/bi';
import StaticTable from '../../../../components/staticTable/StaticTable';
import {useFormik} from "formik"
import { BiTrash } from 'react-icons/bi';
import * as Yup from "yup"
import { useState } from 'react';


const SubTableTwo = ({title,setTableTwo}:{title?:string,formik?:any,setTableTwo?:any}) =>{


    const validationSchema=Yup.object().shape({
        discountFrom:Yup.number().required("مقدار خالی زا پر کنید"),
        discountPercent:Yup.number().required("مقدار خالی زا پر کنید"),
        discountTo: Yup.number().required("مقدار خالی زا پر کنید"),
    })

    const formik=useFormik({
        initialValues:{
           
            discountFrom:"",
            discountPercent:"",
            discountTo: "",
            serviceDelivery:null,
            type: {id: 1, text: "محاسباتی"}
        },
        validationSchema,
        onSubmit:(values)=>{
            setTableTwo((prev:any)=>([...prev,values]))
            setdataTableTwo((prev:any)=>([...prev,{...values,id:crypto.randomUUID()}])) 
        }
    })

    const [dataTableTwo,setdataTableTwo]=useState<any>([])
return(
    

    <>
        <fieldset className='border border-gray-300 p-4'>
            <legend>{title}</legend>
            <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-2 mt-4'>
            <div ><InputText label='از' name="discountFrom" handleChange={formik.handleChange} values={formik.values.discountFrom} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountFrom && formik.errors.discountFrom}/>
               
            </div>
            <div ><InputText label='تا' name="discountTo" handleChange={formik.handleChange} values={formik.values.discountTo} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountTo && formik.errors.discountTo}/></div>
            <div ><InputText label='درصد' name="discountPercent" handleChange={formik.handleChange} values={formik.values.discountPercent} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountPercent && formik.errors.discountPercent}/>
               </div>
            <div>
                <SimpleButton text='درج در لیست' icon={<BiPlus/>} className="bg-tomato text-sm w-fit text-white !px-3"  type='submit'/> 
            </div>


            </div>
            </form>
            <div className='table w-full'>
                <StaticTable data={dataTableTwo} 
                 column={[
                    {
                        Header: "از",
                        accessor: "discountFrom",
                    },{
                        Header: "تا",
                        accessor: "discountTo",
                    },{
                        Header: "درصد",
                        accessor: "discountPercent",
                    },
                    {
						accessor: "action",
						Header: "عملیات",
						
						Cell: ({cell }:any) =>(<div className='text-center' onClick={()=>{
                            // const datas=dataTableTwo.filter((item:any)=>!item.id.includes(cell.row.original.id))
                            const datas=dataTableTwo.filter((item:any,index:any)=>index !== cell.row.index)
                            setdataTableTwo(datas)
                            setTableTwo(datas)
                        }}><BiTrash size={20} className="mx-auto"/></div>),
					},
                ]}
                 pagination
                  selectable={false}/>

            </div>
        </fieldset>
    </>
)




}






export default SubTableTwo