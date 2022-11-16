import React, { useState } from "react";
import ReactTable from "react-table-6";
import Pagination from "./Pagination";
const Table = () => {
  const data = [
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23,
      },
    },
  ];

  const columns = [
    {
      id: "checkbox",
      accessor: "",
      Cell: ({ original }) => {
        return <input type="checkbox" className="checkbox" />;
      },

      sortable: false,
      width: 45,
    },

    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Age",
      accessor: "age",
      Cell: (props) => <span className="number">{props.value}</span>,
    },
    {
      id: "friendName",
      Header: "Friend Name",
      accessor: (d) => d.friend.name,
    },
    {
      Header: (props) => <span>Friend Age</span>,
      accessor: "friend.age",
    },
  ];

  return (
    <div className="mt-5">
      <ReactTable
        style={{ border: "none" }}
        data={data}
        columns={columns}
        defaultPageSize={6}
        PaginationComponent={Pagination}
      />
    </div>
  );
};

export default Table;
