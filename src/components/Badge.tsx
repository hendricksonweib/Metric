type BadgeProps = {
  text: string;
  type?: "admin" | "gestor";
};

export const Badge = ({ text, type = "admin" }: BadgeProps) => {
  const color = type === "admin" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
      {text}
    </span>
  );
};
