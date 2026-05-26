"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function EssayEditor() {
  const [text, setText] = useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">محرّر مقال (نموذج)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب مقالك هنا…"
        />
        <p className="text-xs text-muted-foreground">سيتم إضافة أدوات تحسين الأسلوب لاحقاً.</p>
      </CardContent>
    </Card>
  );
}

