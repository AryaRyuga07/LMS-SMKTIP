import React from "react";
import { useState } from "react";

const Tester = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <div className="relative w-64 h-32 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="w-full bg-blue-500 flex items-center justify-center">
            Slide 1
          </div>
          {/* Konten Slide 2 */}
          <div className="w-full bg-green-500 flex items-center justify-center">
            Slide 2
          </div>
          {/* Konten Slide 3 */}
          <div className="w-full bg-red-500 flex items-center justify-center">
            Slide 3
          </div>
        </div>
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Tester;
