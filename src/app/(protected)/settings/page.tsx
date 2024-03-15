import { auth, signOut } from "@/services/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button className="bg-red-400 p-4 rounded-lg px-10" type="submit">Sair</button>
      </form>
    </div>
  );
};

export default SettingsPage;
