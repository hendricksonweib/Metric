import { useEffect, useState } from "react";
import { UserRow } from "../ui/UserRow";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo_usuario: string;
}

interface PaginatedListProps {
  reload?: boolean;
  onReloadDone?: () => void;
}

export const PaginatedList = ({ reload, onReloadDone }: PaginatedListProps) => {
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

  useEffect(() => {
    if (reload) {
      fetchUsuarios().then(() => onReloadDone?.());
    }
  }, [reload, onReloadDone]);

  const deleteUsuario = async (id: number) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirm) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao excluir usuário");
      }

      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message || "Erro ao excluir usuário.");
    }
  };

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
          onEdit={() => alert("Editar não implementado")}
          onDelete={() => deleteUsuario(usuario.id)} 
        />
      ))}

      <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t text-sm text-gray-600">
        <span>
          Mostrando {start} a {end} de {usuarios.length} usuários
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
