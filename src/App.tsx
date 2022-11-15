import React, { useState } from "react";
import "./App.css";
import "react-table-6/react-table.css";
import { links } from "./components/SidebarRoutes/SidebarRoutes";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "rodal/lib/rodal.css";
import NotFound from "./pages/NotFound/NotFound";
import TimePiker from "./global/TimePicker/TimePiker";
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


    
    </div>
  );
}

export default App;
