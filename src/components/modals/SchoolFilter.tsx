import { useEffect, useState } from "react";

interface Regiao {
  id: number;
  nome: string;
}

interface Grupo {
  id: number;
  nome: string;
}

interface SchoolFilterProps {
  onFilterChange: (filters: {
    nome?: string;
    regiaoId?: number;
    grupoId?: number;
  }) => void;
}

export const SchoolFilter = ({ onFilterChange }: SchoolFilterProps) => {
  const [nome, setNome] = useState("");
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [regiaoId, setRegiaoId] = useState<number | "">( "");
  const [grupoId, setGrupoId] = useState<number | "">( "");

  useEffect(() => {
    const fetchRegioes = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/regioes`);
      const data = await res.json();
      setRegioes(data);
    };

    const fetchGrupos = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/grupos`);
      const data = await res.json();
      setGrupos(data);
    };

    fetchRegioes();
    fetchGrupos();
  }, []);

  useEffect(() => {
    onFilterChange({
      nome: nome.trim() !== "" ? nome : undefined,
      regiaoId: regiaoId !== "" ? regiaoId : undefined,
      grupoId: grupoId !== "" ? grupoId : undefined,
    });
  }, [nome, regiaoId, grupoId, onFilterChange]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">Buscar Escolas</h2>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center w-full md:w-1/2 relative">
          <span className="absolute left-3 text-gray-400">
            <i className="fas fa-search" />
          </span>
          <input
            type="text"
            placeholder="Digite o nome da escola..."
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={regiaoId}
          onChange={(e) =>
            setRegiaoId(e.target.value === "" ? "" : parseInt(e.target.value))
          }
        >
          <option value="">Todas as regiões</option>
          {regioes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nome}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={grupoId}
          onChange={(e) =>
            setGrupoId(e.target.value === "" ? "" : parseInt(e.target.value))
          }
        >
          <option value="">Todos os grupos</option>
          {grupos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
