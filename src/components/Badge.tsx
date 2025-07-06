type BadgeProps = {
  text: string;
  type?: "admin" | "gestor";
};

export const Badge = ({ text, type = "admin" }: BadgeProps) => {
  const style =
    type === "admin"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${style}`}>
      {text}
    </span>
  );
};
