"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type AdminUserRow = {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "STUDENT";
};

export function AdminUsers({ users }: { users: AdminUserRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الاسم</TableHead>
          <TableHead>البريد</TableHead>
          <TableHead>الدور</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.fullName}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>
              <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>
                {u.role === "ADMIN" ? "مشرف" : "طالب"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

