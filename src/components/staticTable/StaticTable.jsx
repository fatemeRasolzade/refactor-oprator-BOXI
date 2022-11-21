import React from 'react'
import { useTable, usePagination, useRowSelect } from 'react-table'




const IndeterminateCheckbox = React.forwardRef(
  ({data, indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} onClick={(e)=>{
         if(e.target.checked===true){
          console.log(data)
         }
         
          }}/>
      </>
    )
  }
)

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} data={row}/>
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // Render the UI for your table
  return (
    <>
     <div className='p-5'>
      <table {...getTableProps()} className='w-full text-center overflow-auto '>
        <thead className='bg-tableColor h-40 font-thin'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} >{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className="even:bg-gray-100 h-9">
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className="border-gray-300 border ">{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
     
      <div className="text-center mt-10">
      
        {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-gray-500 p-1 cursor-pointer rounded-md text-white">
          {'<<'}
        </button>{' '} */}
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-tomato px-3 py-1 cursor-pointer rounded-md text-white border-none">
          {'<'}
        </button>{' '}
        <span>
          صفحه{' '}
          <strong>
            {pageIndex + 1} از {pageOptions.length}
          </strong>{' '}
        </span>
        {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="bg-gray-500 p-1 cursor-pointer rounded-md text-white">
          {'>>'}
        </button>{' '} */}
        <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-tomato px-3 py-1 cursor-pointer rounded-md text-white border-none ">
          {'>'}
        </button>{' '}
       
       
       
        <select
          value={pageSize}
          className="p-2 border-lightGray rounded-md mr-4"
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              نمایش {pageSize} تایی
            </option>
          ))}
        </select>
       
      </div>
      </div>
    </>
  )
}

function StaticTable({data,column}) {

  return (
   
      <Table columns={column}  data={data}/>
    
  )
}

export default StaticTable
