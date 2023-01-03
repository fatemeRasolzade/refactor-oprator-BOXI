import React from "react";
import Mapir from "mapir-react-component";
const apiKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMwMmU0NWFiYTQ4NTliOTk0MGUxNjMxNGFiYzI4YWYxMzUxZDVmNjdjMGNlYzk5OTk2ZGNkM2NhY2UwYzIxOTc4YmQyM2FjZThiZDU0ZTQyIn0.eyJhdWQiOiIyMDU4NiIsImp0aSI6ImMwMmU0NWFiYTQ4NTliOTk0MGUxNjMxNGFiYzI4YWYxMzUxZDVmNjdjMGNlYzk5OTk2ZGNkM2NhY2UwYzIxOTc4YmQyM2FjZThiZDU0ZTQyIiwiaWF0IjoxNjcyNzMwNzg4LCJuYmYiOjE2NzI3MzA3ODgsImV4cCI6MTY3NTIzNjM4OCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.EomlDf3bHNVopTXiJzWQYKB5-CWw0O3OPfwR979JmPyDsq5ls1UD0pKFT2bOP5WxpE7hs6GQQW3b3Fst5vO9pcx07JyXNSjlSFeURHN8La7QPzXBOF-QaEjaE88c6V52uomtC0qmOiFbzyx6f8TkvI-2-g1KSYekwqKMUWqr8aI8yP6lwtZaDD_VUfG5h_8av6hNHBCN8SMRCBDIF2hBO8nCv7JTo9lwXJ8qWcjFQ3Bm8amU02K-Sr728K8EF0DosZyuNgNWLI3dDiQEHgTGGm3VfZ3QUKx8Y3bWcO4v3bZmU-ZzDwEx9MGNRGElnbusfolDtDF-PHIgvRUQvc60nQ";

const MapComponent = () => {
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
  return (
    <div className="flex">
      <div className="w-[15%] h-full">dfhdfh</div>
      <div className="w-[85%] h-full">
        <Mapir Map={Map} />
      </div>
    </div>
  );
};

export default MapComponent;
