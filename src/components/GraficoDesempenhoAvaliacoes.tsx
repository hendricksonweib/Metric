import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DesempenhoProva {
  prova_id: number;
  prova_nome: string;
  percentual_acertos: number;
}

export const GraficoDesempenhoAvaliacoes = () => {
  const [dados, setDados] = useState<DesempenhoProva[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/provas-desempenho`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDados(data);
        }
      });
  }, []);

  const chartData = {
    labels: dados.map((item) => item.prova_nome),
    datasets: [
      {
        label: "Percentual de Acertos (%)",
        data: dados.map((item) => item.percentual_acertos),
        backgroundColor: "rgba(139, 92, 246, 0.5)", // lilás suave
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Desempenho por Avaliação",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentual de acertos (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Avaliações",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Notas Médias por Avaliação</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};
