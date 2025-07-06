import { Pencil, Trash2 } from "lucide-react";

type IconButtonProps = {
  type: "edit" | "delete";
  onClick: () => void;
};

export const IconButton = ({ type, onClick }: IconButtonProps) => {
  const Icon = type === "edit" ? Pencil : Trash2;
  const color = type === "edit" ? "text-blue-600" : "text-red-600";

  return (
    <button onClick={onClick} className={`${color} hover:opacity-80`}>
      <Icon size={18} />
    </button>
  );
};
