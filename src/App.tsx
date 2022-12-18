import "./styles/App.css";
import "react-table-6/react-table.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import { useCallback, useEffect } from "react";
import { links } from "./components/SidebarRoutes/SidebarRoutes";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "rodal/lib/rodal.css";
import NotFound from "./pages/NotFound/NotFound";
import HubAdd from "./pages/Hub/Views/HubAdd/HubAdd";
import HubEdit from "./pages/Hub/Views/HubEdit/HubEdit";
import YupDefault from "./tools/config/YupDefault";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserInfo } from "./redux/userInfo/userInfoReducer";
import CustomGeographic from "./pages/CustomGeographic/CustomGeographic";
import AddEditGeographic from "./pages/CustomGeographic/views/AddGeo/AddEditGeographic";

function App() {
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const userInfo = useSelector((state: any) => state.userInfo);
  const handleGetuserInfo = useCallback(async () => {
    try {
      const res = await axios({
        url: "http://boxi.local:40000/resource-api/permission/fetchPermissionsByUserName",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("myToken"),
        },
        data: {
          in: username,
        },
      });

      dispatch(getUserInfo(res.data));
    } catch (error) {}
  }, [dispatch, username]);

  useEffect(() => {
    if (username) {
      handleGetuserInfo();
    }

    console.log("loop");
  }, [handleGetuserInfo, username]);

  return (
    <div className="App">
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
        <Route
          path="/basic-information/custom-geographic-category/add"
          element={<AddEditGeographic />}
        />
        <Route
          path="/basic-information/custom-geographic-category/edit"
          element={<HubEdit />}
        />
      </Routes>
    </div>
  );
}

export default App;
