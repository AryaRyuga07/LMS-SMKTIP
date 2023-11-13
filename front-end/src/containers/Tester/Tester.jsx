import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Password from "../../component/Password/Password";

const Tester = () => {
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
          />
          <Password onChange={({ target }) => handleChangeText(target)} />
          <button className="bg-blue-700 hover:bg-blue-300 transition duration-300 text-xl font-bold py-2 w-56 mt-5 rounded-md mb-5" onClick={handleLoginSubmit}>
            Login
          </button>
          <p>{data.message}</p>
        </div>
      </div>
    </>
  );
};

export default Tester;