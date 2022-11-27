import "./styles/App.css";
import "react-table-6/react-table.css";
import { links } from "./components/SidebarRoutes/SidebarRoutes";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "rodal/lib/rodal.css";
import NotFound from "./pages/NotFound/NotFound";
import InputIcon from "./global/InputIcon/InputIcon";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import HubAdd from "./pages/Hub/HubAdd/HubAdd";

function App() {
  return (
    <div className="App">
      <Routes>
        {links.map((item) =>
          item.childs.map((route) => (
            <Route path={route.to} element={route.component} />
          ))
        )}
        <Route path="*" element={<NotFound />} />
        <Route path="/hub/add" element={<HubAdd/>}/>
      </Routes>
    </div>
  );
}

export default App;
