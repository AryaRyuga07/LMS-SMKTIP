// Tools
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../../../component/NotFound/NotFound";
// Teacher
import TeacherDashboard from "../Teacher/Dashboard/TeacherDashboard";
// Admin
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import Major from "../Admin/Major/Major";
import Group from "../Admin/Group/Group";
import Subject from "../Admin/Group/Subject";
import User from "../Admin/User/User";
import Teacher from "../Admin/User/Teacher";
// User
import Home from "../User/Home/Home";
import Login from "../Login/Login";
import Assignment from "../Teacher/Assignment/Assignment";
import Attendance from "../Teacher/Attendance/Attendance";
import Lesson from "../Teacher/Lesson/Lesson";

import Password from "../../../component/Password/Password"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/major" element={<Major />} />
        <Route path="/admin/subject" element={<Subject />} />
        <Route path="/admin/group" element={<Group />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/teacher" element={<Teacher />} />
        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/assignment" element={<Assignment />} />
        <Route path="/teacher/attendance" element={<Attendance />} />
        <Route path="/teacher/lesson" element={<Lesson />} />
        {/* User */}
        <Route path="/home" element={<Home />} />
        {/* Routes Test */}
        <Route path="/" element={<Home />} />
        <Route path="/component/test" element={<Password />} />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}
export default App;
