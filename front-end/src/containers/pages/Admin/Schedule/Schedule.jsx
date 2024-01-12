import { useState, useEffect } from "react";
import Table from "../../../../component/Table/Table";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";
import axios from "axios";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [scheduleData, setScheduleData] = useState({teacher_id: "", subject_id: "", classroom_id: "",});
  const [teacher, setTeacher] = useState([]);
  const [subject, setSubject] = useState([]);
  const [classroom, setClassroom] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openInsert, setOpenInsert] = useState(false);
  const [idSchedule, setIdSchedule] = useState(0);

  const handleChangeText = (e) => {
    setScheduleData(e.value);
  };

  const setInsert = () => {
    setOpenInsert(true);
    setScheduleData("");
    getTeacher();
    getSubject();
    getClassroom();
  };

  const setIdUpdate = (id) => {
    setOpenUpdate(true);
    setIdSchedule(id);
    axios
      .post("http://localhost:8000/api/schedule/" + id)
      .then((res) => {
        setScheduleData({
          ...scheduleData,
          teacher_id: res.data.teacher_id,
          subject_id: res.data.subject_id,
          classroom_id: res.data.classroom_id,
        });
      })
      .catch((err) => {
        setSchedule({ message: "get data failed" });
      });
    // navigate("/admin/schedule/update");
  };

  const setIdDelete = (id) => {
    console.log(id);
    setOpenDelete(true);
    setIdSchedule(id);
  };

  const Insert = () => {
    const {teacher_id, subject_id, classroom_id} = scheduleData;
    axios
      .post("http://localhost:8000/api/schedule/data/add", { teacher_id, subject_id, classroom_id })
      .then((res) => {
        alert("Insert Success");
        setOpenInsert(false);
        window.location.reload(true);
      })
      .catch((err) => {
        setSchedule({ message: "Insert failed" });
      });
  };

  const Delete = (id) => {
    axios
      .post("http://localhost:8000/api/schedule/delete/" + id)
      .then((res) => {
        alert("Delete Success");
        setOpenDelete(false);
        window.location.reload(true);
      })
      .catch((err) => {
        setSchedule({ message: "get data failed" });
      });
  };

  const Update = (id) => {
    const {teacher_id, subject_id, classroom_id} = scheduleData;
    axios
      .post("http://localhost:8000/api/schedule/update/" + id, { teacher_id, subject_id, classroom_id })
      .then((res) => {
        alert("Update Success");
        setOpenUpdate(false);
        window.location.reload(true);
      })
      .catch((err) => {
        setSchedule({ message: "Update failed" });
      });
  };

  const clickRow = (row) => {
    const rowId = row.id;
    console.log(rowId);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/schedule")
      .then((res) => {
        // console.log(res.data);
        setSchedule(res.data);
      })
      .catch((err) => {
        setSchedule({ message: "get data failed" });
      });
  }, []);

  const columns = [
    {
      name: "Teacher",
      selector: "teacher",
      sortable: true,
    },
    {
      name: "Subject",
      selector: "subject",
      sortable: true,
    },
    {
      name: "Classroom",
      selector: "classroom",
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
      data={schedule}
      click={clickhandler}
      columns={columns}
      title="Schedule List"
      clickRow={clickRow}
      clicked={setInsert}
    />
  );

  const getTeacher = () => {
    axios
      .post("http://localhost:8000/api/teacher")
      .then((res) => {
        setTeacher(res.data);
      })
      .catch((err) => {
        setTeacher({ message: "get data failed" });
      });
  };

  const getSubject = () => {
    axios
      .post("http://localhost:8000/api/subject")
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
  };

  const getClassroom = () => {
    axios
      .post("http://localhost:8000/api/classroom")
      .then((res) => {
        setClassroom(res.data);
      })
      .catch((err) => {
        setClassroom({ message: "get data failed" });
      });
  };

  const renderOptionTeacher = (data) => {
    return data.map((item, index) => {
      return (
        <option
          key={index}
          value={item.user_id}
        >
          {item.full_name}
        </option>
      );
    });
  };
  
  const renderOption = (data) => {
    return data.map((item, index) => {
      return (
        <option
          key={index}
          value={item.id}
        >
          {item.name}
        </option>
      );
    });
  };

  const changeDropDown = (e) => {
    setScheduleData({
      ...scheduleData,
      [e.name]: e.value,
    });
  };

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
          onClick={() => Delete(idSchedule)}
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
                placeholder="schedule Name"
                // value={scheduleName}
                onChange={({ target }) => handleChangeText(target)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="text-white bg-blue-700 shadow-blue-400/40 w-full p-1 hover:bg-blue-500 rounded-md"
          onClick={() => Update(idSchedule)}
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
        <div className="sm:col-span-3 mt-6 mb-8">
          <label
            htmlFor="teacher"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Teacher
          </label>
          <div className="mt-2">
            <select
              id="teacher_id"
              name="teacher_id"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onChange={({ target }) => changeDropDown(target)}
            >
              <option>-- Choose Teacher --</option>
              {renderOptionTeacher(teacher)}
            </select>
          </div>
        </div>
        <div className="sm:col-span-3 mt-6 mb-8">
          <label
            htmlFor="subject"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Subject
          </label>
          <div className="mt-2">
            <select
              id="subject_id"
              name="subject_id"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onChange={({ target }) => changeDropDown(target)}
            >
              <option>-- Choose Subject --</option>
              {renderOption(subject)}
            </select>
          </div>
        </div>
        <div className="sm:col-span-3 mt-6 mb-8">
          <label
            htmlFor="classroom"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Classroom
          </label>
          <div className="mt-2">
            <select
              id="classroom_id"
              name="classroom_id"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              onChange={({ target }) => changeDropDown(target)}
            >
              <option>-- Choose Classroom --</option>
              {renderOption(classroom)}
            </select>
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

export default Schedule;
