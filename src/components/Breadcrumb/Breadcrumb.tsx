import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Customkeycloak from "../../KeyCloack";

import UserService from "../../services/keycloakService";
import ChangePasswordModal from "../Navbar/ChangePasswordModal";
import ProfileModal from "../Navbar/ProfileModal";
const Breadcrumb = ({ curentPage, beforePage }: { curentPage?: string; beforePage?: string }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [OpenChangePassword, setOpenChangePassword] = useState(false);
  const handleBlur = (e: { currentTarget: { contains: (arg0: any) => any }; relatedTarget: any }) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setToggle(false);
  };

  return (
    <div className="flex-between-center mb-8 flex-wrap">
      <div className="flex-start-center text-xl">
        <button className="border-none" onClick={() => navigate(-1)}>
          <h2 className="text-xl">{beforePage}</h2>
        </button>
        <span className="px-3">{"/"}</span>
        <h2 className="text-xl ">{curentPage}</h2>
      </div>
      <div className="flex-start-center gap-3">
        <AiOutlineUser size={23} />
        <p className="text-base">
          {UserService.getUsername()}
          {/* {Customkeycloak.tokenParsed?.preferred_username} */}
        </p>
        <div className="relative centering" onBlur={handleBlur}>
          <button className={`${toggle && "rotate-180"} transition-all duration-500`} onClick={() => setToggle(!toggle)}>
            <RiArrowDownSLine size={23} />
          </button>
          {toggle ? (
            <div className="ToggleContainer  !top-8 -right-32">
              <button className="ToggleElements" onClick={() => navigate("/")}>
                داشبورد
              </button>
              <button className="ToggleElements" onClick={() => setOpenProfile(true)}>
                پروفایل
              </button>
              <button className="ToggleElements" onClick={() => setOpenChangePassword(true)}>
                تغییر رمز عبور
              </button>
              <button
                className="ToggleElements"
                onClick={() => UserService.doLogout()}
                // onClick={() => Customkeycloak.logout()}
              >
                خروج
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <ProfileModal open={OpenProfile} setOpen={setOpenProfile} />
      <ChangePasswordModal open={OpenChangePassword} setOpen={setOpenChangePassword} />
    </div>
  );
};

export default Breadcrumb;
