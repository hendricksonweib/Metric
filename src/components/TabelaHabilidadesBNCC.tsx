import { useEffect, useState } from "react";

interface Habilidade {
  bncc_id: number;
  bncc_codigo: string;
  bncc_descricao: string;
  bncc_serie: string;
  componente_curricular_nome: string;
  total_questoes: number;
  total_respostas: number;
  total_acertos: number;
  percentual_acertos: number | string; // pode vir como string
}

interface ApiResponse {
  data: Habilidade[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const TabelaHabilidadesBNCC = () => {
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selecionada, setSelecionada] = useState<Habilidade | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/bncc-skills?page=${page}&limit=20`)
      .then(res => res.json())
      .then((json: ApiResponse) => {
        setHabilidades(json.data);
        setTotalPages(json.totalPages);
        setTotal(json.total);
      })
      .catch(console.error);
  }, [page]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Habilidades BNCC / SAEB</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded">Mais Críticas</button>
          <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded">Melhores Resultados</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {habilidades.map(h => {
          const percentual = parseFloat(h.percentual_acertos as any);
          const pct = isNaN(percentual) ? "0.00%" : percentual.toFixed(2) + "%";

          let bgColor = "bg-green-100 text-green-800";
          if (percentual < 70) {
            bgColor = "bg-yellow-100 text-yellow-800";
          }

          return (
            <button
              key={h.bncc_id}
              onClick={() => setSelecionada(h)}
              className={`${bgColor} p-4 rounded-lg text-left shadow hover:shadow-md transition`}
            >
              <p className="font-bold text-sm">{h.bncc_codigo}</p>
              <p className="text-2xl font-extrabold">{pct}</p>
              <p className="text-xs text-gray-600">
                {h.total_questoes} {h.total_questoes > 1 ? "questões" : "questão"}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">
          Mostrando {(page - 1) * 20 + 1} a {Math.min(page * 20, total)} de {total} resultados
        </p>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded border ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {selecionada && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div
            className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selecionada.bncc_codigo}</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelecionada(null)}
              >
                ✕
              </button>
            </div>

            <p><strong>Componente:</strong> {selecionada.componente_curricular_nome}</p>
            <p><strong>Série:</strong> {selecionada.bncc_serie}</p>
            <p><strong>Descrição:</strong> {selecionada.bncc_descricao}</p>
            <p><strong>Total de Questões:</strong> {selecionada.total_questoes}</p>
            <p><strong>Média de Desempenho:</strong> {parseFloat(selecionada.percentual_acertos as any).toFixed(2)}%</p>

            <div className="mt-4">
              <h4 className="font-semibold">Evolução do Desempenho</h4>
              <p className="text-gray-500 italic py-4 border rounded">
                Não há dados históricos suficientes para exibir a evolução.
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Histórico Detalhado</h4>
              <table className="w-full text-sm text-left text-gray-700 mt-2">
                <thead>
                  <tr>
                    <th className="py-2">Avaliação</th>
                    <th className="py-2">Data</th>
                    <th className="py-2">Desempenho</th>
                    <th className="py-2">Evolução</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Média de {selecionada.total_questoes} questões</td>
                    <td className="py-2">Data não disponível</td>
                    <td className="py-2 text-green-600">
                      {parseFloat(selecionada.percentual_acertos as any).toFixed(2)}%
                    </td>
                    <td className="py-2">Primeira avaliação</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setSelecionada(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
