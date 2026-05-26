import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex flex-1 flex-col gap-6 py-6 md:flex-row">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

