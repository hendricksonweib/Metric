import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { DashboardPage } from "./pages/DashboardPage";
import { UsuariosPage } from "./pages/UsuariosPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
    </Routes>
  );
}

export default App;
