import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleLogoutSubmit = () => {
    navigate("/auth/login");
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <button onClick={handleLogoutSubmit}>Logout</button>
    </div>
  );
};

export default TeacherDashboard;
