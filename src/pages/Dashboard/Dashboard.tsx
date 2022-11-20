import React from 'react'
import AddButton from '../../global/addButton/AddButton'
import BtnIcon from '../../global/BtnIcon/BtnIcon'
import InputIcon from '../../global/InputIcon/InputIcon'
import { BiAlarm } from "react-icons/bi";
import Chip from '../../global/Chip/Chip';
import DatePickers from '../../global/DatePicker/DatePicker';

import InputSelect from '../../global/InputSelect/InputSelect';
import InputSelectIcon from './../../global/InputSelectIcon/InputSelectIcon';
import InputText from './../../global/InputText/InputText';
import Modal from './../../global/Modal/Modal';
import CustomSwitch from './../../global/Switch/Switch';
import TimePiker from './../../global/TimePicker/TimePiker';
import StaticTable from '../../components/staticTable/StaticTable';
import Table from '../../components/Table/Table';
import TextIcon from './../../global/TextIcon/TextIcon';
import { BiExit,BiTrash } from 'react-icons/bi'
import SimpleButton from './../../global/SimpleButton/SimpleButton';
const Dashboard = () => {
  const [visible,setVisible]=React.useState(true)
  return (
    <div>
      {/* <Table/> */}
{/* <StaticTable/> */}
{/* <AddButton text='کلیک' subItemOne='تست اول' subItemTwo='تست دوم' LeftIcon={<BiExit/>} RightIcon={<BiTrash/>} color={'tomato'} textColor="white"/> */}
{/* <SimpleButton text='تست' icon={<BiTrash size={20}/>} /> */}
{/* <BtnIcon text='testttttttt' icon={<BiAlarm/>} /> */}
{/* <Chip title='عنوان' value='1232456'/> */}
{/* <DatePickers title='تاریخ امروز'/> */}

{/* <InputIcon/> */}
{/* <InputSelect text='عنوان'/> */}
{/* <InputSelectIcon/> */}
{/* <InputText text='عنوان'/> */}
{/* 
<Modal width={300} height={400} visible={visible} setVisible={setVisible}>
<p>test</p>
</Modal> */}
{/* <CustomSwitch/> */}
{/* <TimePiker title='ساعت'/> */}
{/* <TextIcon icon={<BiExit size={67} color="white"/>} title="4000" subtitle='خارج شده' width='fit-content' height='93px'/> */}
    </div>
  )
}

export default Dashboard