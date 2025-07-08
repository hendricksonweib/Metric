import { useEffect, useState } from "react";

interface Regiao {
  id: number;
  nome: string;
}
interface Grupo {
  id: number;
  nome: string;
}
interface Escola {
  id: number;
  nome: string;
}
interface Turma {
  id: number;
  nome: string;
}

export const FiltroAvaliacoes = () => {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [series, setSeries] = useState<string[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);

  const [regiaoId, setRegiaoId] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [escolaId, setEscolaId] = useState("");
  const [serie, setSerie] = useState("");
  const [turmaId, setTurmaId] = useState("");

  // Carrega regiões ao iniciar
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/regioes`)
      .then(res => res.json())
      .then(setRegioes)
      .catch(() => setRegioes([]));
  }, []);

  // Carrega grupos ao selecionar região
  useEffect(() => {
    if (!regiaoId) {
      setGrupos([]);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/regioes/${regiaoId}`)
      .then(res => res.json())
      .then(data => setGrupos(data?.grupos || []))
      .catch(() => setGrupos([]));

    setGrupoId("");
    setEscolaId("");
    setSeries([]);
    setSerie("");
    setTurmas([]);
    setTurmaId("");
  }, [regiaoId]);

  // Carrega escolas ao selecionar grupo
  useEffect(() => {
    if (!regiaoId || !grupoId) {
      setEscolas([]);
      return;
    }
    const params = new URLSearchParams({
      regiao_id: regiaoId,
      grupo_id: grupoId,
    });

    fetch(`${import.meta.env.VITE_API_URL}/api/escolas?${params.toString()}`)
      .then(res => res.json())
      .then(setEscolas)
      .catch(() => setEscolas([]));

    setEscolaId("");
    setSeries([]);
    setSerie("");
    setTurmas([]);
    setTurmaId("");
  }, [grupoId]);

  // Carrega séries ao selecionar escola
  useEffect(() => {
    if (!escolaId) {
      setSeries([]);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/obter-series-escola?escola_id=${escolaId}`)
      .then(res => res.json())
      .then(setSeries)
      .catch(() => setSeries([]));

    setSerie("");
    setTurmas([]);
    setTurmaId("");
  }, [escolaId]);

  // Carrega turmas ao selecionar série
  useEffect(() => {
    if (!escolaId || !serie) {
      setTurmas([]);
      return;
    }

    const params = new URLSearchParams({
      escola_id: escolaId,
      serie,
    });

    fetch(`${import.meta.env.VITE_API_URL}/api/turmas?${params.toString()}`)
      .then(res => res.json())
      .then(setTurmas)
      .catch(() => setTurmas([]));

    setTurmaId("");
  }, [serie]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Filtro de Avaliações</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Ano Letivo</label>
          <input type="text" disabled value="2025" className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-600" />
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Região</label>
          <select value={regiaoId} onChange={e => setRegiaoId(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">Selecione</option>
            {regioes.map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Grupo</label>
          <select value={grupoId} onChange={e => setGrupoId(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">Selecione</option>
            {grupos.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Escola</label>
          <select value={escolaId} onChange={e => setEscolaId(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">Selecione</option>
            {escolas.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Série (Ano Escolar)</label>
          <select value={serie} onChange={e => setSerie(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">Selecione</option>
            {series.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Turma</label>
          <select value={turmaId} onChange={e => setTurmaId(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">Selecione</option>
            {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
