import { auth } from "@/services/auth";
import UserInfo from "./user/_components/user-info";

export default async function AdminPage() {

  const session = await auth()

  return (
    <div className="flex justify-center">
      <UserInfo user={session?.user} />
    </div>
  );
}
