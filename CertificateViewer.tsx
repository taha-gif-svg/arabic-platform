"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CertificateViewer({
  title,
  number,
  issuedAt,
  downloadUrl,
}: {
  title: string;
  number: string;
  issuedAt: string;
  downloadUrl: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>{title}</CardTitle>
        <a href={downloadUrl}>
          <Button>تحميل PDF</Button>
        </a>
      </CardHeader>
      <CardContent className="space-y-2 text-muted-foreground">
        <div>رقم الشهادة: {number}</div>
        <div>تاريخ الإصدار: {issuedAt}</div>
      </CardContent>
    </Card>
  );
}

