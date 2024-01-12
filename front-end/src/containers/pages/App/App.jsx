// Tools
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../../../component/NotFound/NotFound";
import ProtectedAdmin from "./ProtectedAdmin";
// Teacher
import TeacherDashboard from "../Teacher/Dashboard/TeacherDashboard";
import Lesson from "../Teacher/Lesson/Lesson";
import Assignment from "../Teacher/Assignment/Assignment";
import Attendance from "../Teacher/Attendance/Attendance";
import Announcement from "../Teacher/Announcement/Announcement";
// Admin
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import Major from "../Admin/Major/Major";
import Group from "../Admin/Group/Group";
import Subject from "../Admin/Group/Subject";
import User from "../Admin/User/User";
import Admin from "../Admin/User/Admin";
import Teacher from "../Admin/User/Teacher";
import Schedule from "../Admin/Schedule/Schedule";
import History from "../Admin/History/History";
import HistoryLog from "../Admin/History/HistoryLog";
import HistoryData from "../Admin/History/HistoryData";
// User
import Home from "../User/Home/Home";
import Login from "../Login/Login";
import AssignmentUser from "../User/Assignment/Assignment";
import AttendanceUser from "../User/Attendance/Attendance";
import AnnouncementUser from "../User/Announcement/Announcement";
import LessonUser from "../User/Lesson/Lesson";

import Tester from "../../Tester/Tester";
import AttendanceResult from "../Teacher/Result/AttendanceResult";
import AssignmentResult from "../Teacher/Result/AssignmentResult";
import Grade from "../Teacher/Grade/Grade";
import First from "../Login/First";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        {/* Admin */}
        <Route path="/admin/dashboard" element={<ProtectedAdmin Component={<AdminDashboard />} />} />
        <Route path="/admin/add" element={<ProtectedAdmin Component={<Admin />} />} />
        <Route path="/admin/major" element={<ProtectedAdmin Component={<Major />} />} />
        <Route path="/admin/subject" element={<ProtectedAdmin Component={<Subject />} />} />
        <Route path="/admin/group" element={<ProtectedAdmin Component={<Group />} />} />
        <Route path="/admin/user" element={<ProtectedAdmin Component={<User />} />} />
        <Route path="/admin/teacher" element={<ProtectedAdmin Component={<Teacher />} />} />
        <Route path="/admin/schedule" element={<ProtectedAdmin Component={<Schedule />} />} />
        <Route path="/admin/history" element={<ProtectedAdmin Component={<History />} />} />
        <Route path="/admin/history/log" element={<ProtectedAdmin Component={<HistoryLog />} />} />
        <Route path="/admin/history/data" element={<ProtectedAdmin Component={<HistoryData />} />} />
        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<ProtectedAdmin TeacherComponent={<TeacherDashboard />} />} />
        <Route path="/teacher/assignment" element={<ProtectedAdmin TeacherComponent={<Assignment />} />} />
        <Route path="/teacher/attendance" element={<ProtectedAdmin TeacherComponent={<Attendance />} />} />
        <Route path="/teacher/attendance/result" element={<ProtectedAdmin TeacherComponent={<AttendanceResult />} />} />
        <Route path="/teacher/assignment/result" element={<ProtectedAdmin TeacherComponent={<AssignmentResult />} />} />
        <Route path="/teacher/lesson" element={<ProtectedAdmin TeacherComponent={<Lesson />} />} />
        <Route path="/teacher/announcement" element={<ProtectedAdmin TeacherComponent={<Announcement />} />} />
        <Route path="/teacher/grade" element={<ProtectedAdmin TeacherComponent={<Grade />} />} />
        {/* User */}
        <Route path="/home" element={<ProtectedAdmin UserComponent={<Home />} />} />
        <Route path="/assignment" element={<ProtectedAdmin UserComponent={<AssignmentUser />} />} />
        <Route path="/attendance" element={<ProtectedAdmin UserComponent={<AttendanceUser />} />} />
        <Route path="/announcement" element={<ProtectedAdmin UserComponent={<AnnouncementUser />} />} />
        <Route path="/lesson" element={<ProtectedAdmin UserComponent={<LessonUser />} />} />
        {/* Routes Test */}
        <Route path="/" element={<ProtectedAdmin UserComponent={<First />} />} />
        <Route path="/component/test" element={<Tester />} />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}
export default App;
