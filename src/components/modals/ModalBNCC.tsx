import { useEffect, useState } from "react";

interface HabilidadeBNCC {
  id: number;
  codigo: string;
  descricao: string;
  componente_curricular: string;
  serie: string;
}

interface ModalBNCCProps {
  componenteCurricularId: number;
  onClose: () => void;
  onSelect: (habilidades: HabilidadeBNCC[]) => void;
}

const series = [
  "PRIMEIRO_ANO", "SEGUNDO_ANO", "TERCEIRO_ANO", "QUARTO_ANO", "QUINTO_ANO",
  "SEXTO_ANO", "SETIMO_ANO", "OITAVO_ANO", "NONO_ANO", "PRIMEIRA_SERIE",
  "SEGUNDA_SERIE", "TERCEIRA_SERIE", "PRIMEIRO_E_SEGUNDO_ANOS",
  "TERCEIRO_AO_QUINTO_ANO", "PRIMEIRO_AO_QUINTO_ANO", "EJA"
];

export const ModalBNCC = ({
  componenteCurricularId,
  onClose,
  onSelect
}: ModalBNCCProps) => {
  const [habilidades, setHabilidades] = useState<HabilidadeBNCC[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [serieFiltro, setSerieFiltro] = useState("");
  const [saebFiltro, setSaebFiltro] = useState("");

  const fetchHabilidades = async () => {
    const params = new URLSearchParams();

    if (componenteCurricularId)
      params.append("componente_curricular_id", componenteCurricularId.toString());
    if (serieFiltro) params.append("serie", serieFiltro);
    if (saebFiltro) params.append("saeb", saebFiltro);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bncc?${params.toString()}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setHabilidades(data);
      } else {
        setHabilidades([]);
      }
    } catch (error) {
      console.error("Erro ao buscar habilidades BNCC:", error);
    }
  };

  useEffect(() => {
    fetchHabilidades();
  }, [serieFiltro, saebFiltro, componenteCurricularId]);

  const toggleSelecionada = (id: number) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const confirmarSelecao = () => {
    const selecionadasInfo = habilidades.filter((h) => selecionadas.includes(h.id));
    onSelect(selecionadasInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Selecionar Habilidades BNCC</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={serieFiltro}
            onChange={(e) => setSerieFiltro(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Todas as Séries</option>
            {series.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={saebFiltro}
            onChange={(e) => setSaebFiltro(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">SAEB e Não-SAEB</option>
            <option value="true">Somente SAEB</option>
            <option value="false">Somente não-SAEB</option>
          </select>
        </div>

        <div className="border rounded overflow-y-auto max-h-[300px] mb-4">
          {habilidades.length === 0 ? (
            <p className="text-gray-500 text-sm text-center p-4">
              Nenhuma habilidade encontrada.
            </p>
          ) : (
            habilidades.map((h) => (
              <div key={h.id} className="p-2 border-b flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={selecionadas.includes(h.id)}
                  onChange={() => toggleSelecionada(h.id)}
                />
                <div>
                  <p className="font-medium text-sm">{h.codigo}</p>
                  <p className="text-xs text-gray-600">{h.descricao}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded hover:bg-gray-100 text-gray-600">
            Cancelar
          </button>
          <button
            onClick={confirmarSelecao}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
