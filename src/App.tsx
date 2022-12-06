import "./styles/App.css";
import "react-table-6/react-table.css";
import { links } from "./components/SidebarRoutes/SidebarRoutes";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "rodal/lib/rodal.css";
import NotFound from "./pages/NotFound/NotFound";
import HubAdd from "./pages/Hub/Views/HubAdd/HubAdd";

import HubEdit from "./pages/Hub/Views/HubEdit/HubEdit";
import UserService from "./services/UserService";
import Interseptor from "./services/http_service";
import YupDefault from "./tools/config/YupDefault";
import { useEffect } from "react";
function App() {

useEffect(()=>{
    UserService.initKeycloak();

},[])



  return (
    <div className="App">
      <Interseptor />
      <YupDefault />

      <Routes>
        {links.map((item) =>
          item.childs.map((route) => (
            <Route path={route.to} element={route.component} />
          ))
        )}
        <Route path="*" element={<NotFound />} />
        <Route path="/hub/add" element={<HubAdd />} />
        <Route path="/hub/edit" element={<HubEdit />} />
      </Routes>
    </div>
  );
}

export default App;
