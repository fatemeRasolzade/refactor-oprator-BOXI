import InputText from '../../../../global/InputText/InputText'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton'
import { BiPlus } from 'react-icons/bi';
import StaticTable from '../../../../components/staticTable/StaticTable';
import {Formik} from "formik"
import * as Yup from "yup"
import { useState, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';


const SubTableOne = ({title,setTableOne}:{title?:string,formik?:any,setTableOne?:any}) =>{


const validationSchema=Yup.object().shape({
    discountFrom:Yup.number().required("مقدار خالی زا پر کنید"),
    discountPercent:Yup.number().required("مقدار خالی زا پر کنید"),
    discountTo: Yup.number().required("مقدار خالی زا پر کنید"),
})


const [dataTable,setdataTable]=useState<any>([])


useEffect(()=>{
    console.log('kkk',dataTable)
},[dataTable])

return(
    

    <>
        <fieldset className='border border-gray-300 p-4'>
            <legend>{title}</legend>
            <Formik
            initialValues={{
                discountFrom:"",
                discountPercent:"",
                discountTo: "",
                serviceDelivery:null,
                type:{id: 0, text: "تعدادی"}
            }}
            validationSchema={validationSchema}
            onSubmit={(values)=>{
                 setTableOne((prev:any)=>([...prev,values]))
                setdataTable((prev:any)=>([values,...prev]))
            }}
            >
                {(formik)=>(
<>
<form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-2 gap-2 mt-4'>
            <div ><InputText label='از' name="discountFrom" handleChange={formik.handleChange} values={formik.values.discountFrom} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountFrom && formik.errors.discountFrom}/>
               
            </div>
            <div ><InputText label='تا' name="discountTo" handleChange={formik.handleChange} values={formik.values.discountTo} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountTo && formik.errors.discountTo}/>
                
            </div>
            <div ><InputText label='درصد' name="discountPercent" handleChange={formik.handleChange} values={formik.values.discountPercent} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.discountPercent && formik.errors.discountPercent}/>
               

            </div>
            <div>
                <SimpleButton text='درج در لیست' icon={<BiPlus/>} className="bg-tomato text-sm w-fit text-white !px-3" type='submit'/> 
            </div>


            </div>
            </form>
</>
                )}
            </Formik>
            
            <div className='table w-full'>

               
                <StaticTable data={dataTable} 
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
						
						Cell: ({cell }:any) =>(<div className='text-center'><BiTrash size={20} className="mx-auto" onClick={()=>{
                            console.log(cell)
                            const datas=dataTable.filter((item:any,index:any)=>index !== cell.row.index)
                            setdataTable(datas)
                            setTableOne(datas)
                            // const datas=dataTable.filter((item:any)=>!item.id.includes(cell.row.original.id))
                            // setdataTable(datas)
                        }}/></div>),
					},
                ]} pagination 
                selectable={false}/>

            </div>
        </fieldset>
    </>
)




}






export default SubTableOne