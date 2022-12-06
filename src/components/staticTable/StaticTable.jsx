import React from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import Paginations from "./../../global/Pagination/Pagination";

const IndeterminateCheckbox = React.forwardRef(
  ({ data, indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          onClick={(e) => {
            if (e.target.checked === true) {
              console.log(data);
            }
          }}
        />
      </>
    );
  }
);

function Table({ columns, data, pageTable }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          // Header: ({ getToggleAllPageRowsSelectedProps }) => (
          //   <div>
          //     <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          //   </div>
          // ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          // Cell: ({ row }) => (
          //   <div>
          //     <IndeterminateCheckbox
          //       {...row.getToggleRowSelectedProps()}
          //       data={row}
          //     />
          //   </div>
          // ),
        },
        ...columns,
      ]);
    }
  );

  // Render the UI for your table
  return (
    <div className="overflow-auto bg-white rounded-lg shadow-md  mt-6">
      <table
        {...getTableProps()}
        className="border-collapse table-auto w-full bg-white table-striped rounded-lg text-center"
      >
        <thead className="bg-mainGray h-12 rounded-lg text-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className=" font-normal" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="even:bg-lightGray h-12 text-dark"
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

          {page.length === 0 && (
            <div className="h-20 centering w-full">
           
                <>موردی یافت نشد</>
        
            </div>
          )}
      <div className="text-center">
        <Paginations pageData={pageTable} />
      </div>
    </div>
  );
}

function StaticTable({ data, column, pagination }) {
  console.log(pagination);

  return <Table columns={column} data={data} pageTable={pagination} />;
}

export default StaticTable;
