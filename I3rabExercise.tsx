"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function I3rabExercise({ prompt }: { prompt: string }) {
  const [answer, setAnswer] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">تمرين إعراب</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{prompt}</p>
        <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} />
        <Button
          variant="secondary"
          onClick={() => toast.message("تم حفظ إجابتك (نموذج أولي)")}
        >
          حفظ
        </Button>
      </CardContent>
    </Card>
  );
}

