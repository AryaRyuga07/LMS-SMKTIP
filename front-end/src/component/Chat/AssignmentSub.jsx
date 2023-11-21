import NavUser from "../NavUser/NavUser";

const AssignmentSub = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <NavUser />
      <div className="w-[98%] h-[88%] ml-5 my-2 flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl mb-1">
            {localStorage.getItem("assignment-name")}
          </h1>
          <p className="text-sm text-blue-500 mb-10">
            End at: {localStorage.getItem("assignment-time")}
          </p>
          <p className="text-lg">
            {localStorage.getItem("assignment-description")}
          </p>
          <div className="w-96 h-80 flex bg-white shadow-md shadow-slate-500 rounded-lg justify-center items-center">
            Ini file
          </div>
        </div>
        <div className="w-96 h-[85vh] mr-5 mt-2 flex bg-white shadow-md shadow-slate-500 rounded-lg">
          <div class="block">
            <p className="text-lg font-bold mx-3 mt-5">File</p>
            <input type="file" class="block w-[22rem] mx-3 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-70 hover:file:bg-violet-100 border border-slate-700 rounded-lg mt-4" />
            <div className="w-[22rem] h-[10rem] bg-white shadow-md shadow-slate-400 mx-3 mt-4 rounded-md flex justify-center items-center">ImageDummy</div>
            <p className="text-lg font-bold mx-3 mt-5">Message</p>
            <textarea className="block w-[22rem] h-[8rem] mx-3 text-sm text-slate-500 border border-slate-700 rounded-lg mt-4 resize-none"></textarea>
            <button className="w-[22rem] py-2 mx-3 mt-8 bg-third text-white font-bold text-lg rounded-lg hover:bg-second hover:text-black transition duration-300">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSub;
