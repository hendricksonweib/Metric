import { useEffect, useState } from "react";

interface Props {
  escolaId?: string;
  value: string;
  onChange: (val: string) => void;
}

export const SelectSerie = ({ escolaId, value, onChange }: Props) => {
  const [series, setSeries] = useState<string[]>([]);

  useEffect(() => {
    if (!escolaId) {
      setSeries([]);
      return;
    }

    const url = `${
      import.meta.env.VITE_API_URL
    }/api/obter-series-escola?escola_id=${escolaId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Séries carregadas:", data);
        setSeries(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Erro ao carregar séries:", err);
        setSeries([]);
      });
  }, [escolaId]);

  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">Série</label>
      <select
        className="w-full border border-gray-300 px-3 py-2 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!series.length}
      >
        <option value="">Selecione uma série</option>
        {series.map((serie) => (
          <option key={serie} value={serie}>
            {serie}
          </option>
        ))}
      </select>
    </div>
  );
};
