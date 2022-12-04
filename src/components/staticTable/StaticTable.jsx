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
    <>
      <div className="p-5">
        <table
          {...getTableProps()}
          className="w-full text-center overflow-auto "
        >
          <thead className="bg-tableColor h-10 font-thin">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
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
                <tr {...row.getRowProps()} className="even:bg-gray-100 h-9">
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="border-gray-300 border "
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-center mt-10">
          <Paginations pageData={pageTable} />
        </div>
      </div>
    </>
  );
}

function StaticTable({ data, column, pagination }) {
  console.log(pagination);

  return <Table columns={column} data={data} pageTable={pagination} />;
}

export default StaticTable;
