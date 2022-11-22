import React, { useState } from 'react'
import {BiX, BiXCircle} from 'react-icons/bi'
import {ServiceData} from "../../redux/ServiceDefine/ServiceDefineReducer";




interface PropData{
    label?:string,
    data?:any,
    name:string
}
interface propsData {
    ChipData:PropData[],
    setChipData:React.Dispatch<React.SetStateAction<PropData[]>>
}

const Chip:React.FC<propsData> = ({ChipData,setChipData}:propsData) => {

   const [show,setShow]=useState(true)

    const handelClick=(item:any,id:number)=>{
       console.log(item)
        setShow(before=>!before)
        const findData = ChipData.findIndex((item,index) => index === id);
        ChipData.splice(findData,1)
         console.log(ChipData)



        // // @ts-ignore
        // dispatch(ServiceData(body))


        // dispatch(ServiceData(body))
        // setChipData(findData)

        // console.log(ChipData.findIndex((item,index) => index === id))
         // console.log(findData)
        // const body={
        //     code: code,
        //     name: name,
        //     isActive: true,
        // }
        // // @ts-ignore

    }

  return (
    <>

        <div className='flex justify-start items-center gap-3 mt-6'>
            {
                ChipData && ChipData.map((item,index)=>
                        <div className='bg-grayLight flex w-fit py-1 px-3 justify-between items-center rounded-md'>
                        <span>{`${item.label} :`}  {item.data}</span>
                        <span className='mr-2 cursor-pointer' onClick={()=>{handelClick(item,index)}}><BiXCircle/></span>
                    </div>

                        // <Chip title={item.label} value={item.data} key={index}/>

                )
            }
            {ChipData.length > 0 ? (<div><button className='w-122 h-21 flex justify-center items-center flex-row-reverse border-none text-tomato' onClick={()=>setChipData([])}>حذف جستجوها <span><BiX /></span></button></div>): null }
        </div>




   </>
  )
}

export default Chip