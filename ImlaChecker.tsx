"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function ImlaChecker() {
  const [text, setText] = useState("");

  const hints = useMemo(() => {
    const issues: string[] = [];
    if (text.includes("ان شاء الله")) issues.push("الأفضل: «إن شاء الله» (همزة قطع)");
    if (text.includes("مسوؤل")) issues.push("الأفضل: «مسؤول» (واو بعد الهمزة)");
    return issues;
  }, [text]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">مدقّق إملائي (نموذج)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="اكتب نصاً لفحصه…" />
        {hints.length === 0 ? (
          <p className="text-sm text-muted-foreground">لا توجد ملاحظات حالياً.</p>
        ) : (
          <ul className="list-disc pr-5 text-sm text-muted-foreground space-y-1">
            {hints.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

