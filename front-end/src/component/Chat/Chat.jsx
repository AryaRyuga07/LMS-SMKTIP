import NavUser from "../NavUser/NavUser";
import {useState} from "react";
import { useNavigate } from "react-router-dom";


function Chat() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const Assignment = [
    
    {
      id: 1,
      subject_id: 1,
      Title: "Tugas Matematika bulan ini",
      Description: "Anak - anak kerjakan ya, materi statistika nya",
      end: "15/11/2023, 10:00",
    },
    {
      id: 2,
      subject_id: 2,
      Title: "Tugas PKN Hari ini",
      Description: "Anak - anak tugas hari ini cari saja materi tentang Keamanan dan Pertahanan lalu dibuat PPT dikumpulkan besok, Terima kasih",
      end: "16/11/2023, 10:00",
    },
    {
      id: 3,
      subject_id: 3,
      Title: "Tugas Bahasa Inggris",
      Description: "Saya hari ini tidak masuk, rangkum saja materi tentang CV",
      end: "17/11/2023, 10:00",
    },
  ];
  
  const Attendance = [
    {
      id: 1,
      Title: "Math Absen Hari ini",
      Description: "Anak - anak absen dulu ya",
      end: "15/11/2023, 10:00",
    },
    {
      id: 2,
      Title: "PKN Absen Hari ini",
      Description: "Anak - anak absen dulu ya",
      end: "16/11/2023, 12:00",
    },
  ];

  const AssignmentPage = (data) => {
    localStorage.setItem("subject-id", data.id);
    localStorage.setItem("assignment-name", data.Title);
    localStorage.setItem("assignment-time", data.end);
    localStorage.setItem("assignment-description", data.Description);
    navigate("/assignment");
  }
  
  const AttendancePage = (data) => {
    localStorage.setItem("subject-id", data.id);
    localStorage.setItem("attendance-name", data.Title);
    localStorage.setItem("attendance-time", data.end);
    localStorage.setItem("attendance-description", data.Description);
    navigate("/attendance");
  }

  const AttendanceCard = (data) => {
    return data.map((item, index) => {
      return (
        <div className="flex" key={index}>
          <div className="bg-second w-60 h-auto mr-5 pt-5 rounded-xl flex flex-col justify-between items-center shadow-md shadow-black">
            <p className="text-md font-bold mx-auto">{item.Title}</p>
            <p className="mx-6 line-clamp-3">{item.Description}</p>
            <p className="mx-3">Ends At: {item.end}</p>
            <button className="bg-third w-full h-10 rounded-b-xl text-lg font-bold hover:bg-first transition duration-300" onClick={() => AttendancePage(item)}>
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
            <p className="text-md font-bold mx-auto">{item.Title}</p>
            <p className="mx-6 line-clamp-3">{item.Description}</p>
            <p className="mx-3">Ends At: {item.end}</p>
            <button className="bg-third w-full h-10 rounded-b-xl text-lg font-bold hover:bg-first transition duration-300" onClick={() => AssignmentPage(item)}>
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
      <div className="w-[98%] h-[88%] ml-5 my-2 flex flex-col">
        <h1 className="text-2xl mb-4">Assignment</h1>
        <div className="flex">
          {AssignmentCard(Assignment)}
        </div>
        <h1 className="text-2xl mb-4 mt-10">Attendance</h1>
        <div className="flex">
          {AttendanceCard(Attendance)}
        </div>
      </div>
    </div>
  );
}

export default Chat;
