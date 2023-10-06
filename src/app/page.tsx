"use client";

// import CustomVideoPlayer from "@/components/customvideoplayer";
import CartList from "@/components/cartlist/CartList";
import { ProductList } from "@/components/productlist/ProductList";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { ChartConfiguration } from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const data = {
    labels: ["jan", "feb", "march", "april", "may", "june", "july"],
    datasets: [
      {
        label: "Sales In 2k2@",
        data: [4, 3, 5, 20],
        backgroundColor: "#eee",
      },
      {
        label: "Sales In 2k23",
        data: [4, 3, 5],
        backgroundColor: "green",
      },
    ],
  };
  const option = {
    scales: {
      y: {
        min: 0,
        max: 15,
        ticks: {
          stepSize: 3,
        },
      },
    },
  };

  return (
    <main className=" p-5">
      <h1 className="text-center">Redux Toolkit</h1>
      <ProductList />
      <CartList />
      <div className="container mx-auto px-4">
        <Bar data={data} options={option} />
      </div>
      {/* <CustomVideoPlayer /> */}
    </main>
  );
}
