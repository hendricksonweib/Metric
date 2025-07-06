import { Badge } from "../components/Badge";
import { IconButton } from "../components/IconButton";

type UserRowProps = {
  nome: string;
  email: string;
  tipo_usuario: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const UserRow = ({ nome, email, tipo_usuario, onEdit, onDelete }: UserRowProps) => {
  const badgeType = tipo_usuario === "ADMINISTRADOR" ? "admin" : "gestor";

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <span className="font-bold text-sm">{nome[0]}</span>
        </div>
        <div>
          <p className="font-medium">{nome}</p>
          <p className="text-sm text-gray-500">Email: {email}</p>
        </div>
        <Badge text={tipo_usuario} type={badgeType} />
      </div>
      <div className="flex items-center gap-3">
        <IconButton type="edit" onClick={onEdit} />
        <IconButton type="delete" onClick={onDelete} />
      </div>
    </div>
  );
};
