import { useEffect, useState } from "react";

interface CreateTurmaModalProps {
  turmaId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface Escola {
  id: number;
  nome: string;
}

export const CreateTurmaModal = ({ turmaId, onClose, onSuccess }: CreateTurmaModalProps) => {
  const [nome, setNome] = useState("");
  const [escolaId, setEscolaId] = useState<number | "">("");
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [loading, setLoading] = useState(false);

  // Carrega escolas para o select
  useEffect(() => {
    const fetchEscolas = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/escolas`);
      const data = await res.json();
      setEscolas(data);
    };
    fetchEscolas();
  }, []);

  // Se for edição, busca os dados da turma
  useEffect(() => {
    if (!turmaId) return;

    const fetchTurma = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/turmas/${turmaId}`);
      const data = await res.json();
      setNome(data.nome || "");
      setEscolaId(data.escola_id || "");
    };

    fetchTurma();
  }, [turmaId]);

  const handleSubmit = async () => {
    if (!nome.trim() || escolaId === "") {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    const body = { nome, escola_id: Number(escolaId) };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/turmas${turmaId ? `/${turmaId}` : ""}`,
        {
          method: turmaId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Erro ao salvar turma");

      onSuccess();
    } catch (err) {
      alert("Erro ao salvar turma");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {turmaId ? "Editar Turma" : "Nova Turma"}
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da turma"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <select
            value={escolaId}
            onChange={(e) => setEscolaId(e.target.value === "" ? "" : parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione uma escola</option>
            {escolas.map((escola) => (
              <option key={escola.id} value={escola.id}>
                {escola.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};
