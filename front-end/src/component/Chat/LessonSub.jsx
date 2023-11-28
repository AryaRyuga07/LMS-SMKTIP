import NavUser from "../NavUser/NavUser";
import { useState, useEffect } from "react";
import axios from "axios";

const LessonSub = () => {
  const [less, setLess] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("lesson-id");
    axios
      .post("http://localhost:8000/api/home/lesson/" + id)
      .then((res) => {
        setLess(res.data);
        const timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 500);

        return () => clearTimeout(timeoutId);
      })
      .catch((err) => {
        setLess({ message: "get data failed" });
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <h1 className="text-2xl font-bold ml-5 mt-3">Lesson Page</h1>
      <div className="w-[98%] h-[88%] ml-5 my-4 flex">
        <div className="w-[45rem] h-80 bg-white shadow-md shadow-slate-500 rounded-lg justify-center items-center pt-5 pl-5 mr-8">
          {isVisible && (
            <div>
              <h1 className="text-2xl mb-2">{less[0].title}</h1>
              <p className="text-sm text-blue-500 mb-4">{less[0].full_name}</p>
              <p className="text-lg bg-slate-200 mr-5 h-48 pl-4 pt-3">
                {less[0].description}
              </p>
            </div>
          )}
        </div>
        <div className="w-60 h-80 rounded-lg shadow-md shadow-slate-500">
          <h2 className="mt-3 text-lg text-center">Content</h2>
          {/* <embed src="../../src/assets/image/Proposal (1).pdf" type="application/pdf" width="100%" height="240px" /> */}
          {isVisible && (
            <a href={"https://localhost:8000/lessons/file/" + less[0].content} target="_blank">
              <div className="mx-4 mt-3 h-20 rounded-md border-2 border-primary flex hover:bg-slate-300 transition duration-300">
                <div className="bg-fourth w-16 h-full rounded-l-md flex justify-center items-center">
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
                  <p className="text-md truncate w-28">{less[0].content}</p>
                  <p className="text-xs">See details</p>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonSub;
