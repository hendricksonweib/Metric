import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { FiltroAvaliacoes } from "../components/FiltroAvaliacoes";
import { DashboardResumo } from "../components/DashboardResumo";
import { TabelaDesempenhoEscolas } from "../components/TabelaDesempenhoEscolas";
import { GraficoDesempenhoAvaliacoes } from "../components/GraficoDesempenhoAvaliacoes";
import { GraficoComponentesCurriculares } from "../components/GraficoComponentesCurriculares";
export const DashboardPage = () => {
  const handleExport = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/import-csv/import`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao exportar arquivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dados-dashboard.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Erro ao exportar arquivo");
    }
  };

  return (
    <>
      <Header />
      <div className="pt-20 p-12 bg-gray-100 min-h-screen">
        <PageHeader
          title="Dashboard"
          description="Visão geral do Sistema de Avaliação e Gerenciamento"
        />

        <FiltroAvaliacoes />

        <PageHeader
          title="Exportar Dados"
          description="Baixe todos os dados do dashboard em formato Excel"
          actionLabel="Exportar Excel"
          onActionClick={handleExport}
        />
        <DashboardResumo />
        <TabelaDesempenhoEscolas />
        <GraficoDesempenhoAvaliacoes />
        <div className="mt-6">
          <GraficoComponentesCurriculares />
        </div>
      </div>
    </>
  );
};
