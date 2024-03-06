import MenuHeader from "../components/admin/MenuHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-2">
      <MenuHeader />
      <div className="my-3">{children}</div>
    </section>
  );
}
