import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import { useNavigate } from "react-router-dom";

const History = () => {
    const navigate = useNavigate();

    const UserLog = (
        <button className="w-full h-56 font-bold text-xl hover:bg-white transition duration-300" onClick={() => navigate('log')}>
            User Log
        </button>
    )
    
    const HistoryData = (
        <button className="w-full h-56 font-bold text-xl hover:bg-white transition duration-300" onClick={() => navigate('data')}>
            History Data
        </button>
    )
    return (
      <>
        <div className="w-screen flex">
          <AdminSidebar />
          <Card elements={UserLog} sizeClass="w-full h-max" />
          <Card elements={HistoryData} sizeClass="w-full h-max" />
        </div>
      </>
    );
};

export default History;
