import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/DashboardPage";
import EscolasPage from "./pages/EscolasPage";
import AlunosPage from "./pages/AlunosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import TurmasPage from "./pages/TurmasPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/escolas" element={<EscolasPage />} />
      <Route path="/turmas" element={<TurmasPage />} />
      <Route path="/alunos" element={<AlunosPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
    </Routes>
  );
}

export default App;
