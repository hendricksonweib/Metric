import { useEffect, useState } from "react";

interface HabilidadeBNCC {
  id: number;
  codigo: string;
  descricao: string;
  componente_curricular: string;
  serie: string;
}

interface ModalBNCCProps {
  onClose: () => void;
  onSelect: (habilidades: HabilidadeBNCC[]) => void;
  componenteCurricularId: number;
}

const series = [
  "PRIMEIRO_ANO", "SEGUNDO_ANO", "TERCEIRO_ANO", "QUARTO_ANO", "QUINTO_ANO",
  "SEXTO_ANO", "SETIMO_ANO", "OITAVO_ANO", "NONO_ANO", "PRIMEIRA_SERIE",
  "SEGUNDA_SERIE", "TERCEIRA_SERIE", "PRIMEIRO_E_SEGUNDO_ANOS",
  "TERCEIRO_AO_QUINTO_ANO", "PRIMEIRO_AO_QUINTO_ANO", "EJA"
];

export const ModalBNCC = ({ onClose, onSelect, componenteCurricularId }: ModalBNCCProps) => {
  const [habilidades, setHabilidades] = useState<HabilidadeBNCC[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [serieFiltro, setSerieFiltro] = useState<string>("");
  const [saebFiltro, setSaebFiltro] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (serieFiltro) queryParams.append("serie", serieFiltro);
    if (componenteCurricularId) queryParams.append("componente_curricular_id", componenteCurricularId.toString());
    if (saebFiltro) queryParams.append("saeb", saebFiltro);

    fetch(`${import.meta.env.VITE_API_URL}/api/bncc?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        setHabilidades(data || []);
        setCarregando(false);
      });
  }, [serieFiltro, saebFiltro, componenteCurricularId]);

  const toggleHabilidade = (id: number) => {
    setSelecionadas(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const confirmar = () => {
    const selecionadasInfo = habilidades.filter(h => selecionadas.includes(h.id));
    onSelect(selecionadasInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Selecionar Habilidades BNCC</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={serieFiltro}
            onChange={(e) => setSerieFiltro(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Todas as Séries</option>
            {series.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={saebFiltro}
            onChange={(e) => setSaebFiltro(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Todos</option>
            <option value="true">SAEB</option>
            <option value="false">BNCC</option>
          </select>
        </div>

        {carregando ? (
          <p className="text-center text-gray-500">Carregando habilidades...</p>
        ) : (
          <div className="overflow-y-auto max-h-[300px] border rounded">
            {habilidades.map(h => (
              <div key={h.id} className="p-2 border-b flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selecionadas.includes(h.id)}
                  onChange={() => toggleHabilidade(h.id)}
                />
                <div>
                  <p className="font-medium">{h.codigo}</p>
                  <p className="text-sm text-gray-600">{h.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600">Cancelar</button>
          <button onClick={confirmar} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Confirmar</button>
        </div>
      </div>
    </div>
  );
};
