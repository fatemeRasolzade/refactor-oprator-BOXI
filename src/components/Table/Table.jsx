import React, { useState } from "react";
import ReactTable from "react-table-6";
import Pagination from "./Pagination";
const Table = ({data,column}) => {

  return (
    <div className="mt-5">
      <ReactTable
        style={{ border: "none" }}
        data={data}
        columns={column}
        defaultPageSize={10}
        PaginationComponent={Pagination}
      />
    </div>
  );
};

export default Table;
