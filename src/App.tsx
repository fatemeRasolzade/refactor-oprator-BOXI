import "./App.css";
import "react-table-6/react-table.css";
import { links } from "./components/SidebarRoutes/SidebarRoutes";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "rodal/lib/rodal.css";
import NotFound from "./pages/NotFound/NotFound";
import InputIcon from "./global/InputIcon/InputIcon";
import Breadcrumb from './components/Breadcrumb/Breadcrumb';

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
      </Routes>

    {/* <InputIcon text="تست" /> */}

   
    </div>
  );
}

export default App;
