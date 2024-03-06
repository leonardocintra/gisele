import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/services/auth";

export default async function AdminPage() {

  const session = await auth()

  return (
    <div className="flex justify-center">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Pedidos</div>
          <div className="stat-value">15</div>
          <div className="stat-desc">21% mais que o mes passado</div>
        </div>
      </div>

      <Avatar>
        <AvatarFallback>{session?.user?.email}</AvatarFallback>
      </Avatar>
    </div>
  );
}
