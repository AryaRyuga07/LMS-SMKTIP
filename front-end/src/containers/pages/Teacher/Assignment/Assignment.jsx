import TeacherSidebar from "../../../../component/Sidenav/TeacherSidebar";
import Table from "../../../../component/Table/Table";
import Modal from "../../Modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";

const Assignment = () => {
  const [Assignment, setAssignment] = useState([]);
  const [rotate, setRotate] = useState(false);
  const [insertModal, setInsertModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);

  const AssignmentData = [
    {
      id: 1,
      title: "Ulangan Harian",
      description: "Ulangan dimulai pada jam 10.00 wib",
      showButtons: true
    },
    {
      id: 2,
      title: "Remedial Siswa",
      description: "Remedial Siswa, absen 1 - 20 siap - siap belajar",
      showButtons: true
    },
    {
      id: 3,
      title: "Tidak Masuk",
      description: "Hari ini saya tidak masuk karena ada kegiatan di luar kota, kerjakan soal pada tugas yang saya beri",
      showButtons: true
    },
  ];

  const columns = [
    {
      selector: (row) => row.title,
      sortable: true,
    },
    {
      selector: (row) => row.description,
      sortable: true,
    },
  ];

  const AnnInputChildren = (
    <div className="w-[95vw] h-[60vh]">
      <h1 className="mb-8 text-2xl font-bold">Assignment</h1>
      <div class="relative w-full min-w-[200px] mb-10">
        <input
          class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="title"
        />
        <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Title
        </label>
      </div>
      <div class="relative w-full min-w-[200px]">
        <textarea
          class="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="desc"
        ></textarea>
        <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Description
        </label>
      </div>
      <button class="absolute middle none center ml-40 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5">
        Save
      </button>
      <button
        onClick={() => setInsertModal(false)}
        class="absolute middle none center rounded-lg bg-stone-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-stone-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5"
      >
        Cancel
      </button>
    </div>
  );

  const AnnManageChildren = (
    <div className="w-[95vw] h-[60vh]">
      <h1 className="mb-8 text-2xl font-bold">Assignment</h1>
      <div class="relative w-full min-w-[200px] mb-10">
        <input
          class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
        />
        <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Title
        </label>
      </div>
      <div class="relative w-full min-w-[200px]">
        <textarea
          class="peer h-full min-h-[100px] w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          name="desc"
        ></textarea>
        <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Description
        </label>
      </div>
      <button class="absolute middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-28 bottom-5">
        Save
      </button>
    </div>
  );

  return (
    <div className="w-screen flex">
      <TeacherSidebar
        onClick={() => setInsertModal(true)}
        classPlus={rotate == true ? "rotate-45" : ""}
      />
      <div className="w-full h-auto mt-3">
        <Table data={AssignmentData} columns={columns} buttonClass="hidden" />
      </div>
      <div className="w-screen">
        <Modal
          open={insertModal}
          onClose={() => setInsertModal(false)}
          children={AnnInputChildren}
        />
        <Modal
          open={manageModal}
          onClose={() => setManageModal(false)}
          children={AnnManageChildren}
        />
      </div>
    </div>
  );
};

export default Assignment;
