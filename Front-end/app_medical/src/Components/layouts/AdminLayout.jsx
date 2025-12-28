import { Outlet } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";

function AdminLayout() {
  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
