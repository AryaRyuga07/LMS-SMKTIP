import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Dashboard from "../../../../component/Dashboard/Dashboard";

const AdminDashboard = () => {
  return (
    <div className="max-w-screen max-h-screen flex">
      <AdminSidebar />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
