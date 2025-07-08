import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DesempenhoComponente {
  componente_id: number;
  componente_nome: string;
  total_questoes: number;
  total_respostas: number;
  total_acertos: number;
  percentual_acertos: number;
}

export const GraficoComponentesCurriculares = () => {
  const [dados, setDados] = useState<DesempenhoComponente[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/componentes-curriculares-desempenho`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDados(data);
        } else {
          setDados([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar desempenho de componentes curriculares", err);
      });
  }, []);

  const chartData = {
    labels: dados.map((item) => item.componente_nome),
    datasets: [
      {
        label: "Percentual de Acertos (%)",
        data: dados.map((item) => item.percentual_acertos),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Desempenho por Componente Curricular" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "Percentual de Acertos (%)" },
      },
      x: {
        title: { display: true, text: "Componentes Curriculares" },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Análise de Componentes Curriculares</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
