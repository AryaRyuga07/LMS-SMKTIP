import Card from "../Card/Card";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";

const Dashboard = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Number of Logins",
        data: [10, 15, 8, 12],
        yAxisID: "y-axis-1",
        borderColor: "rgba(0,0,0,0.7)",
        backgroundColor: "rgba(255,0,0,0.8)",
      },
    ],
  };
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  return (
    <div className="ml-16 mt-4">
      <h3 className="text-2xl font-bold mb-5">Dashboard</h3>
      <div className="flex">
        <div className="py-8 px-16 rounded-lg shadow-md shadow-slate-400">
          <Doughnut data={data} />
        </div>
        <div className="ml-5 py-8 px-16 rounded-lg shadow-md shadow-slate-400">
          <Pie data={data} />
        </div>
      </div>
      <div className="mt-5 py-8 px-16 rounded-lg shadow-md shadow-slate-400">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
