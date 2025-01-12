import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getWeeklyReservations } from "../../../services/AdminService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const data = await getWeeklyReservations();
        console.log("Data from API:", data);
  
        if (!data || data.length === 0) {
          console.log("No data returned from API");
          setChartData(null);
          setLoading(false);
          return;
        }
  
        // Process data if it exists
        const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]; // Shortened day names
        const dataset = new Array(7).fill(0);
  
        data.forEach((item) => {
          const reservationDate = new Date(item.date);
          const dayIndex = reservationDate.getDay(); // 0 (Sunday) to 6 (Saturday)
          if (dayIndex === 0) {
            dataset[6] += item.count; // Map Sunday to last index
          } else {
            dataset[dayIndex - 1] += item.count;
          }
        });
  
        console.log("Processed dataset:", dataset);
  
        setChartData({
          labels: daysOfWeek, // Use shortened day names
          datasets: [
            {
              label: "Reservations per Day",
              data: dataset,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
            },
          ],
        });
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(null);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom size for the chart
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20, // Add more margin around the chart
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Reservations",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Reservations",
      },
    },
  };


  
  return (
    <div style={{ height: "350px", width: "550px", margin: "20px" }}> {/* Moderately increased size */}
      {loading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <Line options={options} data={chartData} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Stats;
