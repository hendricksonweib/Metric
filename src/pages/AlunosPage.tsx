import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";

export default function AlunosPage() {
  return (
    <>
     <Header />
      <div className="pt-20 p-12 bg-gray-100 min-h-screen">
        <PageHeader
          title="Alunos"
          description="Gerenciamento de alunos"
          actionLabel="Nova Escola"
          onActionClick={() => {
          }}
        />
        </div>
    </>
  )
}
