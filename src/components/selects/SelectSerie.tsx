import { useEffect, useState } from "react";

interface Props {
  escolaId: string;
  value: string;
  onChange: (val: string) => void;
}

export const SelectSerie = ({ escolaId, value, onChange }: Props) => {
  const [series, setSeries] = useState<string[]>([]);

  useEffect(() => {
    if (!escolaId) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/obter-series-escola?escola_id=${escolaId}`)
      .then(res => res.json())
      .then(data => setSeries(data || []));
  }, [escolaId]);

  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">Série</label>
      <select className="w-full border px-3 py-2 rounded" value={value} onChange={e => onChange(e.target.value)}>
        {series.map(serie => (
          <option key={serie} value={serie}>{serie}</option>
        ))}
      </select>
    </div>
  );
};
