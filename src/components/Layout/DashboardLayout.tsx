import Layout from "./Layout";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default DashboardLayout;
