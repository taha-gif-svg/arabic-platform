"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressChart({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={Math.max(0, Math.min(100, value))} />
        <div className="text-xs text-muted-foreground">{value.toFixed(1)}%</div>
      </CardContent>
    </Card>
  );
}

