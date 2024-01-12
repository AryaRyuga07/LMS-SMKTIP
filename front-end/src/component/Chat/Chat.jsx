import NavUser from "../NavUser/NavUser";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chat = (props) => {
  const navigate = useNavigate();

  const AssignmentPage = (data) => {
    localStorage.setItem("assignment-id", data.assign_id);
    navigate("/assignment");
  };

  const AttendancePage = (data) => {
    localStorage.setItem("attendance-id", data.att_id);
    navigate("/attendance");
  };

  const AnnouncementPage = (data) => {
    localStorage.setItem("announcement-id", data.ann_id);
    navigate("/announcement");
  };
  
  const LessonPage = (data) => {
    localStorage.setItem("lesson-id", data.less_id);
    navigate("/lesson");
  };

  const AttendanceCard = (data) => {
    return data.map((item, index) => {
      return (
        <div className="flex" key={index}>
          <div className="bg-second w-60 h-auto mr-5 pt-5 rounded-xl flex flex-col justify-between items-center shadow-md shadow-black">
            <p className="text-md font-bold mx-auto">{item.att_title}</p>
            <p className="mx-6 line-clamp-3">{item.att_desc}</p>
            <p className="mx-3">Ends At: {item.att_end}</p>
            <button
              className="bg-third w-full h-10 rounded-b-xl text-lg font-bold hover:bg-first transition duration-300"
              onClick={() => AttendancePage(item)}
            >
              Open
            </button>
          </div>
        </div>
      );
    });
  };

  const AssignmentCard = (data) => {
    return data.map((item, index) => {
      return (
        <div className="flex" key={index}>
          <div className="bg-second w-60 h-auto mr-5 pt-5 rounded-xl flex flex-col justify-between items-center shadow-md shadow-black">
            <p className="text-md font-bold mx-auto">{item.assign_title}</p>
            <p className="mx-6 line-clamp-3">{item.assign_description}</p>
            <p className="mx-3">Ends At: {item.assign_end}</p>
            <button
              className="bg-third w-full h-10 rounded-b-xl text-lg font-bold hover:bg-first transition duration-300"
              onClick={() => AssignmentPage(item)}
            >
              Open
            </button>
          </div>
        </div>
      );
    });
  };

  const AnnouncementCard = (data) => {
    return data.map((item, index) => {
      return (
        <div className="flex" key={index}>
          <div className="bg-second w-60 h-auto mr-5 pt-5 rounded-xl flex flex-col justify-between items-center shadow-md shadow-black">
            <p className="text-md font-bold mx-auto">{item.ann_title}</p>
            <p className="mx-6 line-clamp-3">{item.ann_desc}</p>
            <button
              className="bg-third w-full h-10 rounded-b-xl text-lg font-bold hover:bg-first transition duration-300"
              onClick={() => AnnouncementPage(item)}
            >
              Open
            </button>
          </div>
        </div>
      );
    });
  };

  const LessonCard = (data) => {
    return data.map((item, index) => {
      return (
        <div className="flex" key={index}>
          <div className="bg-second w-60 h-auto mr-5 pt-5 rounded-xl flex flex-col justify-between items-center shadow-md shadow-black">
            <p className="text-md font-bold mx-auto">{item.less_title}</p>
            <p className="mx-6 line-clamp-3">{item.less_desc}</p>
            <button
              className="bg-third w-full h-10 rounded-b-xl text-lg font-bold hover:bg-first transition duration-300"
              onClick={() => LessonPage(item)}
            >
              Open
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <div className="w-[98%] h-[88%] ml-5 my-2 pb-8 flex flex-col overflow-auto">
        <h1 className="text-2xl mb-4">Announcement</h1>
        <div className="flex">{AnnouncementCard(props.announcement)}</div>
        <h1 className="text-2xl mb-4 mt-10">Lesson</h1>
        <div className="flex">{LessonCard(props.lesson)}</div>
        <h1 className="text-2xl mb-4 mt-10">Assignment</h1>
        <div className="flex">{AssignmentCard(props.assignment)}</div>
        <h1 className="text-2xl mb-4 mt-10">Attendance</h1>
        <div className="flex">{AttendanceCard(props.attendance)}</div>
      </div>
      
    </div>
  );
}

export default Chat;
