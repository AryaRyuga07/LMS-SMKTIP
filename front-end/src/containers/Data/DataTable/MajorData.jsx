import { useEffect, useState } from "react";
import axios from "axios";

const MajorData = () => {
  const [major, setMajor] = useState([])
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/major")
      .then((res) => {
        setMajor(res.data);
      })
      .catch((err) => {
        setMajor({ message: "get data failed" });
      });
  }, [])
};
  
export default MajorData;