import React from 'react'


const SimpleButton = ({text,color,icon,colorText,handelClick}:{text?:string,color?:string,icon?:JSX.Element,colorText?:string,handelClick?:React.MouseEventHandler<HTMLButtonElement> | undefined}) => {
  return (
    <>
        <button className={`w-fit  h-10 px-4 flex justify-center items-center  bg-${color} border-none rounded-lg text-md text-${colorText}`} onClick={handelClick}><span className='ml-2'>{icon}</span>{text}</button>
    </> 
  )
}

export default SimpleButton