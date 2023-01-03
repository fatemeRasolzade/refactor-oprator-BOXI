import NotFound from "../../components/NotFound/NotFound";
import StatusBar from "../../components/StatusBar/StatusBar";

const TripManagement = () => {
  return (
    <>
      <StatusBar Options={Options} />
      <NotFound />
    </>
  );
};

export default TripManagement;

const Options = [
  { name: "All", value: 10000 },
  { name: "Created", value: 10000 },
  { name: "Allocated", value: 10000 },
  { name: "Started", value: 10000 },
  { name: "Complated", value: 10000 },
];
