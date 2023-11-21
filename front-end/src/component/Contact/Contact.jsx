import React from "react";

const Contact = () => {

  // const subjectClick(idSubject) => {
  //   // localStorage.setItem('idSub') = idSubject;
  // }

  const Subject = [
    {
      id: 1,
      name: "Math",
      teacher: "Endang Hermawan, S.Pd",
      img: "Math",
    },
    {
      id: 2,
      name: "PPKN",
      teacher: "Zulain Rahman, S.Pd",
      img: "PKN",
    },
    {
      id: 3,
      name: "English",
      teacher: "Rika Mayanti, S.Pd",
      img: "Eng",
    },
  ];

  const SubjectList = (data) => {
    return data.map((item, index) => {
      return (
        <li className="h-20 bg-first flex items-center hover:bg-stone-300 hover:cursor-pointer transition duration-300 border-b border-stone-300" key={index} onClick={() => alert(item.id)}>
          <img
            className="bg-stone-400 w-12 h-12 rounded-full ml-4 flex"
            src=""
            alt={item.img}
          />
          <div className="flex flex-col">
            <p className="ml-4 text-xl font-bold">{item.name}</p>
            <p className="ml-4 text-sm">{item.teacher}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div
        className="w-96 h-auto bg-white flex-col border-r border-stone-400 overflow-auto"
        id="elementSubject"
      >
        <div className="w-full h-16 bg-second flex justify-center items-center">
          <p className="font-bold text-xl">Subject List</p>
        </div>
        <div className="shadow-inner shadow-stone-400" id="subjectList">
          <ul>
            {SubjectList(Subject)}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
