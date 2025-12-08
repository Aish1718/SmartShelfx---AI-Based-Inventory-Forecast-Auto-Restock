// // frontend/src/components/forecast/ForecastChart.jsx

// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const ForecastChart = ({ data }) => {
//   if (!data || data.length === 0) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         No forecast data available
//       </div>
//     );
//   }

//   const chartData = {
//     labels: data.map((d) => {
//       const date = new Date(d.date);
//       return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     }),
//     datasets: [
//       {
//         label: 'Predicted Demand',
//         data: data.map((d) => d.predictedDemand),
//         borderColor: 'rgb(99, 102, 241)',
//         backgroundColor: 'rgba(99, 102, 241, 0.1)',
//         fill: true,
//         tension: 0.4,
//         pointRadius: 3,
//         pointHoverRadius: 6,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: function (context) {
//             return `Predicted: ${context.parsed.y} units`;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           precision: 0,
//         },
//         title: {
//           display: true,
//           text: 'Predicted Demand (units)',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//     },
//     interaction: {
//       mode: 'nearest',
//       axis: 'x',
//       intersect: false,
//     },
//   };

//   return (
//     <div style={{ height: '400px' }}>
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default ForecastChart;



// frontend/src/components/forecast/ForecastChart.jsx

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ForecastChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-[#D2C1B6] bg-[#0A0F1A] rounded-lg border border-[#1A2234]">
        No forecast data available
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Predicted Demand',
        data: data.map((d) => d.predictedDemand),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#3B82F6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#D2C1B6',
          font: { size: 14 }
        },
      },

      tooltip: {
        backgroundColor: '#111829',
        borderColor: '#3B82F6',
        borderWidth: 1,
        titleColor: '#D2C1B6',
        bodyColor: '#D2C1B6',
        padding: 10,
        callbacks: {
          label: function (context) {
            return `Predicted: ${context.parsed.y} units`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#D2C1B6',
          precision: 0,
        },
        title: {
          display: true,
          text: 'Predicted Demand (units)',
          color: '#D2C1B6',
        },
        grid: {
          color: '#1A2234',
        },
      },
      x: {
        ticks: {
          color: '#D2C1B6',
        },
        title: {
          display: true,
          text: 'Date',
          color: '#D2C1B6',
        },
        grid: {
          color: '#1A2234',
        },
      },
    },

    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div
      className="p-4 rounded-lg border border-[#1A2234]"
      style={{ backgroundColor: '#0D1322', height: '400px' }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ForecastChart;
