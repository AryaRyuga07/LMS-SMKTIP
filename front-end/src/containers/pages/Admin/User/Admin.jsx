import { useState, useEffect } from "react";
import axios from "axios";

import Table from "../../../../component/Table/Table";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";

const Admin = () => {
  // Admin
  const [admin, setAdmin] = useState([]);
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });
  const [openDeleteAdmin, setOpenDeleteAdmin] = useState(false);
  const [openInsertAdmin, setOpenInsertAdmin] = useState(false);
  const [idAdmin, setIdAdmin] = useState(0);

  const clickRow = (row) => {
    const rowId = row.id;
    console.log(rowId);
  };

  const setInsertAdmin = () => {
    setOpenInsertAdmin(true);
    setAdminData({
      ...adminData,
      username: "",
      password: "",
    });
    // navigate("/admin/Admin/insert");
  };

  const setIdDeleteAdmin = (id) => {
    setOpenDeleteAdmin(true);
    setIdAdmin(id);
  };

  const handleChangeTextAdmin = (e) => {
    setAdminData({
      ...adminData,
      [e.name]: e.value,
    });
  };

  const InsertAdmin = () => {
    const { username, password } = adminData;
    axios
      .post("http://localhost:8000/api/self/data/add", {
        username,
        password,
      })
      .then((res) => {
        setOpenInsertAdmin(false);
        getAdmin();
      })
      .catch((err) => {
        setAdmin({ message: "Insert failed" });
      });
  };

  const DeleteAdmin = (id) => {
    axios
      .post("http://localhost:8000/api/self/delete/" + id)
      .then((res) => {
        setOpenDeleteAdmin(false);
        getAdmin();
      })
      .catch((err) => {
        setAdmin({ message: "get data failed" });
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/self")
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        setAdmin({ message: "get data failed" });
      });
  }, []);

  const getAdmin = () => {
    axios
      .post("http://localhost:8000/api/self")
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        setAdmin({ message: "get data failed" });
      });
  };

  const childrenInsertAdmin = (
    <div className="text-center w-64 h-auto">
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
        <h3 className="text-lg font-black text-gray-800">Insert Form</h3>
        <div className="mt-6 mb-8">
          <label
            htmlFor="username"
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
                value={adminData.username}
                onChange={({ target }) => handleChangeTextAdmin(target)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 mb-8">
          <label
            htmlFor="password"
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
                value={adminData.password}
                onChange={({ target }) => handleChangeTextAdmin(target)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={InsertAdmin}
        >
          Add
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenInsertAdmin(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenDeleteAdmin = (
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
          onClick={() => DeleteAdmin(idAdmin)}
        >
          Delete
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenDeleteAdmin(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const clickhandler = (name) => console.log("delete", name);

  const columnsAdmin = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Buttons",
      button: true,
      width: "12rem",
      cell: (row) => (
        <div className="flex">
          <button
            className="w-16 bg-red-700 p-2 rounded-md text-white hover:text-black hover:bg-red-300 transition duration-300"
            onClick={() => setIdDeleteAdmin(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const tableAdmin = (
    <Table
      data={admin}
      click={clickhandler}
      columns={columnsAdmin}
      title="Admin List"
      clickRow={clickRow}
      clicked={setInsertAdmin}
    />
  );

  return (
    <>
      <div className="w-screen h-screen flex overflow-y-hidden">
        <AdminSidebar />
        <div className="flex flex-col" id="cardList">
          <div className="w-screen flex flex-col" id="firstCard">
            <div>
              <Card elements={tableAdmin} sizeClass="w-full h-max" />
              <Modal
                open={openDeleteAdmin}
                onClose={() => setOpenDeleteAdmin(false)}
                children={childrenDeleteAdmin}
              />
              <Modal
                open={openInsertAdmin}
                onClose={() => setOpenInsertAdmin(false)}
                children={childrenInsertAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
