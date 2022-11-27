import React, {useEffect, useState} from 'react'
import {BiSearch, BiX, BiChevronDown} from 'react-icons/bi';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import Chip from "../../../../global/Chip/Chip";

import {ServiceData} from "../../../../redux/ServiceDefine/ServiceDefineReducer";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import PerfesionalSearch from "./PerfesionalSearch";
import {GetDataParams} from "../../../../services/Service_call";
import {apiRoute} from "../../../../services/apiRoute";




const SearchForm = () : JSX.Element=> {
    const dispatch = useDispatch()
    const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([])
    const [filterData, setFilterData] = useState({})
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: "",
            name: "",
        },
        onSubmit: (values) => {
            setFilterData(values);
        },
    });

    useEffect(() => {
        // @ts-ignore
        dispatch(ServiceData(formik.values))
    }, [filterData])
     const data= [
         {id:1,text:'product'},
         {id:2,text:'price'},
         {id:3,text:'vemdor'},
     ]
    const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        formik.setFieldValue(name, e.target.value)
        const filterData=data.filter(item=>item.text.includes(e.target.value))
        setServiceCodeOptions(filterData.map(item=> {
            return {
                label:item?.text
            }}))
        //mr hash please dont delete this comment//
        // const params = `${e.target.value}`;
        // setOptions(data.filter(item=>item.text.includes(e.target.value)))
        // GetDataParams(apiRoute().get.GET_SERVICES+ params)
    }
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        formik.setFieldValue(name, e.target.value)
    }
    const handleSelect = (val: any, name: string) => {
        formik.setFieldValue(name, val)
    }
    return (
        <>
            <div className='flex justify-start items-center mt-6 gap-4 flex-wrap'>
                <form onSubmit={formik.handleSubmit}>
                    <div className=' flex gap-3 justify-start items-center flex-wrap'>
                        <div className='Max-sm:mb-3'>
                            <AutocompleteInput
                                label={"کد"}
                                items={serviceCodeOptions}
                                value={formik.values.code}
                                onChange={(e) => handleChangeCode(e, 'code')}
                                onSelect={(val: any) => handleSelect(val, 'code')}
                            />
                        </div>
                        <div>
                            <AutocompleteInput
                                label={"عنوان"}
                                items={[]}
                                value={formik.values.name}
                                onChange={(e) => handleChangeName(e, 'name')}
                                onSelect={(val: any) => handleSelect(val, 'name')}
                            />
                            {/*<InputIcon text='عنوان' handleOnSelect={handleOnSelect} handleOnSearch={setName}/>*/}
                        </div>
                        <button type='submit'
                                className='w-160 h-40 flex justify-center items-center bg-lightesGray border-none rounded-lg text-md relative active:-top-3 text-halfDark'>
                            <span className='ml-2'><BiSearch size={20}/></span>جستجو
                        </button>
                    </div>

                </form>
                <PerfesionalSearch formData={formik} text="جستجوی پیشرفته" LeftIcon={<BiChevronDown/>}/>
            </div>
            {/* list of chip */}
            {filterData && <Chip filterData={filterData} formData={formik}/>}
        </>
    )
}

export default SearchForm