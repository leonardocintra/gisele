import { auth } from "@/services/auth";
import UserInfo from "./user/_components/user-info";

export default async function AdminPage() {

  const session = await auth()

  return (
    <div className="">
      <UserInfo user={session?.user} />
    </div>
  );
}
