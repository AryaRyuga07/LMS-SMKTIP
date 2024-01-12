import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const AssignmentResult = () => {
  const [assignSubmitted, setAssignSubmitted] = useState([]);
  const [grade, setGrade] = useState(0);
  const [isClicked, setIsClicked] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("assignment-id");
    axios
      .post("http://localhost:8000/api/result/assignment/" + id)
      .then((res) => {
        setAssignSubmitted(res.data);
      })
      .catch((err) => {
        setAssignSubmitted({ message: "get data failed" });
      });
  }, []);

  const getAssignRes = () => {
    const id = localStorage.getItem("assignment-id");
    axios
      .post("http://localhost:8000/api/result/assignment/" + id)
      .then((res) => {
        setAssignSubmitted(res.data);
      })
      .catch((err) => {
        setAssignSubmitted({ message: "get data failed" });
      });
  };

  const handleGradeText = (e) => {
    const numericInput = e.value.replace(/[^0-9]/g, '');
    setGrade(numericInput);
    if (grade > 99) {
      setGrade(99);
    } else if (grade < 1) {
      setGrade(1);
    }
  };

  const handleUpdate = (grade) => {
    setGrade(grade);
    setIsClicked(false);
  };

  const handleGrade = (studentId) => {
    const id = localStorage.getItem("assignment-id");
    const student = studentId;
    axios
      .post("http://localhost:8000/api/grade", { id, student, grade })
      .then((res) => {
        setIsClicked(true);
        getAssignRes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gradeUp = (item) => {
    if (item.grade == null) {
      setGrade(0);
      setIsClicked(true);
      return true;
    } else {
      setGrade(item.grade);
      setIsClicked(false);
      return false;
    }
  };

  const renderRow = (data) => {
    return data.map((item, index) => {
      return (
        <tr
          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          key={index}
        >
          <th
            scope="row"
            className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.assign_id}
          </th>
          <td className="px-2 py-4">{item.subject}</td>
          <td className="px-2 py-4">{item.student}</td>
          <td className="px-2 py-4">{item.classroom}</td>
          <td className="px-2 py-4">{item.comment}</td>
          <td className="px-2 py-4">
            {item.file == null ? "File Tidak ada" : item.file}
          </td>
          {isClicked ? (
            <td className="px-2 py-4">
              <input
                type="number"
                className="border-2 border-slate-400 rounded-md mr-2 pl-2 bg-slate-400 text-white"
                disabled
                value={item.grade == null ? 0 : item.grade}
              />
              <button
                className="bg-third px-2 py-[0.1rem] rounded-md text-white"
                onClick={() => handleUpdate(item.grade)}
              >
                Update
              </button>
            </td>
          ) : (
            <td className="px-2 py-4">
              <input
                type="text"
                className="border-2 border-slate-400 rounded-md mr-2 pl-2"
                value={grade}
                onChange={({ target }) => handleGradeText(target)}
              />
              <button
                className="bg-third px-2 py-[0.1rem] rounded-md text-white"
                onClick={() => handleGrade(item.student_id)}
              >
                Grade
              </button>
            </td>
          )}
        </tr>
      );
    });
  };

  return (
    <div className="flex">
      <TeacherSidebar createClass="hidden"/>
      <div className="ml-16 mt-4">
        <h1 className="text-xl font-bold mb-5">Assignment Result</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[94vw]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Assignment
                </th>
                <th scope="col" className="px-2 py-3">
                  Subject
                </th>
                <th scope="col" className="px-2 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Classroom
                </th>
                <th scope="col" className="px-2 py-3">
                  Comment
                </th>
                <th scope="col" className="px-2 py-3">
                  File
                </th>
                <th scope="col" className="px-2 py-3">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>{renderRow(assignSubmitted)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignmentResult;
