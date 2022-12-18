import React from "react";
import StaticTable from "../../../../components/staticTable/StaticTable";
import AddForm from "./AddFormToList";
import AddListToApi from "./AddListToApi";

const AddEditGeographic = () => {
  return (
    <div>
      <AddForm />
      <StaticTable data={[]} column={[]} pagination={7} selectable={false} />
      <AddListToApi tableList={[]} />
    </div>
  );
};

export default AddEditGeographic;
