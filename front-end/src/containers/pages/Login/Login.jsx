import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "", message: "" });
  const navigate = useNavigate();

  const handleChangeText = (e) => {
    setData({
      ...data,
      [e.name]: e.value,
    });
  };

  const handleLoginSubmit = () => {
    const { username, password } = data;
    axios
      .post("http://localhost:8000/api/login", { username, password })
      .then((res) => {
        setData({ message: res.data.message });
        if (res.data.role == "Admin") {
          navigate("/admin/dashboard");
        } else if (res.data.role == "Teacher") {
          navigate("/teacher/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setData({ message: "login failed" });
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login Page</h1>
        <input
          className="input-form"
          type="text"
          name="username"
          placeholder="Username"
          onChange={({ target }) => handleChangeText(target)}
        />
        <input
          className="input-form"
          type="password"
          placeholder="Password"
          name="password"
          onChange={({ target }) => handleChangeText(target)}
        />
        <button className="btn" onClick={handleLoginSubmit}>
          Login
        </button>
        <p>{data.message}</p>
      </div>
    </div>
  );
};

export default Login;
