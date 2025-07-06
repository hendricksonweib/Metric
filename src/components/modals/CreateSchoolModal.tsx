import { useEffect, useState } from "react";

interface Regiao {
  id: number;
  nome: string;
}

interface Grupo {
  id: number;
  nome: string;
}

interface CreateSchoolModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateSchoolModal = ({ onClose, onSuccess }: CreateSchoolModalProps) => {
  const [nome, setNome] = useState("");
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [regiaoId, setRegiaoId] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRegioes, resGrupos] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/regioes`),
          fetch(`${import.meta.env.VITE_API_URL}/api/grupos`)
        ]);
        const regioesData = await resRegioes.json();
        const gruposData = await resGrupos.json();
        setRegioes(regioesData);
        setGrupos(gruposData);
      } catch (err) {
        setError("Erro ao carregar dados de regiões e grupos.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/escolas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          regiao_id: Number(regiaoId),
          grupo_id: Number(grupoId),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao salvar escola");
      }

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar escola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 text-xl">➕</span> Adicionar Nova Escola
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Nome da Escola
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Região</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={regiaoId}
              onChange={(e) => setRegiaoId(e.target.value)}
              required
            >
              <option value="">Selecione uma região</option>
              {regioes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Grupo</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={grupoId}
              onChange={(e) => setGrupoId(e.target.value)}
              required
            >
              <option value="">Selecione um grupo</option>
              {grupos.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nome}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
              disabled={loading}
            >
              💾 {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
