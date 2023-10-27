// Tools
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../../../component/NotFound/NotFound";
// Teacher
import TeacherDashboard from "../Teacher/Dashboard/TeacherDashboard";
// Admin
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import Major from "../Admin/Major/Major";
import Group from "../Admin/Group/Group"
import User from "../Admin/User/User";
// User
import Home from "../Main/Home/Home";
import First from "../First/First";
import Login from "../Login/Login";
// Test
import Test from "../Modal/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/major" element={<Major />} />
        <Route path="/admin/group" element={<Group />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<First />} />
        <Route path="/component/test" element={<Test />} />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}
export default App;
