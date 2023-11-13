import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import Table from "../../../../component/Table/Table";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";
import axios from "axios";
import AnnouncementData from "../../../Data/DataTable/AnnouncementData";
import { useState, useEffect } from "react";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [rotate, setRotate] = useState(false);
  const [insertModal, setInsertModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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

  const CreateClick = () => {
    const item = document.getElementById("items");
    item.classList.toggle("hidden");
    item.classList.toggle("fixed");
    rotate == false ? setRotate(true) : setRotate(false);
  };

  return (
    <div className="w-screen flex">
      <TeacherSidebar
        onClick={CreateClick}
        classPlus={rotate == true ? "rotate-45" : ""}
      />
      <div
        className="hidden bg-white w-36 h-24 z-50 bottom-[5.5rem] right-14 rounded-bl-3xl rounded-tr-3xl shadow-md shadow-black overflow-hidden"
        id="items"
      >
        <div className="flex py-2 px-2 mt-1 hover:bg-slate-300 hover:cursor-pointer transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <p>Lesson</p>
        </div>
        <div className="flex py-2 px-2 mt-1 hover:bg-slate-300 hover:cursor-pointer transition duration-300" onClick={() => setInsertModal(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.116.321.17.483z" />
          </svg>
          <p>Announcement</p>
        </div>
      </div>
      <div className="w-full h-auto mt-3">
        <Table
          data={AnnouncementData}
          columns={columns}
          title="Announcement List"
          buttonClass="hidden"
        />
      </div>
        <div className="w-screen">
          <Modal open={insertModal} onClose={() => setInsertModal(false)} />
        </div>
    </div>
  );
};

export default Announcement;
