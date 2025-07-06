import { PaginatedList } from "../layout/PaginatedList";
import { Header } from "../components/Header";
export const UsuariosPage = () => {
  return (
    <div className="p-6">
      <Header />
      <h1 className="text-xl font-semibold mb-4">Usuários</h1>
      <PaginatedList />
    </div>
  );
};
