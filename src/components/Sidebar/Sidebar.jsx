import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { links } from "../SidebarRoutes/SidebarRoutes";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ setToggle }) => {
  const navigate = useNavigate();
  return (
    <>
      <SideNav
        style={{ right: "0", top: "0", bottom: "0", width: "50px" }}
        className="!bg-gray-900 focus:content-none"
        onSelect={(e) => (e !== undefined ? navigate(`/${e}`) : navigate(`/`))}
      >
        <img
          src={require("../../assets/images/Boxi-3.png")}
          alt="logo"
          className="mx-auto mt-5 mb-7"
        />
        <SideNav.Toggle onClick={() => setToggle((last) => !last)} />
        <SideNav.Nav>
          {links.map((item, index) => {
            const { Icon, label, childs } = item;
            return (
              <NavItem
                key={index}
                eventKey={label}
                className="focus:border-none "
              >
                <NavIcon>{Icon}</NavIcon>
                <NavText>{label}</NavText>
                {childs.map(({ to, label }, index) => (
                  <NavItem key={index} eventKey={to.replace(/^\//, "")}>
                    <NavText style={{ fontWeight: 500, marginRight: 10 }}>
                      {label}
                    </NavText>
                  </NavItem>
                ))}
              </NavItem>
            );
          })}
        </SideNav.Nav>
      </SideNav>
    </>
  );
};

export default Sidebar;
