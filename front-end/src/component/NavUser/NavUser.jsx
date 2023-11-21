const NavUser = () => {
  return (
    <nav className="w-full h-16 bg-second flex justify-end items-center">
      <div className="mr-10 flex items-center hover:cursor-pointer">
        <p className="text-md font-bold underline mr-2">
          {localStorage.getItem("user-info")}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 font-bold"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </nav>
  );
};

export default NavUser;
