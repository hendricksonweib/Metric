import { useEffect, useState } from "react";
import { ModalBNCC } from "./ModalBNCC";

interface CreateQuestoesModalProps {
  provaId: number;
  onClose: () => void;
}

interface Alternativa {
  texto: string;
  correta: boolean;
}

interface ComponenteCurricular {
  id: number;
  nome: string;
}

export const CreateQuestoesModal = ({ provaId, onClose }: CreateQuestoesModalProps) => {
  const [enunciado, setEnunciado] = useState("");
  const [alternativas, setAlternativas] = useState<Alternativa[]>([
    { texto: "", correta: true },
    { texto: "", correta: false },
    { texto: "", correta: false },
    { texto: "", correta: false },
  ]);

  const [nivelEnsino, setNivelEnsino] = useState("ANOS_INICIAIS");
  const [serie, setSerie] = useState("PRIMEIRO_ANO");
  const [dificuldade, setDificuldade] = useState("FACIL");
  const [pontos, setPontos] = useState(1);
  const [componenteId, setComponenteId] = useState(0);
  const [componentes, setComponentes] = useState<ComponenteCurricular[]>([]);
  const [codigosBNCC, setCodigosBNCC] = useState<number[]>([]);
  const [showModalBNCC, setShowModalBNCC] = useState(false);

  const niveis = ["ANOS_INICIAIS", "ANOS_FINAIS", "ENSINO_MEDIO"];
  const series = [
    "PRIMEIRO_ANO", "SEGUNDO_ANO", "TERCEIRO_ANO", "QUARTO_ANO", "QUINTO_ANO",
    "SEXTO_ANO", "SETIMO_ANO", "OITAVO_ANO", "NONO_ANO", "PRIMEIRA_SERIE",
    "SEGUNDA_SERIE", "TERCEIRA_SERIE", "PRIMEIRO_E_SEGUNDO_ANOS",
    "TERCEIRO_AO_QUINTO_ANO", "PRIMEIRO_AO_QUINTO_ANO", "EJA"
  ];
  const dificuldades = ["FACIL", "MEDIA", "DIFICIL"];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/componentes-curriculares`)
      .then(res => res.json())
      .then(data => setComponentes(data || []));
  }, []);

  const handleSubmit = async () => {
    const payload = {
      enunciado,
      imagem_url: "",
      nivel_ensino: nivelEnsino,
      dificuldade,
      serie,
      pontos,
      prova_id: provaId,
      componente_curricular_id: componenteId,
      codigos_bncc: codigosBNCC,
      alternativas
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/provas/${provaId}/questoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro ao salvar questão:", res.status, errorText);
        alert("Erro ao salvar questão.");
        return;
      }

      alert("Questão salva com sucesso!");
      onClose();
    } catch (err) {
      alert("Erro ao salvar questão. Veja o console para mais informações.");
      console.error(err);
    }
  };

  const marcarCorreta = (index: number) => {
    const novas = alternativas.map((alt, i) => ({
      ...alt,
      correta: i === index
    }));
    setAlternativas(novas);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Adicionar Questão</h2>

        <textarea
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
          placeholder="Digite o enunciado da questão"
          className="w-full p-2 border rounded mb-4"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <select value={nivelEnsino} onChange={(e) => setNivelEnsino(e.target.value)} className="border p-2 rounded">
            {niveis.map(n => <option key={n} value={n}>{n}</option>)}
          </select>

          <select value={serie} onChange={(e) => setSerie(e.target.value)} className="border p-2 rounded">
            {series.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={dificuldade} onChange={(e) => setDificuldade(e.target.value)} className="border p-2 rounded">
            {dificuldades.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select value={componenteId} onChange={(e) => setComponenteId(Number(e.target.value))} className="border p-2 rounded">
            <option value="">Componente Curricular</option>
            {componentes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowModalBNCC(true)}
          className="w-full mb-4 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 text-sm text-gray-700"
        >
          + Selecionar Habilidades BNCC/SAEB
        </button>

        {alternativas.map((alt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="correta"
              checked={alt.correta}
              onChange={() => marcarCorreta(i)}
            />
            <input
              type="text"
              value={alt.texto}
              onChange={(e) => {
                const novas = [...alternativas];
                novas[i].texto = e.target.value;
                setAlternativas(novas);
              }}
              placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
              className="flex-1 p-2 border rounded"
            />
          </div>
        ))}

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-100">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Salvar Questão
          </button>
        </div>
      </div>

      {showModalBNCC && (
        <ModalBNCC
          componenteCurricularId={componenteId}
          onClose={() => setShowModalBNCC(false)}
          onSelect={(habilidades) => setCodigosBNCC(habilidades.map(h => h.id))}
        />
      )}
    </div>
  );
};
