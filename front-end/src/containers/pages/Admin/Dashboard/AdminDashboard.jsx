import { useNavigate } from "react-router-dom";
import SidebarDashboard from "../../../../component/Sidenav/SidebarDashboard";
import Dashboard from "../../../../component/Dashboard/Dashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogoutSubmit = () => {
    navigate("/auth/login");
  };

  return (
    <div className="max-w-screen max-h-screen flex">
      <SidebarDashboard />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
