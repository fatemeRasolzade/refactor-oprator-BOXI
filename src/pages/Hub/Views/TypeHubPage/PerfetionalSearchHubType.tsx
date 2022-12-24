import { useState } from 'react'
import PerfesionalSearch from '../../../../components/PerfesionalSearch/PerfesionalSearch'
import InputText from '../../../../global/InputText/InputText'
import ModalPerfetional from '../ModalPerfetional/ModalPerfetional'

const PerfetionalSearchHubType = ({formiks}:{formiks:any}) => {

    const[active,setActive]=useState(false)
    const perfetionalClik=()=>{
        setActive(prev=>!prev)
      }


  return (
    <div>
  
    <form onSubmit={formiks.handleSubmit}>
    <PerfesionalSearch formData={formiks.handleSubmit} perfetionalClik={perfetionalClik}>
            <div className="grid grid-cols-2 gap-3">
             <InputText label="کد" name="code" handleChange={formiks.handleChange} values={formiks.values.code} important/>
             <InputText label="توضیحات" name="description" handleChange={formiks.handleChange} values={formiks.values.description} important/>

            </div>
      </PerfesionalSearch> 
      </form>
 


      <ModalPerfetional open={active} handleOpen={setActive}/>


    </div>
  )
}

export default PerfetionalSearchHubType