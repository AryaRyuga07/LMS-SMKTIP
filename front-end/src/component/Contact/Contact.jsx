import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";

const Contact = () => {
  const [subject, setSubject] = useState([]);
  const [assignment, setAssignment] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/home/" + id)
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        setSubject({ message: "get data failed" });
      });
  }, []);

  const getAnnouncement = (subject) => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/home/announcements/" + id, { subject })
      .then((res) => {
        setAnnouncement(res.data);
      })
      .catch((err) => {
        setAnnouncement({ message: "get data failed" });
      });
  };

  const getAttendance = (subject) => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/home/attendances/" + id, { subject })
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        setAttendance({ message: "get data failed" });
      });
  };

  const getAssignment = (subject) => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/home/assignments/" + id, { subject })
      .then((res) => {
        setAssignment(res.data);
      })
      .catch((err) => {
        setAssignment({ message: "get data failed" });
      });
  };

  const getLesson = (subject) => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/home/lessons/" + id, { subject })
      .then((res) => {
        setLesson(res.data);
      })
      .catch((err) => {
        setLesson({ message: "get data failed" });
      });
  };

  const subjectClicked = (idSub) => {
    navigate("/home");
    localStorage.setItem("id_subject", idSub);
    getAnnouncement(idSub);
    getAttendance(idSub);
    getAssignment(idSub);
    getLesson(idSub);
  };

  const SubjectList = (data) => {
    return data.map((item, index) => {
      return (
        <li
          className="h-20 bg-first flex items-center hover:bg-stone-300 hover:cursor-pointer transition duration-300 border-b border-stone-300"
          key={index}
          onClick={() => subjectClicked(item.id_subject)}
        >
          {/* <img
            className="bg-stone-400 w-12 h-12 rounded-full ml-4 flex"
            src=""
            alt={item.img}
          /> */}
          <div className="bg-stone-400 w-12 h-12 rounded-full ml-4 flex justify-center items-center">
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
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="ml-4 text-lg font-bold">{item.subject}</p>
            <p className="ml-4 text-sm">{item.teacher}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div
        className="w-96 h-auto bg-white flex-col border-r border-stone-400 overflow-auto"
        id="elementSubject"
      >
        <div className="w-full h-16 bg-second flex justify-center items-center">
          <p className="font-bold text-xl">Subject List</p>
        </div>
        <div className="shadow-inner shadow-stone-400" id="subjectList">
          <ul>{SubjectList(subject)}</ul>
        </div>
      </div>
      <Chat
        announcement={announcement}
        attendance={attendance}
        lesson={lesson}
        assignment={assignment}
      />
    </>
  );
};

export default Contact;
