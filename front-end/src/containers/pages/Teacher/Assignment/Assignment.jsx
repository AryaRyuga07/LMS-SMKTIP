import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import Table from "../../../../component/Table/Table";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Assignment = () => {
  return (
    <div className="w-screen flex">
      <TeacherSidebar />
      <h1>Assign</h1>
    </div>
  );
};

export default Assignment;
