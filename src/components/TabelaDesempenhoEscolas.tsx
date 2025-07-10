import { useEffect, useState } from "react";
import { useFiltroDashboard } from "../hooks/useFiltroDashboard";

interface EscolaDesempenho {
  escola_id: number;
  escola_nome: string;
  regiao_id: number;
  grupo_id: number;
  regiao_nome: string;
  grupo_nome: string;
  total_alunos: number;
  total_desempenhos: number;
  media_desempenho: number | null;
  total_turmas: number;
}

export const TabelaDesempenhoEscolas = () => {
  const { filtros } = useFiltroDashboard();
  const [dados, setDados] = useState<EscolaDesempenho[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const params = new URLSearchParams({
      page: pagina.toString(),
      limit: "10",
    });

    // Adiciona filtros na query string se existirem
    if (filtros.regiaoId) params.append("regiao_id", filtros.regiaoId);
    if (filtros.grupoId) params.append("grupo_id", filtros.grupoId);
    if (filtros.escolaId) params.append("escola_id", filtros.escolaId);
    if (filtros.serie) params.append("serie", filtros.serie);
    if (filtros.turmaId) params.append("turma_id", filtros.turmaId);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/school-performance?${params.toString()}`
      );
      const json = await res.json();

      setDados(json.data || []);
      setTotalPaginas(json.totalPages || 1);
      setTotal(json.total || 0);
    } catch (error) {
      console.error("Erro ao carregar desempenho por escola:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagina, filtros]); // Reexecuta quando filtros mudam

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Desempenho por Escolas</h2>
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Posição</th>
              <th className="px-4 py-2">Escola</th>
              <th className="px-4 py-2">Região</th>
              <th className="px-4 py-2">Grupo</th>
              <th className="px-4 py-2">Média</th>
              <th className="px-4 py-2">Alunos Avaliados</th>
              <th className="px-4 py-2">Total Alunos</th>
              <th className="px-4 py-2">Turmas</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((escola, index) => (
              <tr
                key={escola.escola_id}
                className="hover:bg-gray-50 border-b border-gray-100"
              >
                <td className="px-4 py-3 font-medium">{(pagina - 1) * 10 + index + 1}º</td>
                <td className="px-4 py-3">{escola.escola_nome}</td>
                <td className="px-4 py-3">{escola.regiao_nome}</td>
                <td className="px-4 py-3">{escola.grupo_nome || "Não Definido"}</td>
                <td className="px-4 py-3 text-blue-700 font-semibold">
                  {typeof escola.media_desempenho === "number"
                    ? escola.media_desempenho.toFixed(1)
                    : "0.0"}
                </td>
                <td className="px-4 py-3">{escola.total_desempenhos ?? 0}</td>
                <td className="px-4 py-3">{escola.total_alunos ?? 0}</td>
                <td className="px-4 py-3">{escola.total_turmas ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <p>
          Mostrando {(pagina - 1) * 10 + 1} a {Math.min(pagina * 10, total)} de {total} resultados
        </p>
        <div className="flex gap-1">
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i + 1)}
              className={`w-8 h-8 border rounded ${
                pagina === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
