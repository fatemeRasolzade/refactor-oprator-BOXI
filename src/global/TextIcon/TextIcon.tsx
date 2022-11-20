import React from 'react'


const TextIcon = ({icon,title,subtitle,width,height}:{icon?:JSX.Element,title?:string,subtitle?:string,width?:string,height?:string}) => {
    const style={
        width:width,
        height:height
    }
  return (
    <div className={`shadow-sm rounded-md flex justify-start items-center px-3`} style={style}>
<button className='border-none bg-tomato rounded-md'>{icon}</button>
<div className='mr-5'>
<p className='font-bold'>{title}</p>
<p className='text-customeTextColor text-lg'>{subtitle}</p>
</div>
    </div>
  )
}

export default TextIcon