import { useNavigate } from "react-router-dom";
const Breadcrumb = ({
  curentPage,
  beforePage,
}: {
  curentPage?: string;
  beforePage?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex-start-center text-xl">
      <h2 className="text-xl ">{curentPage}</h2>
      <span className="px-3">{">"}</span>
      <button className="border-none" onClick={() => navigate(-1)}>
        <h2 className="text-xl">{beforePage}</h2>
      </button>
    </div>
  );
};

export default Breadcrumb;
