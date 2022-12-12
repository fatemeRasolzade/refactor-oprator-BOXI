import { ErrorMessage } from 'formik'
import InputText from '../../../../global/InputText/InputText'
import SimpleButton from '../../../../global/SimpleButton/SimpleButton'
import { BiPlus } from 'react-icons/bi';
import StaticTable from './../../../../components/staticTable/StaticTable';

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
    




const SubTableForm = ({title,formik}:{title?:string,formik?:any}) =>(
    <>
        <fieldset className='border border-gray-300 p-4'>
            <legend>{title}</legend>

            <div className='grid grid-cols-2 gap-2 mt-4'>
            <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full min-w-0"/>
                <ErrorMessage name='code' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
            </div>
            <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full min-w-0"/>
                <ErrorMessage name='code' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
            </div>
            <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full min-w-0"/>
                <ErrorMessage name='code' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>


            </div>
            <div>
                <SimpleButton text='درج در لیست' icon={<BiPlus/>} className="bg-tomato text-sm w-fit text-white"/> 
            </div>


            </div>

            <div className='table w-full'>
                <StaticTable data={data} column={column} pagination/>

            </div>



        </fieldset>
    </>
)



export default SubTableForm