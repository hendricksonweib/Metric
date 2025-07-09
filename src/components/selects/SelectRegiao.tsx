import { useEffect, useState } from "react";

interface Regiao {
  id: number;
  nome: string;
}

interface Props {
  value: string;
  onChange: (id: string) => void;
}

export const SelectRegiao = ({ value, onChange }: Props) => {
  const [regioes, setRegioes] = useState<Regiao[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/regioes`)
      .then(res => res.json())
      .then(data => setRegioes(data || []));
  }, []);

  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">Região</label>
      <select className="w-full border px-3 py-2 rounded" value={value} onChange={e => onChange(e.target.value)}>
        {regioes.map(r => (
          <option key={r.id} value={r.id}>{r.nome}</option>
        ))}
      </select>
    </div>
  );
};
