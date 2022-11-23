
import React, {useEffect, useState} from 'react'
import { BiSearch, BiX, BiChevronDown } from 'react-icons/bi';
import Chip from "../../../../global/Chip/Chip";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputIcon from "../../../../global/InputIcon/InputIcon";
import {PostDataParams} from "../../../../services/Service_call";
import {apiRoute} from "../../../../services/apiRoute";
import {useDispatch} from "react-redux";

import {ServiceData} from "../../../../redux/ServiceDefine/ServiceDefineReducer";
import Autocomplete from "react-autocomplete";
import InputAuto from "../../../../global/Autocomplete/Autocomplete";
// import {Autocomplete} from "../../../../global/Autocomplete/Autocomplete";


interface PropData{
    label?:string,
    data?:any
    action: any
    // code?:number
}
const items = [
    {
        id: 0,
        name: 'Cobol'
    },
    {
        id: 1,
        name: 'JavaScript'
    },
    {
        id: 2,
        name: 'Basic'
    },
    {
        id: 3,
        name: 'PHP'
    },
    {
        id: 4,
        name: 'Java'
    }
]
const SearchForm = () => {
    const dispatch=useDispatch()
    // const [state,setState]=useState({code:'',name:''})
    const [code,setCode]=useState<string | null >()

    const [name,setName]=useState<string>('')
    const [chipData,setChipData]=useState<PropData[]>([])


    const handelSubmit=async(e?:React.FormEvent<HTMLFormElement>)=>{
        e?.preventDefault()
        setChipData([
            {
                label:"کد ",
                data:code,
                action:setCode
            },
            {
                label:" نام",
                data:name,
                action:setName
            }
        ])
      setCode(null)
        setName('')
    }

    useEffect(()=>{
        const body={
            code: code,
            name: name,
            isActive: true,
        }
        // @ts-ignore
        dispatch(ServiceData(body))
    },[chipData.length])
    const handleOnSelect = (item: any) => {
        // the item selected
        setCode(item.name)
    }
    const data = ["java", "javascript", "php", "c#", "go", "dart"];
    const getSelectedVal = (value: any) => {
        console.log(value);
    };

    const getChanges = (value: any) => {
        console.log(value);
    };
    return (
        <>
            <div className='flex justify-start items-center mt-6 gap-4 flex-wrap'>
                <form onSubmit={handelSubmit}>
                    <div className=' flex gap-3 justify-start items-center flex-wrap'>
                        <div className='Max-sm:mb-3'>
                            <InputAuto

                                label="languages"
                                pholder="Keyword..."
                                data={data}
                                onSelected={getSelectedVal}
                                onChange={getChanges}
                            />
                            {/*<Autocomplete*/}
                            {/*    getItemValue={(item) => item.label}*/}
                            {/*    items={[*/}
                            {/*        { label: 'apple' },*/}
                            {/*        { label: 'banana' },*/}
                            {/*        { label: 'pear' }*/}
                            {/*    ]}*/}
                            {/*    renderItem={(item, isHighlighted) =>*/}
                            {/*        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>*/}
                            {/*            {item?.label}*/}
                            {/*        </div>*/}
                            {/*    }*/}
                            {/*    // value={value}*/}
                            {/*    // onChange={(e) => value = e.target.value}*/}
                            {/*    // onSelect={(val) => value = val}*/}
                            {/*    value={code}*/}
                            {/*    onChange={(e) => setCode(e.target.value)}*/}
                            {/*    onSelect={(val) =>setCode(val)}*/}
                            {/*/>*/}

                        {/*<InputIcon*/}
                        {/*    item={items} text='کد'*/}
                        {/*    handleOnSelect={handleOnSelect}*/}
                        {/*    handleOnSearch={setCode}*/}
                        {/*    onClear={()=>console.log("clear")}*/}
                        {/*/>*/}
                        </div>
                        <div><InputIcon text='عنوان' handleOnSelect={handleOnSelect} handleOnSearch={setName}/></div>
                        <button type='submit' className='w-160 h-40 flex justify-center items-center bg-lightesGray border-none rounded-lg text-md relative active:-top-3 text-halfDark'><span className='ml-2'><BiSearch size={20}/></span>جستجو</button>
                    </div>
                </form>
                <PerfesionalSearch text="جستجوی پیشرفته" LeftIcon={<BiChevronDown/>} />
            </div>
            {/* list of chip */}
           <Chip chipData={chipData} setChipData={setChipData}  />
        </>
    )
}

export default SearchForm