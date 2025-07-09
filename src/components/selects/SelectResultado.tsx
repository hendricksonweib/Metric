interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SelectResultado = ({ value, onChange }: Props) => {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">Resultado</label>
      <select
        className="w-full border px-3 py-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todos os Resultados</option>
        <option value="melhores">Melhores</option>
        <option value="criticos">Resultados Críticos</option>
      </select>
    </div>
  );
};
