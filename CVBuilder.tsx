"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CVBuilder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">منشئ سيرة ذاتية (نموذج)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>الاسم</Label>
          <Input placeholder="اسمك الكامل" />
        </div>
        <div className="space-y-2">
          <Label>البريد</Label>
          <Input placeholder="example@mail.com" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>الخبرات</Label>
          <Input placeholder="ملخص سريع…" />
        </div>
      </CardContent>
    </Card>
  );
}

