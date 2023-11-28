import NavUser from "../NavUser/NavUser";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const AssignmentSub = () => {
  const [assign, setAssign] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonVisible, setButtonVisibility] = useState(true);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("user-id");
    axios
      .post("http://localhost:8000/api/submitted/assignment/" + id)
      .then((res) => {
        if (res.data != "") {
          setButtonVisibility(false);
          setButtonClicked(true);
          setComment(res.data.comment);
        } else {
          setComment("");
          setButtonVisibility(true);
          setButtonClicked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    console.log("File Name:", file.name);
    console.log("File Type:", file.type);
    console.log("File Size:", file.size);
  };

  const handleChangeText = (e) => {
    setComment(e.value);
  };

  const handleButtonClick = () => {
    const id = localStorage.getItem("assignment-id");
    const student = localStorage.getItem("user-id");
    const currentDate = moment();
    const formattedDate = currentDate.format('DD-MM-YYYY HH:mm');
    setCurrentDateTime(formattedDate);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("student", student);
    formData.append("comment", comment);
    formData.append("date", currentDateTime);
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:8000/api/submission/assignment", formData)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setButtonVisibility(false);
          setButtonClicked(true);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const id = localStorage.getItem("assignment-id");
    axios
      .post("http://localhost:8000/api/home/assignment/" + id)
      .then((res) => {
        setAssign(res.data);
        const timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 500);

        return () => clearTimeout(timeoutId);
      })
      .catch((err) => {
        setAssign({ message: "get data failed" });
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <h1 className="text-2xl font-bold ml-5 mt-3">Assignment Page</h1>
      <div className="w-[98%] h-[88%] ml-5 my-4 flex">
        <div className="w-[45rem] h-[31rem] bg-white shadow-md shadow-slate-500 rounded-lg justify-center items-center pt-5 pl-5 mr-8">
          {isVisible && (
            <div>
              <h1 className="text-2xl mb-2">{assign[0].title}</h1>
              <p className="text-sm text-blue-500 mb-4">
                {assign[0].full_name}
              </p>
              <div className="bg-slate-200 mr-5 h-96 pl-4 pt-3 flex flex-col justify-between">
                <p className="text-lg">{assign[0].description}</p>
                <a
                  href={
                    "https://localhost:8000/assignment/file/" +
                    assign[0].content
                  }
                  target="_blank"
                >
                  <div className="mb-5 h-20 mr-4 rounded-lg border-2 border-black flex hover:bg-slate-300 transition duration-300">
                    <div className="bg-fourth w-14 h-full rounded-l-md flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col mt-3 ml-5">
                      <p className="text-md">{assign[0].content}</p>
                      <p className="text-xs">See details</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="w-60 h-96 rounded-lg shadow-md shadow-slate-500">
          <h2 className="mt-3 text-lg text-center">Submission</h2>
          <p className="ml-4 mt-4">Input Task</p>
          <input
            type="file"
            className="block w-52 mx-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-70 hover:file:bg-violet-100 border border-slate-700 rounded-lg mt-4 py-1"
            name="file"
            onChange={handleFileChange}
            disabled={isButtonClicked}
          />
          <div className="relative w-full min-w-52 mx-4 mt-6">
            <label>Comment</label>
            <textarea
              className="peer h-full min-h-[100px] w-52 resize-none border-b border-blue-gray-200 bg-transparent pt-2 pl-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 bg-slate-200 mt-3"
              placeholder=" "
              name="comment"
              value={comment}
              onChange={({ target }) => handleChangeText(target)}
              disabled={isButtonClicked}
            ></textarea>
            {/* <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-52 select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Comment
            </label> */}
          </div>
          {isButtonVisible ? (
            <button
              className="bg-third w-52 h-10 mx-4 rounded-md text-white font-bold transition duration-300 hover:bg-second hover:text-black mt-10"
              onClick={handleButtonClick}
            >
              Submit
            </button>
          ) : (
            <div className="bg-second w-52 h-10 mx-4 rounded-md text-black font-bold flex justify-center items-center mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Submitted
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentSub;
