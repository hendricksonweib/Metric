import { useState } from "react";
import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { SchoolList } from "../layout/SchoolList";
import { CreateSchoolModal } from "../components/modals/CreateSchoolModal";
import { SchoolFilter } from "../components/SchoolFilter";

export default function EscolasPage() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);

  // Filtros de busca
  const [searchNome, setSearchNome] = useState("");
  const [regiaoId, setRegiaoId] = useState<number | null>(null);
  const [grupoId, setGrupoId] = useState<number | null>(null);

  const handleSuccess = () => {
    setShowModal(false);
    setEditId(null);
    setReload(true);
  };

  return (
    <>
      <Header />
      <div className="pt-20 p-12 bg-gray-100 min-h-screen">
        <PageHeader
          title="Escolas"
          description="Gerenciamento de escolas"
          actionLabel="Nova Escola"
          onActionClick={() => {
            setEditId(null);
            setShowModal(true);
          }}
        />

        <SchoolFilter
          onFilter={(nome, regiao, grupo) => {
            setSearchNome(nome);
            setRegiaoId(regiao);
            setGrupoId(grupo);
          }}
        />

        <SchoolList
          reload={reload}
          onReloadDone={() => setReload(false)}
          onEdit={(id) => {
            setEditId(id);
            setShowModal(true);
          }}
          searchNome={searchNome}
          regiaoId={regiaoId}
          grupoId={grupoId}
        />
      </div>

      {showModal && (
        <CreateSchoolModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
          escolaId={editId}
        />
      )}
    </>
  );
}
