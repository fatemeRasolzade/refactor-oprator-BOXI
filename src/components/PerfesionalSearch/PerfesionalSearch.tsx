import { useState } from 'react';
import InputText from './../../global/InputText/InputText';
import Select from "react-select"
const PerfesionalSearch = ({LeftIcon,text}:{LeftIcon?:JSX.Element,text?:string}) => {
    const [toggle, setToggle] = useState(false);

    // const handelClick = () => {
    //   setToggle(false);
    // };
  return (
    <div className="w-160 relative">
    <button
      className="w-160 h-40  text-tomato  rounded-lg border-none flex justify-around items-center flex-row-reverse"
      onClick={() => setToggle(!toggle)}
    >
      <span>{LeftIcon}</span> <span className="text-dark text-md">{text}</span>{" "}
     
    </button>
    {toggle ? (
      <div className=" bg-white  absolute top-42 right-0 shadow-lg rounded-md p-5 z-10" style={{width:"550px"}}>
       <div className='flex flex-wrap justify-between items-center gap-4'>
        <div><InputText/></div>
        <div> <Select className='simple_select' data-before="text"/></div>
        <div> <Select className='simple_select'/></div>
        <div> <Select className='simple_select'/></div>
       
      

       </div>
      </div>
    ) : null}
  </div>
  )
}

export default PerfesionalSearch