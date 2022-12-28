import { useNavigate } from "react-router-dom";
import notFound from "../../assets/images/404.jpg";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="centering h-[40rem] flex-col">
      <img width={500} src={notFound} alt="NOTFOUND" />
      <p className="text-2xl">این صفحه در حال توسعه می باشد </p>
      <p onClick={() => navigate("/")} className="text-tomato underline mt-2 cursor-pointer text-base">
        بازگشت به صفحه اصلی
      </p>
    </div>
  );
};

export default NotFound;
