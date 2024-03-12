export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-cyan-300 via-rose-300 to-orange-600">
      {children}
    </div>
  );
}
