import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/gisele/admin-page-base";

export default function AdminPage() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Pedidos</DashboardPageHeaderTitle>
      </DashboardPageHeader>

      <DashboardPageMain>
        <h2>Pedidos</h2>
      </DashboardPageMain>
    </DashboardPage>
  );
}
