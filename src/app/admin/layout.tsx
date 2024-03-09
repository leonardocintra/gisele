import { PropsWithChildren } from "react";
import MainSidebar from "./_components/main-sidebar";

export default function AdminLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[16rem_1fr]">
      <MainSidebar />

      <div className="py-4">
        {children}
      </div>

    </div>
  );
}
