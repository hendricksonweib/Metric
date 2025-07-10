import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/DashboardPage";
import EscolasPage from "./pages/EscolasPage";
import TurmasPage from "./pages/TurmasPage";
import AlunosPage from "./pages/AlunosPage";
import ProvasPage from "./pages/ProvasPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import GabaritoPage from "./pages/GabaritoPage";

import { FiltroDashboardProvider } from "./hooks/useFiltroDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <FiltroDashboardProvider>
            <DashboardPage />
          </FiltroDashboardProvider>
        }
      />
      <Route path="/escolas" element={<EscolasPage />} />
      <Route path="/turmas" element={<TurmasPage />} />
      <Route path="/alunos" element={<AlunosPage />} />
      <Route path="/provas" element={<ProvasPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/gabaritos" element={<GabaritoPage />} />
    </Routes>
  );
}

export default App;
