import { useEffect, useState } from "react";

interface ProvaModalProps {
  provaId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface Questao {
  enunciado: string;
  imagem_url?: string;
  nivel_ensino: string;
  dificuldade: string;
  serie: string;
  pontos: number;
  componente_curricular_id: number;
  codigos_bncc: number[];
  alternativas: { texto: string; correta: boolean }[];
}

interface ComponenteCurricular {
  id: number;
  nome: string;
}

interface HabilidadeBNCC {
  id: number;
  codigo: string;
  descricao: string;
  componente_curricular_id: number;
  serie: string;
  saeb: boolean;
}

const niveis = ["FUNDAMENTAL_I", "FUNDAMENTAL_II", "MEDIO"];
const series = [
  "PRIMEIRO_ANO", "SEGUNDO_ANO", "TERCEIRO_ANO", "QUARTO_ANO", "QUINTO_ANO",
  "SEXTO_ANO", "SETIMO_ANO", "OITAVO_ANO", "NONO_ANO", "PRIMEIRA_SERIE",
  "SEGUNDA_SERIE", "TERCEIRA_SERIE", "PRIMEIRO_E_SEGUNDO_ANOS",
  "TERCEIRO_AO_QUINTO_ANO", "PRIMEIRO_AO_QUINTO_ANO", "EJA"
];
const dificuldades = ["FACIL", "MEDIA", "DIFICIL"];

export const CreateProvaModal = ({ provaId, onClose, onSuccess }: ProvaModalProps) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nivelEnsino, setNivelEnsino] = useState("FUNDAMENTAL_I");
  const [questoes, setQuestoes] = useState<Questao[]>([]);

  const handleAddQuestao = () => {
    setQuestoes([...questoes, {
      enunciado: "",
      imagem_url: "",
      nivel_ensino: nivelEnsino,
      dificuldade: "MEDIA",
      serie: "PRIMEIRO_ANO",
      pontos: 1,
      componente_curricular_id: 0,
      codigos_bncc: [],
      alternativas: [
        { texto: "", correta: true },
        { texto: "", correta: false },
        { texto: "", correta: false },
        { texto: "", correta: false }
      ]
    }]);
  };

  const handleSubmit = async () => {
    try {
      const provaRes = await fetch(`${import.meta.env.VITE_API_URL}/api/provas${provaId ? `/${provaId}` : ""}`, {
        method: provaId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, nivel_ensino: nivelEnsino, data_aplicacao: new Date().toISOString() })
      });
      if (!provaRes.ok) throw new Error("Erro ao salvar prova");
      const provaSalva = await provaRes.json();

      for (const questao of questoes) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/provas/${provaSalva.id}/questoes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...questao, prova_id: provaSalva.id })
        });
      }

      onSuccess();
    } catch (err) {
      alert("Erro ao salvar prova ou questões");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">{provaId ? "Editar Prova" : "Criar Nova Prova - Etapa 1"}</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome da Prova</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium">Descrição (opcional)</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium">Nível de Ensino</label>
            <select value={nivelEnsino} onChange={e => setNivelEnsino(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {niveis.map(n => <option key={n} value={n}>{n.replace("_", " ")}</option>)}
            </select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-semibold">Etapa 2 - Questões</h3>
            <button onClick={handleAddQuestao} className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm">+ Adicionar Questão</button>
          </div>

          {questoes.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2 mt-3">
              <p className="font-medium">Questão {index + 1}</p>
              <textarea
                placeholder="Enunciado"
                value={q.enunciado}
                onChange={(e) => {
                  const copy = [...questoes];
                  copy[index].enunciado = e.target.value;
                  setQuestoes(copy);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Similar blocks can be created for nivel_ensino, dificuldade, etc */}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">{provaId ? "Salvar" : "Continuar para Questões"}</button>
        </div>
      </div>
    </div>
  );
};
