import Table from "../../../../component/Table/Table";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import axios from "axios";
import { useState, useEffect } from "react";

const HistoryLog = () => {
    const [historyLog, setHistoryLog] = useState([]);

    useEffect(() => {
      axios
        .post("http://localhost:8000/api/history/log")
        .then((res) => {
          setHistoryLog(res.data);
        })
        .catch((err) => {
          setHistoryLog({ message: "get data failed" });
        });
    }, []);
  
    const columns = [
      {
        name: "Username",
        selector: "username",
        sortable: true,
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
      },
      {
        name: "Time",
        selector: "log_time",
        sortable: true,
      },
    ];
  
    const clickhandler = (name) => console.log("delete", name);
  
    const table = (
      <Table
        data={historyLog}
        click={clickhandler}
        columns={columns}
        title="History Log"
        buttonClass="hidden"
      />
    );
  
    return (
      <>
        <div className="w-screen flex">
          <AdminSidebar />
          <Card elements={table} sizeClass="w-full h-max" />
        </div>
      </>
    );
};

export default HistoryLog;
