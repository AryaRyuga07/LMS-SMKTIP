import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Grade = () => {
  const [grade, setGrade] = useState([]);
  //   const [classroom, setClassroom] = useState([]);
  //   const [attClass, setAttClass] = useState({});

  //   const getAttendance = (idClass) => {
  //     const id = localStorage.getItem("attendance-id");
  //     axios
  //       .post("http://localhost:8000/api/result/attendance/" + id, { idClass })
  //       .then((res) => {
  //         setAttSubmitted(res.data);
  //         getClassroom();
  //       })
  //       .catch((err) => {
  //         setAttSubmitted({ message: "get data failed" });
  //       });
  //   };

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/grade/student")
      .then((res) => {
        setGrade(res.data);
      })
      .catch((err) => {
        setGrade({ message: "get data failed" });
      });
  }, []);

  //   const optionOnChange = (e) => {
  //     setAttClass({
  //       ...attClass,
  //       [e.name]: e.value,
  //     });
  //     setTimeout(() => {
  //       getAttendance(e.value);
  //     }, 100);
  //   };

  //   const renderOption = (data) => {
  //     return data.map((item, index) => {
  //       return (
  //         <option key={index} value={item.id}>
  //           {item.name}
  //         </option>
  //       );
  //     });
  //   };

  const exportToExcel = () => {
    const dataArray = grade.map(item => Object.values(item)); // Konversi objek menjadi array
    const header = Object.keys(grade[0]); // Ambil nama kolom sebagai header

    const ws = XLSX.utils.aoa_to_sheet([header, ...dataArray]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  const renderRow = (data) => {
    return data.map((item, index) => {
      return (
        <tr
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          key={index}
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.Subject}
          </th>
          <td class="px-6 py-4">{item.Assignment}</td>
          <td class="px-6 py-4">{item.NISN}</td>
          <td class="px-6 py-4">{item.Name}</td>
          <td class="px-6 py-4">{item.Classroom}</td>
          <td class="px-6 py-4">{item.Grade}</td>
        </tr>
      );
    });
  };

  return (
    <div className="flex">
      <TeacherSidebar createClass="hidden" />
      <div className="ml-16 mt-4">
        {/* <h1 className="text-xl font-bold mb-5">Attendance Result</h1>
        <label
          for="classroom"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <div className="h-10 flex items-center mb-5">
          <select
            id="classroom"
            name="classroom"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={({target}) => optionOnChange(target)}
          >
            <option selected>Choose a classroom</option>
            {renderOption(classroom)}
          </select>
          <button className="bg-blue-600 rounded-md w-32 h-10 ml-4 font-bold text-md text-white hover:bg-blue-200 hover:text-black transition duration-300">
            Download CSV
          </button>
        </div> */}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[94vw]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Subject
                </th>
                <th scope="col" class="px-6 py-3">
                  Assignment
                </th>
                <th scope="col" class="px-6 py-3">
                  NISN
                </th>
                <th scope="col" class="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Classroom
                </th>
                <th scope="col" class="px-6 py-3">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>{renderRow(grade)}</tbody>
          </table>
        </div>
        <button
          className="bg-blue-500 p-2 rounded-md mt-5"
          onClick={exportToExcel}
        >
          Export Now
        </button>
      </div>
    </div>
  );
};

export default Grade;
