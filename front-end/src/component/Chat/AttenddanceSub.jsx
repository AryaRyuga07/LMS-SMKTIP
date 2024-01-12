import NavUser from "../NavUser/NavUser";
import { useState, useEffect } from "react";
import axios from "axios";

const AttendanceSub = () => {
  const [att, setAtt] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonVisible, setButtonVisibility] = useState(true);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    console.log("File Name:", file.name);
    console.log("File Type:", file.type);
    console.log("File Size:", file.size);
  };

  useEffect(() => {
    const id = localStorage.getItem("user-id");
    const idAtt = localStorage.getItem("attendance-id");
    axios
      .post("http://localhost:8000/api/submitted/attendance/" + id, { idAtt })
      .then((res) => {
        if (res.data != "") {
          setSelectedValue(res.data.status);
          setButtonVisibility(false);
          setButtonClicked(true);
        } else {
          setSelectedValue("");
          setButtonVisibility(true);
          setButtonClicked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = () => {
    const id = localStorage.getItem("attendance-id");
    const student = localStorage.getItem("user-id");
    const status = selectedValue;
    const formData = new FormData();
    formData.append("id", id);
    formData.append("student", student);
    formData.append("status", status);
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:8000/api/submission/attendance", formData)
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
    const id = localStorage.getItem("attendance-id");
    axios
      .post("http://localhost:8000/api/home/attendance/" + id)
      .then((res) => {
        setAtt(res.data);
        const timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 500);

        return () => clearTimeout(timeoutId);
      })
      .catch((err) => {
        setAtt({ message: "get data failed" });
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <h1 className="text-2xl font-bold ml-5 mt-3">Attendance Page</h1>
      <div className="w-[98%] h-[88%] ml-5 my-4 flex">
        <div className="w-[45rem] h-80 bg-white shadow-md shadow-slate-500 rounded-lg justify-center items-center pt-5 pl-5 mr-8">
          {isVisible && (
            <div>
              <h1 className="text-2xl mb-2">{att[0].title}</h1>
              <p className="text-sm text-blue-500 mb-4">{att[0].full_name}</p>
              <p className="text-lg bg-slate-200 mr-5 h-48 pl-4 pt-3">
                {att[0].description}
              </p>
            </div>
          )}
        </div>
        <div className="w-60 h-80 rounded-lg shadow-md shadow-slate-500">
          <h2 className="mt-3 text-lg text-center">Status</h2>
          <div className="flex flex-col ml-1">
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="present"
              >
                <input
                  id="present"
                  name="status"
                  type="radio"
                  value="present"
                  checked={selectedValue === "present"}
                  onChange={handleRadioChange}
                  disabled={isButtonClicked}
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <p>Present</p>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="sick"
              >
                <input
                  id="sick"
                  name="status"
                  type="radio"
                  value="sick"
                  checked={selectedValue === "sick"}
                  onChange={handleRadioChange}
                  disabled={isButtonClicked}
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <p>Sick</p>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="excused"
              >
                <input
                  id="excused"
                  name="status"
                  type="radio"
                  value="excused"
                  checked={selectedValue === "excused"}
                  onChange={handleRadioChange}
                  disabled={isButtonClicked}
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <p>Excused</p>
            </div>
          </div>
          {selectedValue === "sick" || selectedValue === "excused" ? (
            <div>
              <p className="ml-4 mt-1">Input Letter</p>
              <input
                type="file"
                className="block w-52 mx-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-70 hover:file:bg-violet-100 border border-slate-700 rounded-lg mt-2 py-1"
                name="file"
                onChange={handleFileChange}
                disabled={isButtonClicked}
              />
            </div>
          ) : (
            ""
          )}
          {isButtonVisible ? (
            <button
              className="bg-third w-52 h-10 mx-4 rounded-md text-white font-bold transition duration-300 hover:bg-second hover:text-black mt-3"
              onClick={handleButtonClick}
            >
              Submit
            </button>
          ) : (
            <div className="bg-second w-52 h-10 mx-4 rounded-md text-black font-bold flex justify-center items-center mt-3">
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

export default AttendanceSub;
