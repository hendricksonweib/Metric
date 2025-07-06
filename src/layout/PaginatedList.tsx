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

  const fetchUsuarios = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`);
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const paginated = usuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(usuarios.length / itemsPerPage);

  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      {paginated.map((u) => (
        <UserRow
          key={u.id}
          nome={u.nome}
          email={u.email}
          tipo_usuario={u.tipo_usuario}
          onEdit={() => alert(`Editar ${u.nome}`)}
          onDelete={() => alert(`Excluir ${u.nome}`)}
        />
      ))}

      <div className="flex justify-between items-center p-4 border-t text-sm text-gray-600">
        <span>
          Mostrando {paginated.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a{" "}
          {(currentPage - 1) * itemsPerPage + paginated.length} de {usuarios.length} usuários
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="px-2 border rounded bg-blue-100 text-blue-600">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
