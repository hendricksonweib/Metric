import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";

export default function ProvasPage() {
  return (
    <>
      <Header />
      <div className="pt-20 p-12 bg-gray-100 min-h-screen">
        <PageHeader
          title="Provas"
          description="Gerenciamento de avaliações"
          actionLabel="Criar Avaliação"
          onActionClick={() => {}}
        />
      </div>
    </>
  );
}
