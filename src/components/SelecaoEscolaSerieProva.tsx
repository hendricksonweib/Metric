import { useEffect, useState } from "react";

interface Escola {
  id: number;
  nome: string;
}

interface Serie {
  id: string;
  nome: string;
}

interface Prova {
  id: number;
  nome: string;
}

export const SelecaoEscolaSerieProva = () => {
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [provas, setProvas] = useState<Prova[]>([]);

  const [escolaSelecionada, setEscolaSelecionada] = useState<number | null>(null);
  const [serieSelecionada, setSerieSelecionada] = useState<string | null>(null);
  const [provaSelecionada, setProvaSelecionada] = useState<number | null>(null);

  // Buscar escolas
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/escolas`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEscolas(data);
        } else {
          setEscolas([]);
        }
      })
      .catch(console.error);
  }, []);

  // Buscar séries após escola selecionada
  useEffect(() => {
    if (!escolaSelecionada) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/obter-series-escola?escola_id=${escolaSelecionada}`)
      .then(res => res.json())
      .then(data => setSeries(data))
      .catch(console.error);
  }, [escolaSelecionada]);

  // Buscar provas após série selecionada
  useEffect(() => {
    if (!serieSelecionada) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/provas?serie=${serieSelecionada}`)
      .then(res => res.json())
      .then(data => setProvas(data))
      .catch(console.error);
  }, [serieSelecionada]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm mb-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">
        1. Selecione a Escola, Série e Prova
      </h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <label className="text-sm text-gray-600 mb-1 block">Escola</label>
          <select
            value={escolaSelecionada ?? ""}
            onChange={(e) => {
              setEscolaSelecionada(Number(e.target.value));
              setSerieSelecionada(null);
              setProvaSelecionada(null);
              setSeries([]);
              setProvas([]);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Selecione uma escola</option>
            {escolas.map((escola) => (
              <option key={escola.id} value={escola.id}>
                {escola.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[250px]">
          <label className="text-sm text-gray-600 mb-1 block">Série</label>
          <select
            value={serieSelecionada ?? ""}
            onChange={(e) => {
              setSerieSelecionada(e.target.value);
              setProvaSelecionada(null);
              setProvas([]);
            }}
            disabled={!escolaSelecionada}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          >
            <option value="">
              {escolaSelecionada ? "Selecione uma série" : "Selecione uma escola primeiro"}
            </option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[250px]">
          <label className="text-sm text-gray-600 mb-1 block">Prova</label>
          <select
            value={provaSelecionada ?? ""}
            onChange={(e) => setProvaSelecionada(Number(e.target.value))}
            disabled={!serieSelecionada}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          >
            <option value="">
              {serieSelecionada ? "Selecione uma prova" : "Selecione uma série primeiro"}
            </option>
            {provas.map((prova) => (
              <option key={prova.id} value={prova.id}>
                {prova.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
