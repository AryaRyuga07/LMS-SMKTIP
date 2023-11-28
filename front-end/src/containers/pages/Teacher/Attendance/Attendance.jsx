import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import Table from "../../../../component/Table/Table";
import Modal from "../../Modal/Modal";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import TimePicker from "../../../../component/TimePicker/TimePicker";
// import AttendanceData from "../../../Data/DataTable/AttendanceData";
import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [idAttendance, setIdAttendance] = useState(0);
  const [classroom, setClassroom] = useState([]);
  const [subject, setSubject] = useState([]);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(),
  });
  const [attendance, setAttendance] = useState({
    id_teacher: "",
    id_subject: "",
    title: "",
    description: "",
  });
  const [insertModal, setInsertModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [time, setTime] = useState({hour_start: "00", hour_end: "00", minute_start: "00", minute_end: "00"});
  const navigate = useNavigate();

  const attendanceRes = (id) => {
    localStorage.setItem("attendance-id", id);
    navigate('result');
  }

  const changeTime = (e) => {
    setTime({
      ...time,
      [e.name]: e.value,
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/attendance", {user})
      .then((res) => {
        setAttendanceData(res.data);
      })
      .catch((err) => {
        setAttendanceData({ message: "get data failed" });
      });
  }, []);

  const getAttendance = () => {
    const user = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/attendance", {user})
      .then((res) => {
        setAttendanceData(res.data);
      })
      .catch((err) => {
        setAttendanceData({ message: "get data failed" });
      });
  };

  const getSubject = () => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/teacher-schedule/subject/" + id)
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
  };

  const getClassroom = (idSubject) => {
    const id = localStorage.getItem("user-id");
    const id_subject = idSubject;
    axios
      .post("http://localhost:8000/api/teacher-schedule/classroom/" + id, {
        id_subject,
      })
      .then((res) => {
        setClassroom(res.data);
      })
      .catch((err) => {
        setClassroom({ message: "get data failed" });
      });
  };

  const changeDropDown = (e) => {
    setCheckedItems([]);
    setAttendance({
      ...attendance,
      [e.name]: e.value,
    });
    setTimeout(() => {
      getClassroom(e.value);
    }, 100);
  };

  const handleChangeText = (e) => {
    setAttendance({
      ...attendance,
      [e.name]: e.value,
    });
  };

  const createData = () => {
    setAttendance({
      ...attendance,
      id_teacher: "",
      id_subject: "",
      title: "",
      description: "",
    });
    setValue({
      startDate: "",
      endDate: "",
    });
    setClassroom([]);
    setCheckedItems([]);
    setTime({hour_start: "00", hour_end: "00", minute_start: "00", minute_end: "00"});
    getSubject();
    setInsertModal(true);
  };

  const updateData = (id) => {
    axios
      .post("http://localhost:8000/api/announcement/" + id)
      .then((res) => {
        setAttendance({
          ...attendance,
          id_teacher: res.data.id_teacher,
          id_subject: res.data.id_subject,
          title: res.data.title,
          description: res.data.description,
          start_at: res.data.start_at,
          end_at: res.data.end_at,
        });
        setClassroom([...classroom, res.data.id_classroom]);
        setCheckedItems([]);
        getSubject();
        setInsertModal(true);
      })
      .catch((err) => {
        setAttendanceData({ message: "get data failed" });
      });
  };

  const deleteData = (id) => {
    setDeleteModal(true);
    setIdAttendance(id);
  };

  const renderCheckbox = (data) => {
    return data.map((item, index) => {
      return (
        <li
          class="w-full border border-gray-200 rounded-lg dark:border-gray-600 mr-5"
          key={index}
        >
          <div class="flex items-center ps-3">
            <input
              id={item.classroom}
              type="checkbox"
              value={item.id_classroom}
              name={item.classroom}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              onChange={handleCheckboxChange}
            />
            <label
              for={item.classroom}
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item.classroom}
            </label>
          </div>
        </li>
      );
    });
  };

  const renderOption = (data) => {
    if (Array.isArray(data)) {
      return data.map((item, index) => {
        return (
          <option key={index} value={item.id_subject}>
            {item.subject}
          </option>
        );
      });
    } else {
      console.error("The data is not an array.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    // Menyalin state sebelumnya untuk memastikan imutabilitas
    if (checked) {
      setCheckedItems((prevState) => [...prevState, value]);
    } else {
      setCheckedItems((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const createAttendance = () => {
    const id_teacher = localStorage.getItem("user-id");
    const { id_subject, title, description } = attendance;
    const startTime = time.hour_start + ":" + time.minute_start; 
    const endTime = time.hour_end + ":" + time.minute_end; 
    const startAt = value.startDate + ", " + startTime;
    const endAt = value.endDate + ", " + endTime;
    const start_at = moment(startAt, "YYYY-MM-DD, HH:mm").format("DD-MM-YYYY HH:mm");
    const end_at = moment(endAt, "YYYY-MM-DD, HH:mm").format("DD-MM-YYYY HH:mm");
    axios
      .post("http://localhost:8000/api/attendance/data/add", {
        id_teacher,
        id_subject,
        title,
        description,
        start_at,
        end_at,
        checkedItems,
      })
      .then((res) => {
        console.log(res);
        setInsertModal(false);
        getAttendance();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAttendance = () => {
    const id_teacher = localStorage.getItem("user-id");
    const { id_subject, title, description, start_at, end_at } = attendance;
    axios
      .post("http://localhost:8000/api/attendance/data/add", {
        id_teacher,
        id_subject,
        title,
        description,
        start_at,
        end_at,
        checkedItems,
      })
      .then((res) => {
        setManageModal(false);
        getAttendance();
      })
      .catch((err) => {
        console.log("failed");
      });
  };

  const deleteAttendance = () => {
    const id = idAttendance;
    axios
      .post("http://localhost:8000/api/attendance/delete/" + id)
      .then((res) => {
        setDeleteModal(false);
        getAttendance();
      })
      .catch((err) => {
        setAttendance({ message: "get data failed" });
      });
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const AttInputChildren = (
    <div className="w-[95vw] h-[80vh]">
      <h1 className="mb-8 text-2xl font-bold">Attendance</h1>
      <div class="relative w-full min-w-[200px] mb-10">
        <input
          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="title"
          value={attendance.title}
          onChange={({ target }) => handleChangeText(target)}
        />
        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Title
        </label>
      </div>
      <div className="relative w-full min-w-[200px]">
        <textarea
          className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="description"
          value={attendance.description}
          onChange={({ target }) => handleChangeText(target)}
        ></textarea>
        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Description
        </label>
      </div>
      <div className="relative w-full min-w-[200px] mt-4">
        <h3 className="mb-4 text-md text-gray-900 dark:text-white">
          Classroom
        </h3>
        <ul className="w-full text-sm font-medium text-gray-900 flex bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {renderCheckbox(classroom)}
        </ul>
      </div>
      <div className="mt-4">
        <label
          for="subject"
          className="mb-4 text-md text-gray-900 dark:text-white"
        >
          Subject
        </label>
        <div className="relative w-full min-w-[200px] flex items-center">
          <select
            id="subject"
            name="id_subject"
            className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-8"
            onChange={({ target }) => changeDropDown(target)}
            value={attendance.id_subject}
          >
            <option>Choose a subject</option>
            {renderOption(subject)}
          </select>
          <div className="border-2 border-slate-400 rounded-lg w-72 h-12 mr-4">
            <Datepicker
              placeholder={"Select Date"}
              useRange={false}
              minDate={new Date()}
              value={value}
              onChange={handleValueChange}
            />
          </div>
          <div className="text-center">
            <label>Start At</label>
            <TimePicker onChange={({ target }) => changeTime(target)} hourName="hour_start" minuteName="minute_start" hour={time.hour_start} minute={time.minute_start} />
          </div>
          <div className="text-center">
            <label>End At</label>
            <TimePicker onChange={({ target }) => changeTime(target)} hourName="hour_end" minuteName="minute_end" hour={time.hour_end} minute={time.minute_end} />
          </div>
        </div>
      </div>
      <button
        className="absolute middle none center ml-40 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5"
        onClick={createAttendance}
      >
        Save
      </button>
      <button
        onClick={() => setInsertModal(false)}
        class="absolute middle none center rounded-lg bg-stone-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-stone-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5"
      >
        Cancel
      </button>
    </div>
  );

  const AttManageChildren = (
    <div className="w-[95vw] h-[80vh]">
      <h1 className="mb-8 text-2xl font-bold">Attendance</h1>
      <div class="relative w-full min-w-[200px] mb-10">
        <input
          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="title"
          value={attendance.title}
          onChange={({ target }) => handleChangeText(target)}
        />
        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Title
        </label>
      </div>
      <div className="relative w-full min-w-[200px]">
        <textarea
          className="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="description"
          value={attendance.description}
          onChange={({ target }) => handleChangeText(target)}
        ></textarea>
        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Description
        </label>
      </div>
      <div className="relative w-full min-w-[200px] mt-4">
        <label
          for="subject"
          className="mb-4 text-md text-gray-900 dark:text-white"
        >
          Subject
        </label>
        <select
          id="subject"
          name="id_subject"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
          onChange={({ target }) => changeDropDown(target)}
          value={attendance.id_subject}
        >
          <option>Choose a subject</option>
          {renderOption(subject)}
        </select>
      </div>
      <div className="relative w-full min-w-[200px] mt-4">
        <h3 className="mb-4 text-md text-gray-900 dark:text-white">
          Classroom
        </h3>
        <ul className="w-full text-sm font-medium text-gray-900 flex bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {renderCheckbox(classroom)}
        </ul>
      </div>
      <button
        className="absolute middle none center ml-40 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5"
        onClick={updateAttendance}
      >
        Save
      </button>
      <button
        onClick={() => setManageModal(false)}
        class="absolute middle none center rounded-lg bg-stone-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-stone-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5"
      >
        Cancel
      </button>
    </div>
  );

  const buttonAction = (id) => {
    let idk = document.getElementById(id);
    idk.classList.toggle("hidden");
    idk.classList.toggle("absolute");
  };

  const renderCard = (data) => {
    return data.map((item, index) => {
      const formatedCreateDate = new Date(item.created_at)
        .toISOString()
        .split("T")[0];
      const formatedUpdateDate = new Date(item.updated_at)
        .toISOString()
        .split("T")[0];
      return (
        <div
          className="w-[94vw] h-auto border-2 border-second rounded-lg mt-6 flex py-3 justify-between items-center hover:cursor-pointer hover:bg-slate-200 transition duration-300 opacity-100"
          key={index}
        >
          <div className="flex">
            <div className="bg-third w-14 h-14 ml-3 rounded-lg flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-lg text-slate-700 mb-1">
                New Attendance: {item.title}
              </p>
              <p className="text-xs text-slate-600">
                created at: {formatedCreateDate} (updated at:{" "}
                {formatedUpdateDate})
              </p>
            </div>
          </div>
          <div
            className={`hidden w-40 h-auto bg-white shadow-lg shadow-slate-300 rounded-b-md rounded-tl-md right-16 mt-24`}
            id={item.id}
          >
            <button
              className="w-full text-start pl-4 pt-4 pb-4 hover:bg-slate-200 hover:rounded-tl-md transition duration-100 text-lg mb-1"
              onClick={() => attendanceRes(item.id)}
            >
              Result
            </button>
            <button
              className="w-full text-start pl-4 pt-1 pb-4 hover:bg-slate-200 hover:rounded-b-md transition duration-100 text-lg"
              onClick={() => deleteData(item.id)}
            >
              Delete
            </button>
          </div>
          <button
            className="w-14 h-14 flex justify-center items-center rounded-full hover:bg-slate-300 transition duration-300"
            onClick={() => buttonAction(item.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>
        </div>
      );
    });
  };

  const AttDeleteChildren = (
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
          onClick={() => deleteAttendance()}
        >
          Delete
        </button>
        <button
          className="bg-white text-gray-500 w-full p-1 hover:bg-gray-500 hover:text-black rounded-md"
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const cardNoData = () => {
    return (
      <div className="w-[94vw] h-auto border-2 border-second rounded-lg mt-6 flex py-3 justify-between items-center hover:cursor-pointer hover:bg-slate-200 transition duration-300 opacity-100">
        <div className="flex">
          <div className="bg-stone-400 w-14 h-14 ml-3 rounded-lg flex justify-center items-center"></div>
          <div className="ml-5 flex items-center">
            <p className="text-lg text-slate-700 mb-1 font-bold">No Data</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[95vw] pb-6 pr-5 flex">
      <TeacherSidebar onClick={createData} />
      <div className="w-full h-auto mt-1 ml-16">
        <div className="w-[94vw] h-28 bg-third rounded-t-lg mt-4 pl-5 pt-5">
          <p className="font-bold text-3xl text-white">Attendance List</p>
        </div>
        {attendanceData.length > 0 ? renderCard(attendanceData) : cardNoData()}
      </div>
      <div className="w-screen">
        <Modal
          open={insertModal}
          onClose={() => setInsertModal(false)}
          children={AttInputChildren}
        />
        <Modal
          open={manageModal}
          onClose={() => setManageModal(false)}
          children={AttManageChildren}
        />
        <Modal
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          children={AttDeleteChildren}
        />
      </div>
    </div>
  );
};

export default Attendance;
