import { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../../../component/Table/Table";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";

const Teacher = () => {
  // Teacher
  const [teacher, setTeacher] = useState([]);
  const [teacherData, setTeacherData] = useState({
    external_id: "",
    full_name: "",
    username: "",
    password: "",
  });
  const [openDeleteTeacher, setOpenDeleteTeacher] = useState(false);
  const [openUpdateTeacher, setOpenUpdateTeacher] = useState(false);
  const [openInsertTeacher, setOpenInsertTeacher] = useState(false);
  const [idTeacher, setIdTeacher] = useState(0);

  const clickRow = (row) => {
    const rowId = row.id;
    console.log(rowId);
  };

  const setInsertTeacher = () => {
    setOpenInsertTeacher(true);
    setTeacherData({
      ...teacherData,
      external_id: "",
      full_name: "",
      username: "",
      password: "",
    });
    // navigate("/admin/Teacher/insert");
  };

  const setIdUpdateTeacher = (id) => {
    setOpenUpdateTeacher(true);
    setIdTeacher(id);
    axios
      .post("http://localhost:8000/api/teacher/" + id)
      .then((res) => {
        console.log(res.data);
        setTeacherData({
          external_id: res.data.teachers[0].external_id,
          full_name: res.data.teachers[0].full_name,
          username: res.data.user.name,
          password: res.data.user.password,
        });
      })
      .catch((err) => {
        setTeacher({ message: "get data failed" });
      });
    // navigate("/admin/Teacher/update");
  };

  const setIdDeleteTeacher = (id) => {
    setOpenDeleteTeacher(true);
    setIdTeacher(id);
  };

  const handleChangeTextTeacher = (e) => {
    setTeacherData({
      ...teacherData,
      [e.name]: e.value,
    });
  };

  const InsertTeacher = () => {
    const { external_id, full_name, username, password } = teacherData;
    axios
      .post("http://localhost:8000/api/teacher/data/add", {
        external_id,
        full_name,
        username,
        password,
      })
      .then((res) => {
        alert("Insert Success");
        setOpenInsertTeacher(false);
        window.location.reload(true);
      })
      .catch((err) => {
        setTeacher({ message: "Insert failed" });
      });
  };

  const DeleteTeacher = (id) => {
    axios
      .post("http://localhost:8000/api/teacher/delete/" + id)
      .then((res) => {
        alert("Delete Success");
        setOpenDeleteTeacher(false);
        window.location.reload(true);
      })
      .catch((err) => {
        setTeacher({ message: "get data failed" });
      });
  };

  const UpdateTeacher = (id) => {
    const { external_id, full_name, username, password } = teacherData;
    axios
      .post("http://localhost:8000/api/teacher/update/" + id, {
        username,
        password,
        external_id,
        full_name,
      })
      .then((res) => {
        alert("Update Success");
        setOpenUpdateTeacher(false);
        window.location.reload(true);
      })
      .catch((err) => {
        setTeacher({ message: "Update failed" });
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/teacher")
      .then((res) => {
        setTeacher(res.data);
      })
      .catch((err) => {
        setTeacher({ message: "get data failed" });
      });
  }, []);

  const childrenInsertTeacher = (
    <div className="text-center w-96 h-auto">
      <div className="w-20 h-20 mx-auto flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-blue-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="mx-auto my-4 w-48">
        <h3 className="text-lg font-black text-gray-800">Update Form</h3>
        <div className="flex justify-center">
          <div className="flex flex-col mr-10">
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                NIP
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="external_id"
                    id="external_id"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="NIP"
                    value={teacherData.external_id}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Full Name"
                    value={teacherData.full_name}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Username"
                    value={teacherData.username}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Password"
                    value={teacherData.password}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={InsertTeacher}
        >
          Add
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenInsertTeacher(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenUpdateTeacher = (
    <div className="text-center w-96 h-auto">
      <div className="w-20 h-20 mx-auto flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      <div className="mx-auto my-4 w-48">
        <h3 className="text-lg font-black text-gray-800">Update Form</h3>
        <div className="flex justify-center">
          <div className="flex flex-col mr-10">
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                NIP
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="external_id"
                    id="external_id"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="NIP"
                    value={teacherData.external_id}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Full Name"
                    value={teacherData.full_name}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mt-6 mb-0">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Username"
                    value={teacherData.username}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 mb-8">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
                <span className="text-xs block">
                  (No need to fill in, if you remember the password)
                </span>
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Password"
                    value={teacherData.password}
                    onChange={({ target }) => handleChangeTextTeacher(target)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={() => UpdateTeacher(idTeacher)}
        >
          Update
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenUpdateTeacher(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenDeleteTeacher = (
    <div className="text-center w-56">
      <div className="w-20 h-20 mx-auto flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <div className="mx-auto my-4 w-48">
        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
        <p className="text-sm text-gray-500">Are you sure want delete?</p>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-red-700 shadow-red-400/40 w-full p-1 hover:bg-red-500 rounded-md"
          onClick={() => DeleteTeacher(idTeacher)}
        >
          Delete
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenDeleteTeacher(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const clickhandler = (name) => console.log("delete", name);

  const columnsTeacher = [
    {
      name: "NIP",
      selector: "external_id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "full_name",
      sortable: true,
    },
    {
      name: "Buttons",
      button: true,
      width: "12rem",
      cell: (row) => (
        <div className="flex">
          <button
            className="w-16 mr-5 bg-blue-600 p-2 rounded-md text-white hover:text-black hover:bg-blue-200 transition duration-300"
            onClick={() => setIdUpdateTeacher(row.user_id)}
          >
            Edit
          </button>
          <button
            className="w-16 bg-red-700 p-2 rounded-md text-white hover:text-black hover:bg-red-300 transition duration-300"
            onClick={() => setIdDeleteTeacher(row.user_id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const tableTeacher = (
    <Table
      data={teacher}
      click={clickhandler}
      columns={columnsTeacher}
      title="Teacher List"
      clickRow={clickRow}
      clicked={setInsertTeacher}
    />
  );

  return (
    <>
      <div className="w-screen h-screen flex overflow-y-hidden">
        <AdminSidebar />
        <div className="flex flex-col" id="cardList">
          <div className="w-screen flex flex-col" id="firstCard">
            <div>
              <Card elements={tableTeacher} sizeClass="w-full h-max" />
              <Modal
                open={openDeleteTeacher}
                onClose={() => setOpenDeleteTeacher(false)}
                children={childrenDeleteTeacher}
              />
              <Modal
                open={openUpdateTeacher}
                onClose={() => setOpenUpdateTeacher(false)}
                children={childrenUpdateTeacher}
              />
              <Modal
                open={openInsertTeacher}
                onClose={() => setOpenInsertTeacher(false)}
                children={childrenInsertTeacher}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
