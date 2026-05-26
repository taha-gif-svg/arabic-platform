"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TashbeehDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">عرض التشبيه (نموذج)</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground leading-7">
        مثال: <span className="font-semibold">العلم كالنور</span> (المشبّه: العلم، المشبّه به:
        النور، الأداة: الكاف، وجه الشبه: الإيضاح).
      </CardContent>
    </Card>
  );
}

