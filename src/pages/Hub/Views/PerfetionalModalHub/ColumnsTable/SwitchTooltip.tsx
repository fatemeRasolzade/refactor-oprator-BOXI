import React from 'react'
import ChipIcon from '../../../../../global/ChipIcon/ChipIcon'
import CustomSwitch from '../../../../../global/Switch/Switch'

const SwitchTooltip = ({active,handelchanges,tooltipText}:{active:boolean,handelchanges?:any,tooltipText?:string}) => {
  return (
    <div className='flex justify-between items-center '>

    <div className='px-2 w-full'><ChipIcon text={tooltipText}/></div>

    <div className='px-2 w-full flex justify-end'>
       <CustomSwitch active={active} handleChange={handelchanges}/>
      </div>

</div>
  )
}

export default SwitchTooltip