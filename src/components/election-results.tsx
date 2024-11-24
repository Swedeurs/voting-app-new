import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ElectionResultsProps {
  election: any;
}

const ElectionResults: React.FC<ElectionResultsProps> = ({ election }) => {
  const chartData = {
    labels: Object.keys(election.votes),
    datasets: [
      {
        label: "Number of Votes",
        data: Object.values(election.votes),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-10 p-6 bg-yellow-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Election Results</h2>
      <ul>
        {Object.keys(election.votes).map((choice) => (
          <li key={choice}>
            {choice}: {election.votes[choice]} votes
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-bold mt-6 mb-4">
        Representative Agreement Rates
      </h3>
      <ul>
        {election.agreementRates?.map((rate: any) => (
          <li key={rate.representativeId}>
            {rate.name}: Agreement Rate - {rate.agreementRate}%
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4">Vote Distribution Chart</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ElectionResults;
