import React from 'react'


const BtnIcon = ({text,color,icon,colorText,handelClick}:{text?:string,color?:string,icon?:JSX.Element,colorText?:string,handelClick?:React.MouseEventHandler<HTMLButtonElement> | undefined}) => {
  return (
    <>
        <button className={`w-fit  h-40 px-4 flex justify-center items-center shadow-sm bg-${color} border-none rounded-lg  relative text-md active:-top-3 text-${colorText}`} onClick={handelClick}><span className='ml-2'>{icon}</span>{text}</button>
    </>
  )
}

export default BtnIcon