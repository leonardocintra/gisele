import MenuHeader from "../components/admin/MenuHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="p-2">
      <MenuHeader />
      <div className="mt-3">{children}</div>
    </section>
  );
}
