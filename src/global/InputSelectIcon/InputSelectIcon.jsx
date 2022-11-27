import React from "react";
import Select, { components } from "react-select";
import { BiChevronDown,BiSearchAlt2} from 'react-icons/bi';




 const InputSelectIcon =()=> {
  
  const handleInfluencerName=(event)=> {
    console.log(event);
  }
 
    const influencers = [
      { value: "abc", label: "abc" },
      { value: "def", label: "def" }
    ];

    const ValueContainer = ({ children, ...props }) => {
      return (
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && (
              
               <BiChevronDown style={{ position: "absolute", left: 0 }} size={22}/>
             )}
            {children}
          </components.ValueContainer>
        )
      );
    };

    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
           <BiSearchAlt2 style={{ position: "absolute", right: 6 ,top:10}} size={20}/> 
          </components.DropdownIndicator>
        )
      );
    };

    const styles = {
      valueContainer: base => ({
        ...base,
        paddingLeft: 24,
       
      })
    };

    return (
      <div className='relative w-258 h-48'>
       
          <Select
          isRtl
            options={influencers}
            
            onChange={handleInfluencerName}
            isSearchable={true}
            components={{ DropdownIndicator, ValueContainer }}
          
            className="selectIcon"
            styles={styles}
          />
      
      </div>
    );
  
}

export default InputSelectIcon
