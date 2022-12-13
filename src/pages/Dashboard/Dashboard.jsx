import React from "react";
import UserService from "../../services/keycloakService";
const Dashboard = () => {
  return (
    <div>
      <button onClick={() => UserService.doLogout()}>logout</button>
      <span>{UserService.getUsername()}</span>
    </div>
  );
};
export default Dashboard;
