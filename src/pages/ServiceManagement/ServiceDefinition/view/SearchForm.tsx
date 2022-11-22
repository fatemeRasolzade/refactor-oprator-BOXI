
import React, { useState } from 'react'
import { BiSearch, BiX, BiChevronDown } from 'react-icons/bi';
import Chip from "../../../../global/Chip/Chip";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputIcon from "../../../../global/InputIcon/InputIcon";
import {PostDataParams} from "../../../../services/Service_call";
import {apiRoute} from "../../../../services/apiRoute";
import {useDispatch} from "react-redux";
import {ServiceData} from "../../../../redux/ServiceDefine/ServiceDefineReducer";


const SearchForm = () => {
    const [code,setCode]=useState<number>()
    const [name,setName]=useState<string>('')

    const dispatch=useDispatch()


    interface PropData{
        label?:string,
        data?:any
        name:string
        // code?:number
    }



    const [ChipData,setChipData]=useState<PropData[]>([])
    const handelSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const body={
                    code: code,
                    name: name,
                    isActive: true,
        }
        // @ts-ignore
        dispatch(ServiceData(body))
        setChipData([
            {
                label:"کد ",
                data:code,
                name:'code'
            },
            {
                label:" نام",
                data:name,
                name:'name'

            }
        ])
    }

    return (
        <>
            <div className='flex justify-start items-center mt-6 gap-4 flex-wrap'>
                <form onSubmit={handelSubmit}>
                    <div className=' flex gap-3 justify-start items-center flex-wrap'>
                        <div className='Max-sm:mb-3'><InputIcon text='کد' handleOnSearch={setCode}/></div>
                        <div><InputIcon text='عنوان' handleOnSearch={setName}/></div>
                        <button type='submit' className='w-160 h-40 flex justify-center items-center bg-lightesGray border-none rounded-lg text-md relative active:-top-3 text-halfDark'><span className='ml-2'><BiSearch size={20}/></span>جستجو</button>
                    </div>
                </form>
                <PerfesionalSearch text="جستجوی پیشرفته" LeftIcon={<BiChevronDown/>} />
            </div>
            {/* list of chip */}

           <Chip ChipData={ChipData} setChipData={setChipData}/>
        </>
    )
}

export default SearchForm