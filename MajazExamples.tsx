"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MajazExamples() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">أمثلة المجاز (نموذج)</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground leading-7 space-y-2">
        <div>• مجاز عقلي: «بنى الأمير المدينة» (البناء للأمير مجازاً والفاعل الحقيقي العمال).</div>
        <div>• مجاز لغوي: «رأيت أسداً» يقصد به الرجل الشجاع.</div>
      </CardContent>
    </Card>
  );
}

