import { useEffect, useState } from "react";
import { UserRow } from "../ui/UserRow";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: string;
}

export const PaginatedList = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`);
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const paginated = usuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(usuarios.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, usuarios.length);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {paginated.map((usuario) => (
        <UserRow
          key={usuario.id}
          nome={usuario.nome}
          email={usuario.email}
          tipo_usuario={usuario.tipo_usuario}
          onEdit={() => alert(`Editar ${usuario.nome}`)}
          onDelete={() => alert(`Excluir ${usuario.nome}`)}
        />
      ))}

      <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t text-sm text-gray-600">
        <span>
          Mostrando {usuarios.length === 0 ? 0 : start} a {end} de {usuarios.length} usuários
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          >
            &lt;
          </button>
          <span className="px-3 py-1 rounded bg-blue-600 text-white">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
