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
import { getUserInfo } from "./redux/userInfo/userInfoReducer";
import axios from "axios";
import UserService from "./services/keycloakService";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.userInfo);
  const handleGetuserInfo = useCallback(
    async (userName: string) => {
      try {
        const res = await axios({
          url: "http://172.16.55.144:20000/resource-api/permission/fetchPermissionsByUserName",
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
          data: {
            in: "alihash",
          },
        });

        dispatch(getUserInfo(res.data));
      } catch (error) {
        alert("error");
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const userName = UserService.getUsername();

    handleGetuserInfo(userName);

    console.log("loop");
  }, [handleGetuserInfo]);

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
      </Routes>
    </div>
  );
}

export default App;
