import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import Table from "../../../../component/Table/Table";
import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";

const Lesson = () => {
  const [lesson, setLesson] = useState([]);

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Description",
      selector: "Desc",
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

  const table = (
    <Table
      data={lesson}
      // click={clickhandler}
      columns={columns}
      title="Lesson List"
      // clickRow={clickRow}
      // clicked={setInsert}
    />
  );

  return (
    <div className="w-screen flex">
      <TeacherSidebar />
      <Card elements={table} sizeClass="w-full h-max" />
    </div>
  );
};

export default Lesson;
