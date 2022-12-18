import React, { useEffect, useState } from "react";
import { BiSearch, BiX, BiChevronDown } from "react-icons/bi";
import Chip from "../../global/Chip/Chip";
import InputIcon from "../../global/InputIcon/InputIcon";
import InputSelect from "../../global/InputSelect/InputSelect";
import InputText from "../../global/InputText/InputText";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import CustomizeModal from "../PerfesionalSearch/CustomizeModal";
import PerfesionalSearch from "./../PerfesionalSearch/PerfesionalSearch";
import { Formik,ErrorMessage } from "formik";
import { getDataHeaderServer } from "../../services/Service_call";
import { apiRoute } from "../../services/apiRoute";
import ModalPerfetional from "../../pages/Hub/Views/ModalPerfetional/ModalPerfetional";
const NavbarSearch = ({ firstTextInput, secondTextInput }: { firstTextInput?: string; secondTextInput?: string }) => {
  const [shelf, setShelf] = useState<string>("");
  const [hub, sethub] = useState<string>("");

  interface PropData {
    label: string;
    number: string;
  }

useEffect(()=>{
  getDataHeaderServer(apiRoute().get.get_hub_type,{headers:{
    "Authorization":"Bearer " + localStorage.getItem("myToken")
  }}).then((res) => {
    if (res.status === "OK") settypeHub(res.payload);
  });
  getDataHeaderServer(apiRoute().get.select_hub_category,{headers:{
    "Authorization":"Bearer " + localStorage.getItem("myToken")
  }}).then((res) => {
    if (res.status === "OK") setCatHub(res.payload.content);
  });
  getDataHeaderServer(apiRoute().get.select_hub,{headers:{
    "Authorization":"Bearer " + localStorage.getItem("myToken")
  }}).then((res) => {
    if (res.status === "OK") setselectHub(res.payload.content);
  });
},[])



  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [typeHub, settypeHub] = useState([]);
  const [catHub, setCatHub] = useState([]);
  const [selectHub, setselectHub] = useState([]);
  const[active,setActive]=useState(false)

const perfetionalClik=()=>{
  setActive(prev=>!prev)
}


  return (
    <>
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={handelSubmit}>
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            <div className="Max-sm:mb-3">
              <InputIcon text={firstTextInput} handleOnSearch={setShelf} handleOnSelect={undefined} />
            </div>
            <div>
              <InputIcon text={secondTextInput} handleOnSearch={sethub} handleOnSelect={undefined} />
            </div>

            <SimpleButton className="full-gray-btn w-[160px] h-[40px] centering rounded-md" icon={<BiSearch size={20} />} text="جستجو" />
          </div>
        </form>
     

        {/* <CustomizeModal/> */}
        
<Formik
initialValues={{
name:"",
selectHubType:{
  id:0,
  text:""
},
selectHubCategory:{
  id:0,
  text:""
},
selectParentHub:{
  id:0,
  text:""
}
}}

onSubmit={(values)=>{
console.log(values)
}}
>
  {(formik)=>(
    <form onSubmit={formik.handleSubmit}>
    <PerfesionalSearch formData={formik.handleSubmit} perfetionalClik={perfetionalClik}>
            <div className="grid grid-cols-2 gap-3">
             <InputText label="نام هاب" name="name" handleChange={formik.handleChange} values={formik.values.name} important/>
             <InputSelect label="نوع هاب" handleChange={formik.setFieldValue} name="selectHubType" values={formik.values.selectHubCategory} options={typeHub}/>
             <InputSelect label="گونه هاب" handleChange={formik.setFieldValue} name="selectHubCategory" values={formik.values.selectHubType} options={catHub}/>
             <InputSelect label="هاب والد" handleChange={formik.setFieldValue} name="selectParentHub" values={formik.values.selectParentHub} options={selectHub}/>

            </div>
      </PerfesionalSearch> 
      </form>
  )}
      

      </Formik>

<ModalPerfetional open={active} handleOpen={setActive}/>

      

      </div>
    </>
  );
};

export default NavbarSearch;
