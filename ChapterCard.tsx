"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChapterCard({
  title,
  description,
  href,
}: {
  title: string;
  description?: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="hover:bg-muted transition-colors">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        {description && <CardContent className="text-sm text-muted-foreground">{description}</CardContent>}
      </Card>
    </Link>
  );
}

