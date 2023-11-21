import Table from "../../../../component/Table/Table";
import AdminSidebar from "../../../../component/Sidenav/AdminSidebar";
import Card from "../../../../component/Card/Card";
import axios from "axios";
import { useState, useEffect } from "react";

const HistoryData = () => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
      axios
        .post("http://localhost:8000/api/history/data")
        .then((res) => {
          setHistoryData(res.data);
        })
        .catch((err) => {
          setHistoryData({ message: "get data failed" });
        });
    }, []);
  
    const columns = [
      {
        name: "Status",
        selector: "status",
        sortable: true,
      },
      {
        name: "Table",
        selector: "table",
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
        data={historyData}
        click={clickhandler}
        columns={columns}
        title="History Data"
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

export default HistoryData;
