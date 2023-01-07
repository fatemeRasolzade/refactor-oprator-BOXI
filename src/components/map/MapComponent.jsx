import { Chip } from "@material-tailwind/react";
import { useFormik } from "formik";
import Mapir from "mapir-react-component";
import { useState } from "react";
import { BsListUl } from "react-icons/bs";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import VehiclePelak from "../../global/VehiclePelak/VehiclePelak";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
const apiKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMwMmU0NWFiYTQ4NTliOTk0MGUxNjMxNGFiYzI4YWYxMzUxZDVmNjdjMGNlYzk5OTk2ZGNkM2NhY2UwYzIxOTc4YmQyM2FjZThiZDU0ZTQyIn0.eyJhdWQiOiIyMDU4NiIsImp0aSI6ImMwMmU0NWFiYTQ4NTliOTk0MGUxNjMxNGFiYzI4YWYxMzUxZDVmNjdjMGNlYzk5OTk2ZGNkM2NhY2UwYzIxOTc4YmQyM2FjZThiZDU0ZTQyIiwiaWF0IjoxNjcyNzMwNzg4LCJuYmYiOjE2NzI3MzA3ODgsImV4cCI6MTY3NTIzNjM4OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.EomlDf3bHNVopTXiJzWQYKB5-CWw0O3OPfwR979JmPyDsq5ls1UD0pKFT2bOP5WxpE7hs6GQQW3b3Fst5vO9pcx07JyXNSjlSFeURHN8La7QPzXBOF-QaEjaE88c6V52uomtC0qmOiFbzyx6f8TkvI-2-g1KSYekwqKMUWqr8aI8yP6lwtZaDD_VUfG5h_8av6hNHBCN8SMRCBDIF2hBO8nCv7JTo9lwXJ8qWcjFQ3Bm8amU02K-Sr728K8EF0DosZyuNgNWLI3dDiQEHgTGGm3VfZ3QUKx8Y3bWcO4v3bZmU-ZzDwEx9MGNRGElnbusfolDtDF-PHIgvRUQvc60nQ";

const MapComponent = () => {
  const [filterDataChip, setFilterDataChip] = useState({});

  const Map = Mapir.setToken({
    transformRequest: (url) => {
      return {
        url: url,
        headers: {
          "x-api-key": apiKey,
          "Mapir-SDK": "reactjs",
        },
      };
    },
  });
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {},
  });
  return (
    <div className="h-full">
      <Breadcrumb curentPage="مدیریت جمع آوری" />
      <div className="w-full h-full flex relative">
        <div className="w-[15%] bg-white flex flex-col items-start gap-5 h-full z-10">
          <SimpleButton
            className="w-62"
            handelClick={() => console.log()}
            text="دریافت اطلاعات بیشتر"
            RightIcon={<BsListUl />}
          />
          <form>
            <VehiclePelak formik={formik} />
          </form>
          {filterDataChip && (
            <Chip filterData={filterDataChip} formData={formik} />
          )}
        </div>
        <div className="w-full h-full flex absolute">
          <div className="w-full h-full relative">
            <Mapir Map={Map} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
