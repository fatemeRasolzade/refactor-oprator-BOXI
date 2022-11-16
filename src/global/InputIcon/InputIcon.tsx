import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const InputIcon = ({text,item,handleOnSearch}:{text?:string ,item?:any,handleOnSearch?:((keyword: string, results: unknown[]) => void) | undefined}) => {


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
       
        items={item}
             onSearch={handleOnSearch}
           autoFocus
            formatResult={formatResult}
          />
    </div>
 

  
  )
}

export default InputIcon