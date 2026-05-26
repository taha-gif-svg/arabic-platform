"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type WrittenQ = {
  id: string;
  question: string;
  order: number;
  type: string;
};

export function WrittenQuestion({
  q,
  value,
  onChange,
}: {
  q: WrittenQ;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {q.order}. {q.question}{" "}
          <span className="text-xs text-muted-foreground">({q.type})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor={q.id}>إجابتك</Label>
        <Textarea
          id={q.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="اكتب الإجابة هنا…"
        />
      </CardContent>
    </Card>
  );
}

