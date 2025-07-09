import { useEffect, useState } from "react";

interface Turma {
  id: number;
  nome: string;
}

interface Props {
  escolaId: string;
  serie: string;
  value: string;
  onChange: (id: string) => void;
}

export const SelectTurma = ({ escolaId, serie, value, onChange }: Props) => {
  const [turmas, setTurmas] = useState<Turma[]>([]);

  useEffect(() => {
    if (!escolaId || !serie) return;
    const params = new URLSearchParams({ escola_id: escolaId, serie });
    fetch(`${import.meta.env.VITE_API_URL}/api/turmas?${params}`)
      .then(res => res.json())
      .then(data => setTurmas(data || []));
  }, [escolaId, serie]);

  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">Turma</label>
      <select className="w-full border px-3 py-2 rounded" value={value} onChange={e => onChange(e.target.value)}>
        {turmas.map(t => (
          <option key={t.id} value={t.id}>{t.nome}</option>
        ))}
      </select>
    </div>
  );
};
