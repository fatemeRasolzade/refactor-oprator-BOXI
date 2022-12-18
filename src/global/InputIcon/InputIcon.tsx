import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const InputIcon = ({text,item,handleOnSearch,handleOnSelect,onClear}:{text?:string ,onClear?:any,item?:any,handleOnSelect?: any ,handleOnSearch?:((keyword: any, results: unknown[]) => void) | undefined}) => {

      const formatResult = (item:any) => {
 return (
          <>
           <span style={{ display: 'block', textAlign: 'right' }}>{item.name}</span>
          </>
        )
      }
  return (
    <div className='autoComplete' data-before={text} dir='ltr'>
        <ReactSearchAutocomplete
       styling={{height:"36px"}}
        items={item}
             onSearch={handleOnSearch}
           onSelect={handleOnSelect}
           autoFocus
        onClear={onClear}
            formatResult={formatResult}
          />
    </div>
 

  
  )
}

export default InputIcon