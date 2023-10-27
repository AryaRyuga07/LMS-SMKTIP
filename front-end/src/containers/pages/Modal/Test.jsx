import { useState } from "react";
import Modal from "./Modal";

const Test = () => {
  const [open, setOpen] = useState(false);
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <button
        className="text-white bg-red-600 shadow-red-400/40"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        children={
          <div className="text-center w-56">
            <div className="w-20 h-20 mx-auto flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500">Are you sure want delete?</p>
            </div>
            <div className="flex gap-4">
              <button className="text-white bg-red-600 shadow-red-400/40 w-full">
                Delete
              </button>
              <button
                className="bg-white text-gray-500 w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default Test;
