import React, {useEffect, useState} from 'react'
import {BiX, BiXCircle} from 'react-icons/bi'
import {ServiceData} from "../../redux/ServiceDefine/ServiceDefineReducer";
import {toast} from "react-toastify";
import update = toast.update;


interface PropData {
    label?: string,
    data?: any,
    action: any,

}

interface propsData {
    chipData: PropData[],

    setChipData: React.Dispatch<React.SetStateAction<PropData[]>>
}

const Chip: React.FC<propsData> = ({chipData, setChipData}: propsData) => {

    const [show, setShow] = useState(true)
    const handelClick = (item: any, id: number) => {
        setShow(before => !before)
        const findData = chipData.findIndex((item, index) => index === id);
        item.action('')
        chipData.splice(findData, 1)
        // setUpdate(befores=>!befores)
        // setChipData(chipData)

    }

    return (
        <>

            <div className='flex justify-start items-center gap-3 mt-6'>
                {
                    chipData && chipData.map((item, index) =>
                            <div key={index} className='bg-grayLight flex w-fit py-1 px-3 justify-between items-center rounded-md'>
                                <span>{`${item.label} :`} {item.data}</span>
                                <span className='mr-2 cursor-pointer' onClick={() => {
                                    handelClick(item, index)
                                }}><BiXCircle/></span>
                            </div>

                        // <Chip title={item.label} value={item.data} key={index}/>

                    )
                }
                {chipData.length > 0 ? (<div>
                    <button
                        className='w-122 h-21 flex justify-center items-center flex-row-reverse border-none text-tomato'
                        onClick={() => setChipData([])}>حذف جستجوها <span><BiX/></span></button>
                </div>) : null}
            </div>


        </>
    )
}

export default Chip