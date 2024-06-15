import { Skeleton } from "@/components/ui/skeleton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage() {
  const { getUser, getOrganization } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <h2 className="text-4xl text-fuchsia-600">Ola {user.given_name}!</h2>
    </div>
  );
}
