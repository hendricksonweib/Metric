import { useEffect, useState } from "react";

interface EscolaDesempenho {
  escola_id: number;
  escola_nome: string;
  regiao_id: number;
  grupo_id: number;
  regiao_nome: string;
  grupo_nome: string;
  total_alunos: number;
  total_desempenhos: number;
  media_desempenho: number;
  total_turmas: number;
}

export const TabelaDesempenhoEscolas = () => {
  const [dados, setDados] = useState<EscolaDesempenho[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/dashboard/school-performance?page=${pagina}&limit=10`
    );
    const json = await res.json();

    setDados(json.data);
    setTotalPaginas(json.totalPages);
    setTotal(json.total);
  };

  useEffect(() => {
    fetchData();
  }, [pagina]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-lg font-semibold mb-4">Desempenho por Escolas</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase">
              <th className="px-4 py-2">Posição</th>
              <th className="px-4 py-2">Escola</th>
              <th className="px-4 py-2">Região</th>
              <th className="px-4 py-2">Grupo</th>
              <th className="px-4 py-2">Média</th>
              <th className="px-4 py-2">Alunos Avaliados</th>
              <th className="px-4 py-2">Total Alunos</th>
              <th className="px-4 py-2">Total Turmas</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((escola, index) => (
              <tr
                key={escola.escola_id}
                className="hover:bg-gray-50 border-b border-gray-100"
              >
                <td className="px-4 py-3">{(pagina - 1) * 10 + index + 1}º</td>
                <td className="px-4 py-3 font-medium">{escola.escola_nome}</td>
                <td className="px-4 py-3">{escola.regiao_nome}</td>
                <td className="px-4 py-3">{escola.grupo_nome || "Não Definido"}</td>
                <td className="px-4 py-3 text-red-600 font-semibold">
                  {escola.media_desempenho.toFixed(1)}
                </td>
                <td className="px-4 py-3">{escola.total_desempenhos}</td>
                <td className="px-4 py-3">{escola.total_alunos}</td>
                <td className="px-4 py-3">{escola.total_turmas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <p>
          Mostrando {(pagina - 1) * 10 + 1} a{" "}
          {Math.min(pagina * 10, total)} de {total} resultados
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
