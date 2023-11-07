import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import Dashboard from "../../../../component/Dashboard/Dashboard";

const TeacherDashboard = () => {
  return (
    <div className="max-w-screen max-h-screen flex">
      <TeacherSidebar />
      <Dashboard />
    </div>
  );
};

export default TeacherDashboard;
