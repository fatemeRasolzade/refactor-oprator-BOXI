import React, {useEffect, useState} from 'react'
import {BiSearch, BiX, BiChevronDown} from 'react-icons/bi';
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import Chip from "../../../../global/Chip/Chip";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import {ServiceData} from "../../../../redux/ServiceDefine/ServiceDefineReducer";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";



interface chipData {
    label?: string,
    data?: any,
    name: string,
}
const SearchForm = () => {
    const dispatch = useDispatch()
    const [options, setOptions] = useState<any>([])
    const [chipData, setChipData] = useState<chipData[]>([])
    const [search, setSearch] = useState({})
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: "",
            name: "",
        },
        onSubmit: (values) => {
            setChipData([
                {
                    label: "کد ",
                    data: values.code,
                    name: 'code'
                },
                {
                    label: " نام",
                    data: values.name,
                    name: 'name'
                }
            ])
            // @ts-ignore
            dispatch(ServiceData(formik.values))
            setSearch(values);
        },
    });

    useEffect(() => {
        // @ts-ignore
        dispatch(ServiceData(formik.values))
    }, [chipData.length])


    return (
        <>
            <div className='flex justify-start items-center mt-6 gap-4 flex-wrap'>
                <form onSubmit={formik.handleSubmit}>
                    <div className=' flex gap-3 justify-start items-center flex-wrap'>
                        <div className='Max-sm:mb-3'>
                            <AutocompleteInput
                                label={"کد"}
                                items={options}
                                value={formik.values.code}
                                onChange={(e: { target: { value: React.SetStateAction<string | null | undefined>; }; }) => {
                                    // const params = `${e.target.value}`;
                                    // GetDataParams(apiRoute().get.GET_SERVICES+ params)
                                    formik.setFieldValue('code', e.target.value)
                                }}
                                onSelect={(val: React.SetStateAction<string | null | undefined>) => formik.setFieldValue('code', val)}
                            />
                        </div>
                        <div>
                            <AutocompleteInput
                                label={"عنوان"}
                                items={[
                                    {label: 'apple'},
                                    {label: 'banana'},
                                    {label: 'pear'}
                                ]}
                                value={formik.values.name}
                                onChange={
                                    (e: { target: { value: React.SetStateAction<string | null | undefined>; }; }) => {
                                        formik.setFieldValue('name', e.target.value)
                                    }
                                }
                                onSelect={(val: React.SetStateAction<string | null | undefined>) => formik.setFieldValue('name', val)}
                            />
                            {/*<InputIcon text='عنوان' handleOnSelect={handleOnSelect} handleOnSearch={setName}/>*/}
                        </div>
                        <button type='submit'
                                className='w-160 h-40 flex justify-center items-center bg-lightesGray border-none rounded-lg text-md relative active:-top-3 text-halfDark'>
                            <span className='ml-2'><BiSearch size={20}/></span>جستجو
                        </button>
                    </div>
                </form>
                {/*<PerfesionalSearch text="جستجوی پیشرفته" LeftIcon={<BiChevronDown/>}/>*/}
            </div>
            {/* list of chip */}
            <Chip chipData={chipData} setChipData={setChipData} formData={formik}/>
        </>
    )
}

export default SearchForm