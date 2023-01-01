import StatusBar from "../../components/StatusBar/StatusBar";

const ConsignmentManage = () => {
  const Options = [
    { name: "All", value: 1000 },
    { name: "Planned", value: 1000 },
    { name: "NotPlanned", value: 1000 },
    { name: "InTransit", value: 1000 },
    { name: "SuccessfulDelivery", value: 1000 },
    { name: "UnsuccessfulDelivery", value: 1000 },
    { name: "ScanInHub", value: 1000 },
    { name: "Bagged", value: 1000 },
    { name: "Loaded", value: 1000 },
    { name: "EntranceToHub", value: 1000 },
    { name: "BackToOrigin", value: 1000 },
  ];
  return <StatusBar Options={Options} />;
};

export default ConsignmentManage;
