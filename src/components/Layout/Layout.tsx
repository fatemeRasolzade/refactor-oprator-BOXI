import { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Sidebar from "../Sidebar/Sidebar";
import { ChildrenProps } from "../../global/Interfaces/Interfaces";
const Layout = ({ children }: ChildrenProps) => {
  const [toggle, setToggle] = useState(false);

  return (

      <div className="min-h-screen flex flex-col overflow-auto">
        <div className="flex flex-col md:flex-row flex-1 relative bg-white">
          <aside
            className={`bg-fuchsia-100 w-fit ${
              toggle ? "md:w-60" : "md:w-20"
            } Max-md:hidden `}
          >
            <Sidebar setToggle={setToggle} />
          </aside>
          <main className="flex-1 overflow-auto p-5">{children}</main>
        </div>
      </div>

  );
};

export default Layout;
