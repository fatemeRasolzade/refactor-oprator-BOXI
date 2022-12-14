import { ClipLoader } from "react-spinners";
import React from "react";
import { useDispatch } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import Paginations from "../../global/Pagination/Pagination";
import { addRows, deleteRow } from "../../redux/selectRowTable/selectRowTable";

const IndeterminateCheckbox = React.forwardRef(({ data, indeterminate, ...rest }, ref) => {
  const dispatch = useDispatch();

  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input
        className="accent-tomato"
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        onClick={(e) => {
          if (e.target.checked) {
            dispatch(addRows(data.original));
          } else {
            dispatch(deleteRow(data.original));
          }
        }}
      />
    </>
  );
});

function Table({ columns, data, pageTable, selectable, loading, THWrapper }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)

    // state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      let isSelectable = selectable
        ? {
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} data={row} />
              </div>
            ),
          }
        : {};
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          ...isSelectable,
        },
        ...columns,
      ]);
    }
  );

  return (
    <div className="overflow-auto bg-white rounded-lg shadow-md  mt-6">
      <table {...getTableProps()} className="border-collapse table-auto w-full bg-white table-striped rounded-lg text-center">
        <thead className="bg-lightTomato h-12 rounded-lg text-dark ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className={` font-normal ${THWrapper} `} {...column.getHeaderProps()}>
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
              <tr {...row.getRowProps()} className="even:bg-lightGray h-12 text-dark">
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

      {loading ? (
        <div className="h-20 cnetering w-full text-center mt-6">
          <ClipLoader />
        </div>
      ) : (
        page.length === 0 && <div className="h-20 centering w-full"> ?????????? ???????? ?????? </div>
      )}

      <Paginations pageData={pageTable} />
    </div>
  );
}

function StaticTable({ data, column, pagination, selectable, loading = false, THWrapper = "min-w-fit" }) {
  return <Table columns={column} data={data} pageTable={pagination} selectable={selectable} loading={loading} THWrapper={THWrapper} />;
}

export default StaticTable;
