import NavUser from "../NavUser/NavUser";

const AttendanceSub = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <div className="w-[98%] h-[88%] ml-5 my-2 flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl mb-1">
            {localStorage.getItem("attendance-name")}
          </h1>
          <p className="text-sm text-blue-500 mb-10">
            End at: {localStorage.getItem("attendance-time")}
          </p>
          <p className="text-lg">
            {localStorage.getItem("attendance-description")}
          </p>
          <div className="w-96 h-80 flex bg-white shadow-md shadow-slate-500 rounded-lg justify-center items-center">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSub;
