import { useState } from "react";
import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { SchoolList } from "../layout/SchoolList";
import { CreateSchoolModal } from "../components/modals/CreateSchoolModal";

export default function EscolasPage() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleSuccess = () => {
    setShowModal(false);
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
          onActionClick={() => setShowModal(true)}
        />

        <SchoolList reload={reload} onReloadDone={() => setReload(false)} />
      </div>

      {showModal && (
        <CreateSchoolModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
