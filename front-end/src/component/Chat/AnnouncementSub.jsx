import NavUser from "../NavUser/NavUser";
import { useState, useEffect } from "react";
import axios from "axios";

const AnnouncementSub = () => {
  const [ann, setAnn] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("announcement-id");
    axios
      .post("http://localhost:8000/api/home/announcement/" + id)
      .then((res) => {
        setAnn(res.data);
        const timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 500);
        
        return () => clearTimeout(timeoutId);
      })
      .catch((err) => {
        setAnn({ message: "get data failed" });
      });
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <h1 className="text-2xl font-bold ml-5 mt-3">Announcement Page</h1>
      <div className="w-[98%] h-[88%] ml-5 my-4 flex justify-between">
        <div className="w-[45rem] h-80 bg-white shadow-md shadow-slate-500 rounded-lg justify-center items-center pt-5 pl-5">
          {isVisible && (
            <div>
              <h1 className="text-2xl mb-2">{ann[0].title}</h1>
              <p className="text-sm text-blue-500 mb-4">{ann[0].full_name}</p>
              <p className="text-lg bg-slate-200 mr-5 h-48 pl-4 pt-3">
                {ann[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSub;
