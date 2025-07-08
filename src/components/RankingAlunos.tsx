import { useEffect, useState } from "react";

interface Aluno {
  aluno_id: number;
  aluno_nome: string;
  turma_id: number;
  turma_nome: string;
  escola_id: number;
  escola_nome: string;
  regiao_id: number;
  grupo_id: number;
  regiao_nome: string;
  grupo_nome: string;
  total_desempenhos: number;
  media_geral: number;
  maior_nota: number;
  menor_nota: number;
}

interface ApiResponse {
  data: Aluno[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const RankingAlunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/student-ranking?page=${page}&limit=20`)
      .then(res => res.json())
      .then((json: ApiResponse) => {
        setAlunos(json.data);
        setTotalPages(json.totalPages);
        setTotal(json.total);
      })
      .catch(console.error);
  }, [page]);

  const renderPagination = () => {
    const buttons = [];
    const delta = 2;

    const createPageButton = (p: number) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`w-8 h-8 text-sm rounded border ${
          page === p
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {p}
      </button>
    );

    // Always show first and last
    if (page > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => setPage(page - 1)}
          className="px-2 h-8 rounded border hover:bg-gray-100 text-gray-700"
        >
          {"<"}
        </button>
      );
    }

    if (page > delta + 2) {
      buttons.push(createPageButton(1));
      buttons.push(<span key="start-ellipsis" className="px-2">...</span>);
    }

    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      buttons.push(createPageButton(i));
    }

    if (page < totalPages - delta - 1) {
      buttons.push(<span key="end-ellipsis" className="px-2">...</span>);
      buttons.push(createPageButton(totalPages));
    }

    if (page < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => setPage(page + 1)}
          className="px-2 h-8 rounded border hover:bg-gray-100 text-gray-700"
        >
          {">"}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Ranking de Alunos</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Posição</th>
              <th className="px-4 py-3">Aluno</th>
              <th className="px-4 py-3">Escola</th>
              <th className="px-4 py-3">Turma</th>
              <th className="px-4 py-3">Desempenho</th>
              <th className="px-4 py-3">Notas (Maior / Menor)</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => {
              const posicao = (page - 1) * 20 + index + 1;
              let bg = "";

              if (posicao === 1) bg = "bg-yellow-100";
              else if (posicao === 2 || posicao === 3) bg = "bg-yellow-50";

              return (
                <tr key={aluno.aluno_id} className={`${bg} border-b`}>
                  <td className="px-4 py-3 font-semibold">{posicao}º</td>
                  <td className="px-4 py-3">{aluno.aluno_nome}</td>
                  <td className="px-4 py-3">{aluno.escola_nome}</td>
                  <td className="px-4 py-3">{aluno.turma_nome}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    {parseFloat(aluno.media_geral.toString()).toFixed(0)}%
                    <span className="text-gray-400 text-xs"> ({aluno.total_desempenhos} avaliações)</span>
                  </td>
                  <td className="px-4 py-3">
                    {aluno.maior_nota} / {aluno.menor_nota}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
        <p className="text-sm text-gray-500">
          Mostrando {(page - 1) * 20 + 1} a {Math.min(page * 20, total)} de {total} alunos
        </p>
        <div className="flex gap-1 items-center">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};
