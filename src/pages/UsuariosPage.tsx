import { PaginatedList } from "../layout/PaginatedList";
import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
export const UsuariosPage = () => {
  return (
    <>
      <Header />
      <div className="pt-20 p-12 bg-gray-100 min-h-screen">
        <PageHeader
          title="Usuários"
          description="Gerenciamento de usuários do sistema"
          actionLabel="Novo Usuário"
          onActionClick={() => alert("Abrir modal de cadastro")}
        />
        <PaginatedList />
      </div>
    </>
  );
};
