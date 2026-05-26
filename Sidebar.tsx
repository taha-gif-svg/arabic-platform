"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const Item = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 text-sm hover:bg-muted",
        active && "bg-muted font-semibold",
      )}
    >
      {label}
    </Link>
  );
};

export function Sidebar() {
  const { data } = useSession();
  const role = data?.user?.role;

  return (
    <aside className="w-full md:w-64 border rounded-lg p-3 bg-card h-fit">
      <div className="mb-2 text-sm text-muted-foreground">القائمة</div>
      <nav className="space-y-1">
        <Item href="/" label="الرئيسية" />
        {role !== "ADMIN" && <Item href="/dashboard/student" label="لوحة الطالب" />}
        {role === "ADMIN" && <Item href="/dashboard/admin" label="لوحة المشرف" />}
      </nav>
    </aside>
  );
}

