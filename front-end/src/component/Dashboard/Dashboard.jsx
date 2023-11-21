import Card from "../Card/Card";

const Dashboard = () => {
  return (
    <div className="ml-14 mt-4">
      <h3 className="text-2xl font-bold mb-5">Dashboard</h3>
      <div className="flex">
        <div className="mr-10 w-96 h-48 bg-blue-600 flex justify-center items-center"></div>
        <div className="mr-10 w-96 h-48 bg-red-600 flex justify-center items-center"></div>
        <div className="mr-10 w-96 h-48 bg-yellow-600 flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default Dashboard;
