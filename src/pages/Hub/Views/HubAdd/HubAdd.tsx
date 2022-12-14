import {useEffect,useState} from "react"
import { Button } from '@material-tailwind/react'
import Checkbox from '../../../../components/checkbox/Checkbox'
import DatePickers from '../../../../global/DatePicker/DatePicker'
import InputText from '../../../../global/InputText/InputText'
import InputSelect from '../../../../global/InputSelect/InputSelect'
import { Formik,useFormik } from "formik";
import { addHubschema } from '../../../../global/Validation/Validation'
import { getDataHeaderServer, postDataHeaderToServer, PostDataParams } from "../../../../services/Service_call"
import { apiRoute } from "../../../../services/apiRoute"
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert"
import * as Yup from "yup"
import Modal from "../../../../global/Modal/Modal"
const HubAdd = ({active,setActive,dataEdit}:{active?:boolean,setActive?:any,dataEdit?:any}) => {
  const [typeHub, settypeHub] = useState([]);
  const [catHub, setCatHub] = useState([]);
  const [citys, setCities] = useState([]);
  const [provinceLoc, setProvinceLoc] = useState([]);
  const [selectProvince, setSelectProvince] = useState([]);
  const [selectHub, setselectHub] = useState([]);
 
  useEffect(() => {
    function getDataSelect() {
      try {
        getDataHeaderServer(apiRoute().get.get_hub_type).then((res) => {
          if (res.status === "OK") settypeHub(res.payload);
        });
        getDataHeaderServer(apiRoute().get.select_hub_category).then((res) => {
          if (res.status === "OK") setCatHub(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.get_province_city).then((res) => {
          if (res.status === "OK") setCities(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.get_province_loc).then((res) => {
          if (res.status === "OK") setProvinceLoc(res.payload.content);
        });
        getDataHeaderServer(apiRoute().get.get_select_province).then((res) => {
          if (res.status === "OK") setSelectProvince(res.payload.content);
        });

        getDataHeaderServer(apiRoute().get.select_hub).then(res=>{if(res.status === "OK") setselectHub(res.payload.content)})
      } catch (error) {
        ErrorAlert("???????????? ???????? ???? ???????? ?????????? ????");
      }
    }
    getDataSelect();
  }, []);

  const validation=Yup.object({
    code:Yup.string().required(),
    name:Yup.string().required(),
  })

  

  const formik=useFormik({
    
    initialValues:{
          code: "",
          name: "",
          selectHubType: {
            id:"",
            text:""
          },
          selectHubCategory:null,
          selectParentHub: null,
          pinCode: "",
          locationStartDate:null,
          mandatoryArrivalScan:false,
          isActive:true,
          dropOffAllowed:false,
          selectState:null,
          selectCity:null,
          selectRegion:null,
          plateNumber:"",
          addressLine1:"",
          addressLine2:"",
          locLate: "",
          locLong: "",
         
          // fullName:"",
          // phone:"",
          // email:""
        }

    ,
    onSubmit:(values)=>{
      postDataHeaderToServer(apiRoute().post.hub, values).then((res) => {
        if (res.status === "OK") {
          SuccessAlert("???? ???????????? ?????????? ????");
        } else {
          ErrorAlert("?????? ???? ?????????????? ??????????????");
        }
      });
    }
  })


  

   useEffect(()=>{


   },[])





  return (
    <>
<Modal visible={active} setVisible={setActive} title="???????????? ??????">

     <form onSubmit={formik.handleSubmit}>
     <div className='w-full grid grid-cols-5 gap-2'>
       <div ><InputText label='??????????' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full"  error={formik.touched.code && formik.errors.code}/></div>
       <div ><InputText label='?????? ??????' name="name" handleChange={formik.handleChange} values={formik.values.name} important type={"text"} wrapperClassName="!w-full min-w-0" error={formik.touched.name && formik.errors.name}/></div>
        <div> <InputSelect label='?????? ??????' name="selectHubType" handleChange={formik.setFieldValue} values={formik.values.selectHubType} options={typeHub} wrapperClassName="!w-full min-w-0" important/></div>
       <div><InputSelect label='???????? ??????' name="selectHubCategory" handleChange={formik.setFieldValue} values={formik.values.selectHubCategory} options={catHub} wrapperClassName="!w-full min-w-0" important/></div>
       
       { formik?.values?.selectHubType.text === "????????" ? (<div><InputSelect label='?????? ????????' name="selectParentHub" handleChange={formik.setFieldValue} values={formik.values.selectParentHub} options={selectHub} wrapperClassName="!w-full min-w-0" important/></div>) : null }
         
       
       {/* <div ><InputText label='?????? ????'  name="pinCode" handleChange={formik.handleChange} values={formik.values.pinCode} type={"text"} wrapperClassName="!w-full min-w-0"/></div> */}
       <div className="col-span-5">
       <div className="grid grid-cols-5 gap-4">
       <div><DatePickers title='?????????? ???????? ????????????' name="locationStartDate" handleChange={formik.setFieldValue} values={formik.values.locationStartDate} important/></div>
       <div><Checkbox title='???????? ???????????? ???? ?????????? ?????? ???????????? ???? ????????' name="mandatoryArrivalScan" handleChange={formik.handleChange} values={formik.values.mandatoryArrivalScan}/></div> 
       
       <div><Checkbox title='????????' name="isActive" handleChange={formik.handleChange} values={formik.values.isActive}/></div>
       {formik?.values?.selectHubType.text === "????????" ? <div><Checkbox title='?????????? ?????????? ???????????? ????????' name="dropOffAllowed" handleChange={formik.handleChange} values={formik.values.dropOffAllowed}/></div>: null}
       </div>
       </div>


     <div className="col-span-5">

     <div className="grid grid-cols-5 gap-4"> <InputSelect label='??????????' name="selectState" handleChange={formik.setFieldValue} values={formik.values.selectState} options={selectProvince} wrapperClassName="!w-full min-w-0"/>
      <div><InputSelect label='??????' name="selectCity" handleChange={formik.setFieldValue} values={formik.values.selectCity} options={citys} wrapperClassName="!w-full min-w-0"/></div>
       <div><InputSelect label='??????????' name="selectRegion" handleChange={formik.setFieldValue} values={formik.values.selectRegion} options={provinceLoc} wrapperClassName="!w-full min-w-0"/></div> 
       <div ><InputText label='????????' name="plateNumber" handleChange={formik.handleChange} values={formik.values.plateNumber} type={"number"} wrapperClassName="!w-full min-w-0"/></div>
       <div ><InputText label='???????? 1' name="addressLine1" handleChange={formik.handleChange} values={formik.values.addressLine1} type={"text"} wrapperClassName="!w-full min-w-0"/></div>
      </div>
     </div>
     
      

       <div className='!col-span-2 ' ><InputText label='???????? 2' name="addressLine2" handleChange={formik.handleChange} values={formik.values.addressLine2} type={"text"} wrapperClassName="!w-full min-w-0"/></div>
       {/* <div>????????</div> */}
              <div className="col-span-5 flex flex-row justify-end items-center">
                <Button
                  className="border-none bg-secondaryColor text-dark"
                  onClick={() =>setActive(false) }
                >
                  ??????
                </Button>
                <Button className="border-none bg-tomato mr-3" type="submit">
                  ????????????
                </Button>
              </div>
            </div>
          </form>
          
        
    
    </Modal>
    </>
  );
};

export default HubAdd;
