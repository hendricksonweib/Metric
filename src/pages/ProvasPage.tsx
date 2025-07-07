import { useState } from "react";
import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { ProvaList } from "../layout/ProvaList";
import { CreateProvaModal } from "../components/modals/CreateProvaModal";

export default function ProvasPage() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [reload, setReload] = useState(false);

  const handleSuccess = () => {
    setShowModal(false);
    setEditId(null);
    setReload(true);
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <div className="pt-20 p-8 bg-gray-100 min-h-screen">
        <PageHeader
          title="Avaliações"
          description="Gerenciamento de avaliações"
          actionLabel="Nova Prova"
          onActionClick={() => {
            setEditId(null);
            setShowModal(true);
          }}
        />
        <ProvaList
          reload={reload}
          onReloadDone={() => setReload(false)}
          onEdit={handleEdit}
        />
      </div>

      {showModal && (
        <CreateProvaModal
          provaId={editId}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
