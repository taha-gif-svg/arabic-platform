"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type MCQ = {
  id: string;
  type: string;
  question: string;
  options: string[];
  order: number;
};

export function MCQQuestion({
  q,
  value,
  onChange,
}: {
  q: MCQ;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {q.order}. {q.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {q.options.map((opt, idx) => {
          const id = `${q.id}-${idx}`;
          return (
            <label key={id} htmlFor={id} className="flex cursor-pointer items-start gap-2 rounded-md border p-3 hover:bg-muted">
              <input
                id={id}
                type="radio"
                name={q.id}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="mt-1"
              />
              <Label htmlFor={id} className="cursor-pointer leading-6">
                {opt}
              </Label>
            </label>
          );
        })}
      </CardContent>
    </Card>
  );
}
