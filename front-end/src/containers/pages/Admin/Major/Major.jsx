import Table from "../../../../component/Table/Table";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Major = () => {
  const [major, setMajor] = useState([]);
  const [majorName, setMajorName] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openInsert, setOpenInsert] = useState(false);
  const [idMajor, setIdMajor] = useState(0);
  const navigate = useNavigate();

  const handleChangeText = (e) => {
    setMajorName(e.value);
  };

  const setInsert = () => {
    setOpenInsert(true);
    setMajorName("");
    // navigate("/admin/major/insert");
  };

  const setIdUpdate = (id) => {
    setOpenUpdate(true);
    setIdMajor(id);
    axios
      .post("http://localhost:8000/api/major/" + id)
      .then((res) => {
        setMajorName(res.data.name);
      })
      .catch((err) => {
        setMajor({ message: "get data failed" });
      });
    // navigate("/admin/major/update");
  };

  const setIdDelete = (id) => {
    setOpenDelete(true);
    setIdMajor(id);
  };

  const Insert = () => {
    const name = majorName;
    axios
      .post("http://localhost:8000/api/major/data/add", { name })
      .then((res) => {
        setOpenInsert(false);
        getMajor();
      })
      .catch((err) => {
        setMajor({ message: "Insert failed" });
      });
  };

  const Delete = (id) => {
    axios
      .post("http://localhost:8000/api/major/delete/" + id)
      .then((res) => {
        setOpenDelete(false);
        getMajor();
      })
      .catch((err) => {
        setMajor({ message: "get data failed" });
      });
  };

  const Update = (id) => {
    const name = majorName;
    axios
      .post("http://localhost:8000/api/major/update/" + id, { name })
      .then((res) => {
        setOpenUpdate(false);
        getMajor();
      })
      .catch((err) => {
        setMajor({ message: "Update failed" });
      });
  };

  const clickRow = (row) => {
    const rowId = row.id;
    console.log(rowId);
  };

  const getMajor = () => {
    axios
      .post("http://localhost:8000/api/major")
      .then((res) => {
        setMajor(res.data);
      })
      .catch((err) => {
        setMajor({ message: "get data failed" });
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/major")
      .then((res) => {
        setMajor(res.data);
      })
      .catch((err) => {
        setMajor({ message: "get data failed" });
      });
  }, []);

  const columns = [
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
            className="w-16 mr-5 bg-blue-600 p-2 rounded-md text-white hover:text-black hover:bg-blue-200 transition duration-300"
            onClick={() => setIdUpdate(row.id)}
          >
            Edit
          </button>
          <button
            className="w-16 bg-red-700 p-2 rounded-md text-white hover:text-black hover:bg-red-300 transition duration-300"
            onClick={() => setIdDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const clickhandler = (name) => console.log("delete", name);

  const table = (
    <Table
      data={major}
      click={clickhandler}
      columns={columns}
      title="Major List"
      clickRow={clickRow}
      clicked={setInsert}
    />
  );

  const childrenDelete = (
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
          onClick={() => Delete(idMajor)}
        >
          Delete
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenUpdate = (
    <div className="text-center w-64 h-auto">
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
                name="name"
                id="name"
                autoComplete="off"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Major Name"
                value={majorName}
                onChange={({ target }) => handleChangeText(target)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={() => Update(idMajor)}
        >
          Update
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenUpdate(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenInsert = (
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
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Major Name"
                value={majorName}
                onChange={({ target }) => handleChangeText(target)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={Insert}
        >
          Add
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenInsert(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-screen flex">
        <AdminSidebar />
        <Card elements={table} sizeClass="w-full h-max" />
        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          children={childrenDelete}
        />
        <Modal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          children={childrenUpdate}
        />
        <Modal
          open={openInsert}
          onClose={() => setOpenInsert(false)}
          children={childrenInsert}
        />
      </div>
    </>
  );
};

export default Major;
