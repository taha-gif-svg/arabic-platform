"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const { data } = useSession();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between gap-3 py-3">
        <Link href="/" className="font-bold text-lg text-[#1e3a5f] dark:text-[#c9a227]">
          منصة اللغة العربية
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {data?.user ? (
            <>
              <Link href={data.user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/student"}>
                <Button variant="secondary">لوحة التحكم</Button>
              </Link>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button>تسجيل الدخول</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

