import { useEffect, useState } from "react";

interface Escola {
  id: number;
  nome: string;
}

interface Props {
  regiaoId: string;
  grupoId: string;
  value: string;
  onChange: (id: string) => void;
}

export const SelectEscola = ({ regiaoId, grupoId, value, onChange }: Props) => {
  const [escolas, setEscolas] = useState<Escola[]>([]);

  useEffect(() => {
    if (!regiaoId || !grupoId) return;
    const params = new URLSearchParams({ regiao_id: regiaoId, grupo_id: grupoId });
    fetch(`${import.meta.env.VITE_API_URL}/api/escolas?${params}`)
      .then(res => res.json())
      .then(data => setEscolas(data || []));
  }, [regiaoId, grupoId]);

  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">Escola</label>
      <select className="w-full border px-3 py-2 rounded" value={value} onChange={e => onChange(e.target.value)}>
        {escolas.map(e => (
          <option key={e.id} value={e.id}>{e.nome}</option>
        ))}
      </select>
    </div>
  );
};
