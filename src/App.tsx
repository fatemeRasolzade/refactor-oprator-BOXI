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
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUserInfo } from "./redux/userInfo/userInfoReducer";
import GeoWrapper from "./pages/CustomGeographic/views/AddGeo/GeoWrapper";
import GeoWrapperEdit from "./pages/CustomGeographic/views/editGeo/GeoWrapperEdit";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "./components/Layout/DashboardLayout";
import AddConsignmentManage from "./pages/ConsignmentManage/view/AddConsignmentManage";

function App() {
  const dispatch = useDispatch();
  const username = localStorage.getItem("userName");
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
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/" element={<DashboardLayout />}>
          {/* <Route path="*" element={<NotFound />} /> */}
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
            element={<GeoWrapper />}
          />
          <Route
            path="/basic-information/custom-geographic-category/edit"
            element={<GeoWrapperEdit />}
          />
          <Route path="" element={<GeoWrapperEdit />} />
          <Route path="/consignment-manage/add" element={<AddConsignmentManage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
