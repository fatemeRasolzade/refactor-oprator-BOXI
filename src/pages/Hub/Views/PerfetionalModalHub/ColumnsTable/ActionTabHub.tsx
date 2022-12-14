import InputIcon from '../../../../../global/InputIcon/InputIcon'
import SwitchTooltip from './SwitchTooltip'

const ActionTabHub = () => {
  return (
    <div>
    <h4>.در اینجا می توانید بر اساس نیاز خود ، انتخاب کنید که کدام یک از عملیات ها نمایش داده شوند ، دقت نمایید
فقط 4 عملیات قابلیت نمایش در صفحه اصلی دارند و باقی عملیات ها در منو عملیات بیشتر قرار می گیرند
با کلیک بر روی فلش های عملیات های انتخاب شده ، میتوانید ترتیب نمایش عملیات ها را تغییر دهید</h4>

<div className='w-full mt-4 grid grid-cols-6 gap-3'>

<div className='col-span-5'>

<div className='flex justify-between items-center mb-3'>
<h5>فیلترهای انتخاب شده</h5>
<h5>نمایش در صفحه اصلی</h5>
</div>

{/* content */}
<div>

<InputIcon text='جستجو' />

{/* item for map list*/}
<div className='mt-3 h-[300px] overflow-y-auto'>
<SwitchTooltip active={false} tooltipText="test1"/>
<SwitchTooltip active={true} tooltipText="test2"/>
<SwitchTooltip active={false} tooltipText="test3"/>
<SwitchTooltip active={true} tooltipText="test4"/>
<SwitchTooltip active={false} tooltipText="test5"/>
<SwitchTooltip active={false} tooltipText="test1"/>

</div>

{/*end item for map list*/}

</div>


</div>
<div className='col-span-1'></div>

</div>

</div>
  )
}

export default ActionTabHub