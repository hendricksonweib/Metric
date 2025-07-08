import { useState } from "react";

interface CreateQuestoesModalProps {
  provaId: number;
  onClose: () => void;
}

interface Alternativa {
  texto: string;
  correta: boolean;
}

export const CreateQuestoesModal = ({ provaId, onClose }: CreateQuestoesModalProps) => {
  const [enunciado, setEnunciado] = useState("");
  const [alternativas, setAlternativas] = useState<Alternativa[]>([
    { texto: "", correta: true },
    { texto: "", correta: false },
    { texto: "", correta: false },
    { texto: "", correta: false }
  ]);

  const handleSubmit = async () => {
    const payload = {
      enunciado,
      imagem_url: "",
      nivel_ensino: "ANOS_INICIAIS",
      dificuldade: "FACIL",
      serie: "PRIMEIRO_ANO",
      pontos: 1,
      prova_id: provaId,
      componente_curricular_id: 1, // Substitua conforme necessário
      codigos_bncc: [],
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
        throw new Error("Erro ao salvar questão");
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
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Adicionar Questão</h2>

        <textarea
          value={enunciado}
          onChange={(e) => setEnunciado(e.target.value)}
          placeholder="Digite o enunciado da questão"
          className="w-full p-2 border rounded mb-4"
        />

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
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Salvar Questão</button>
        </div>
      </div>
    </div>
  );
};
