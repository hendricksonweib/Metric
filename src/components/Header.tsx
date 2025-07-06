import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Escolas", path: "/escolas" },
  { name: "Turmas", path: "/turmas" },
  { name: "Alunos", path: "/alunos" },
  { name: "Provas", path: "/provas" },
  { name: "Usuários", path: "/usuarios" },
  { name: "Gabaritos", path: "/gabaritos" },
];

export const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 right-0 shadow z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-bold text-lg">SAG</span>
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-500"
                } transition`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">{user?.name || "Usuário"}</span>
          <button onClick={handleLogout} className="flex items-center gap-1 hover:underline">
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};
