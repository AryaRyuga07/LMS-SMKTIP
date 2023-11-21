import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../../../component/NotFound/NotFound";

const ProtectedAdmin = (props) => {
  const navigate = useNavigate();

  let Component = props.Component;
  let TeacherComponent = props.TeacherComponent;
  let UserComponent = props.UserComponent;
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/auth/login");
    }
  }, []);

  if (localStorage.getItem("role") === "admin") {
    TeacherComponent = null;
    UserComponent = null;
  } else if (localStorage.getItem("role") === "teacher") {
    Component = null;
    UserComponent = null;
  } else if (localStorage.getItem("role") === "student") {
    Component = null;
    TeacherComponent = null;
  }

  return (
    <div>
      {Component}
      {TeacherComponent}
      {UserComponent}
    </div>
  );
};

export default ProtectedAdmin;
