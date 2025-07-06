import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/DashboardPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import EscolasPage from "./pages/EscolasPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/escolas" element={<EscolasPage />} />
    </Routes>
  );
}

export default App;
