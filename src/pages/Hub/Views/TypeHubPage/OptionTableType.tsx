import { FC } from "react";
import { BiPlus} from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";

interface OptionsTableProps {
   exportExcel?: any;
   setIsActive?:any;
   activesw?:any;
   setActivesw?:any;
}
const OptionsTableType: FC<OptionsTableProps> = ({exportExcel,setIsActive,activesw,setActivesw}) => {

  return (
    <div className="mt-3">
      <ul className="flex gap-4 justify-start items-center flex-wrap">
        {/* <AddButton />  */}
        <li>
            <SimpleButton 
                text="افزودن"
                className="full-tomato-btn w-[160px] h-[40px] centering rounded-lg text-white"
                icon={<BiPlus color="white" />}
                handelClick={()=>setIsActive((prev:boolean)=>!prev)}
              />
           </li>
            <li>
          <SimpleButton
            handelClick={exportExcel}
            text="خروجی اکسل"
            icon={<GoDesktopDownload color="black" />}
            className="centering rounded-lg text-black w-full"
          />
        </li>
        <li>

          <CustomSwitch
            active={activesw ? activesw : false}
            handleChange={(value: boolean) =>setActivesw(value as boolean)}
          />

        </li>
     
      </ul>
    </div>
  );
};

export default OptionsTableType;
