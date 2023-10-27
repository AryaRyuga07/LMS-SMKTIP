const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-red-700 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-white text-bold mb-5">
        404 Pages Not Found
      </h1>
      <a
        href="/auth/login"
        className="text-md text-blue-500 underline hover:text-white"
      >
        Click here to back
      </a>
    </div>
  );
};

export default NotFound