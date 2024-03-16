import MenuHeader from "../components/admin/MenuHeader";

export default function AdminPage() {
  return (
    <div>
      
      <MenuHeader />
      
      <div className="flex justify-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Pedidos</div>
            <div className="stat-value">15</div>
            <div className="stat-desc">21% mais que o mes passado</div>
          </div>
        </div>
      </div>
    </div>
  );
}
