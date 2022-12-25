import { useState } from "react";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputText from "../../../../global/InputText/InputText";
import ModalPerfetional from "../ModalPerfetional/ModalPerfetional";
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
}
const PerfetionalSearchHubType = ({ formiks }: { formiks: any }) => {
  const [active, setActive] = useState(false);
  const [selectedCol, setSelectedCol] = useState<Array<SelectedColInterface>>(
    []
  );
  const perfetionalClik = () => {
    setActive((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={formiks.handleSubmit}>
        <PerfesionalSearch
          formData={formiks.handleSubmit}
          perfetionalClik={perfetionalClik}
        >
          <div className="grid grid-cols-2 gap-3">
            <InputText
              label="کد"
              name="code"
              handleChange={formiks.handleChange}
              values={formiks.values.code}
              important
            />
            <InputText
              label="توضیحات"
              name="description"
              handleChange={formiks.handleChange}
              values={formiks.values.description}
              important
            />
          </div>
        </PerfesionalSearch>
      </form>

      <ModalPerfetional
        open={active}
        handleOpen={setActive}
        selectedCol={selectedCol}
        setSelectedCol={(value: Array<SelectedColInterface>) =>
          setSelectedCol(value)
        }
      />
    </div>
  );
};

export default PerfetionalSearchHubType;
