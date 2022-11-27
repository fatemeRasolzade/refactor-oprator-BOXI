import React from 'react'
import {BiX, BiXCircle} from 'react-icons/bi'
import {ServiceData} from "../../redux/ServiceDefine/ServiceDefineReducer";
import {toast} from "react-toastify";
import update = toast.update;


interface chipData {
    label?: string,
    data?: any,
    name: string,
}
interface propsData {
    chipData: chipData[],
    setChipData: React.Dispatch<React.SetStateAction<chipData[]>>,
    formData:any
}

const Chip: React.FC<propsData> = ({chipData, setChipData,formData}: propsData) => {

    const handelClick = (item: any, id: number) => {
        const findData = chipData.findIndex((item, index) => index === id);
        chipData.splice(findData, 1)
        formData.setFieldValue((item.name).toString(),'')  //empty value by name
    }
    return (
        <>
            {console.log(chipData)}
            <div className='flex justify-start items-center gap-3 mt-6'>
                {
                    chipData && chipData.map((item, index) =>
                    item.data &&
                    <div key={index} className='bg-grayLight flex w-fit py-1 px-3 justify-between items-center rounded-md'>
                        <span>{`${item.label} :`} {item.data}</span>
                        <span className='mr-2 cursor-pointer' onClick={() => {
                            handelClick(item, index)
                        }}><BiXCircle/></span>
                    </div>
                        // <Chip title={item.label} value={item.data} key={index}/>
                    )
                }
                {chipData.length > 0 ? (
                    <div>
                    <button
                        className='w-122 h-21 flex justify-center items-center flex-row-reverse border-none text-tomato'
                        onClick={() => {
                            setChipData([])
                            formData.resetForm({});
                        }}>حذف جستجوها <span><BiX/></span></button>
                </div>) : null}
            </div>


        </>
    )
}

export default Chip