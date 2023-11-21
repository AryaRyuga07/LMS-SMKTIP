import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Table from "../../../../component/Table/Table";
// import ClassData from "../../../Data/DataTable/ClassData";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import TableCard from "./TableCard";

const Subject = () => {
  // Subject
  const [subject, setSubject] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [openDeleteSubject, setOpenDeleteSubject] = useState(false);
  const [openUpdateSubject, setOpenUpdateSubject] = useState(false);
  const [openInsertSubject, setOpenInsertSubject] = useState(false);
  const [idSubject, setIdSubject] = useState(0);

  // Need this?
  const navigate = useNavigate();
  const clickhandler = (name) => console.log("delete", name);

  const clickRow = (row) => {
    const rowId = row.id;
    console.log(rowId);
  };

  // Subject
  const columnsSubject = [
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
            onClick={() => setIdUpdateSubject(row.id)}
          >
            Edit
          </button>
          <button
            className="w-16 bg-red-700 p-2 rounded-md text-white hover:text-black hover:bg-red-300 transition duration-300"
            onClick={() => setIdDeleteSubject(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const setInsertSubject = () => {
    setOpenInsertSubject(true);
    setSubjectName("");
    // navigate("/admin/Subject/insert");
  };

  const setIdUpdateSubject = (id) => {
    setOpenUpdateSubject(true);
    setIdSubject(id);
    axios
      .post("http://localhost:8000/api/subject/" + id)
      .then((res) => {
        setSubjectName(res.data.name);
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
    // navigate("/admin/Subject/update");
  };

  const setIdDeleteSubject = (id) => {
    setOpenDeleteSubject(true);
    setIdSubject(id);
  };

  const tableSubject = (
    <Table
      data={subject}
      click={clickhandler}
      columns={columnsSubject}
      title="Subject List"
      clickRow={clickRow}
      clicked={setInsertSubject}
    />
  );

  const handleChangeTextSubject = (e) => {
    setSubjectName(e.value);
  };

  const InsertSubject = () => {
    const name = subjectName;
    axios
      .post("http://localhost:8000/api/subject/data/add", { name })
      .then((res) => {
        setOpenInsertSubject(false);
        getSubject();
      })
      .catch((err) => {
        setSubject({ message: "Insert failed" });
      });
  };

  const DeleteSubject = (id) => {
    axios
      .post("http://localhost:8000/api/subject/delete/" + id)
      .then((res) => {
        setOpenDeleteSubject(false);
        getSubject();
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
  };

  const UpdateSubject = (id) => {
    const name = subjectName;
    axios
      .post("http://localhost:8000/api/subject/update/" + id, { name })
      .then((res) => {
        setOpenUpdateSubject(false);
        getSubject();
      })
      .catch((err) => {
        setSubject({ message: "Update failed" });
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/subject")
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
  }, []);

  const getSubject = () => {
    axios
      .post("http://localhost:8000/api/subject")
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
  }

  const childrenInsertSubject = (
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
                placeholder="Subject Name"
                value={subjectName}
                onChange={({ target }) => handleChangeTextSubject(target)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={InsertSubject}
        >
          Add
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenInsertSubject(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenUpdateSubject = (
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
                placeholder="Subject Name"
                value={subjectName}
                onChange={({ target }) => handleChangeTextSubject(target)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={() => UpdateSubject(idSubject)}
        >
          Update
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenUpdateSubject(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const childrenDeleteSubject = (
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
          onClick={() => DeleteSubject(idSubject)}
        >
          Delete
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setOpenDeleteSubject(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-screen h-screen flex overflow-y-hidden">
        <AdminSidebar />
        <div className="flex flex-col" id="cardList">
          <div className="w-screen flex flex-col" id="firstCard">
            <TableCard
              elements={tableSubject}
              openDelete={openDeleteSubject}
              onCloseDelete={() => setOpenDeleteSubject(false)}
              childrenDelete={childrenDeleteSubject}
              openUpdate={openUpdateSubject}
              onCloseUpdate={() => setOpenUpdateSubject(false)}
              childrenUpdate={childrenUpdateSubject}
              openInsert={openInsertSubject}
              onCloseInsert={() => setOpenInsertSubject(false)}
              childrenInsert={childrenInsertSubject}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
