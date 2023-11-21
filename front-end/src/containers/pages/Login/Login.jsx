import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Password from "../../../component/Password/Password";

const Login = () => {
  let role = localStorage.getItem("role");
  useEffect(() => {
    if (localStorage.getItem("user-info") != null) {
      navigate(`/${role}/dashboard`);
    }
  }, []);

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
        if (res.data.role == "admin") {
          navigate("/admin/dashboard");
          localStorage.setItem("user-info", res.data.name);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user-id", res.data.id);
        } else if (res.data.role == "teacher") {
          navigate("/teacher/dashboard");
          localStorage.setItem("user-info", res.data.name);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user-id", res.data.id);
        } else if(res.data.role == "student"){
          navigate("/");
          localStorage.setItem("user-info", res.data.name);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user-id", res.data.id);
        } else {
          setData({ username: "", password: "", message: res.data.message });
        }
      })
      .catch((err) => {
        setData({ message: "login error" });
      });
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-green-500 w-[35rem] h-96 flex flex-col justify-center items-center rounded-br-[23rem] rounded-tl-[25rem]">
          <h1 className="text-3xl font-bold mb-5">Login Page</h1>
          <input
            className="h-12 w-[14.5rem] border rounded-md mb-5 px-3"
            type="text"
            name="username"
            placeholder="Username"
            onChange={({ target }) => handleChangeText(target)}
            value={data.username}
            autoComplete="off"
          />
          <Password value={data.password} onChange={({ target }) => handleChangeText(target)} />
          <button
            className="bg-blue-700 hover:bg-blue-300 transition duration-300 text-xl font-bold py-2 w-56 mt-5 rounded-md mb-5"
            onClick={handleLoginSubmit}
          >
            Login
          </button>
          <p className="text-red-700 font-bold text-xl">{data.message}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
