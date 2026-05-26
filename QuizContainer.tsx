"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/exams/Timer";
import { MCQQuestion, type MCQ } from "@/components/exams/MCQQuestion";
import { WrittenQuestion } from "@/components/exams/WrittenQuestion";

export type QuizData = {
  examId: string;
  sectionSlug: string;
  title: string;
  timeLimit: number; // minutes
  questions: MCQ[];
};

export function QuizContainer({ quiz }: { quiz: QuizData }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const seconds = useMemo(() => quiz.timeLimit * 60, [quiz.timeLimit]);

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };

      const res = await fetch(`/api/exams/${quiz.examId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "تعذر إرسال الاختبار");
        return;
      }

      if (data.isPassed) toast.success("مبروك! لقد نجحت في الاختبار");
      else toast.error("للأسف لم تحقق درجة النجاح. يمكنك إعادة الاختبار.");

      router.push(`/exams/${quiz.sectionSlug}/results`);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }, [answers, quiz.examId, quiz.sectionSlug, router, submitting]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground text-sm">
            يجب الحصول على 60% على الأقل للنجاح.
          </p>
        </div>
        <div className="w-full md:w-80">
          <Timer seconds={seconds} onExpire={submit} />
        </div>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q) =>
          q.type === "MULTIPLE_CHOICE" ? (
            <MCQQuestion
              key={q.id}
              q={q}
              value={answers[q.id] ?? ""}
              onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            />
          ) : (
            <WrittenQuestion
              key={q.id}
              q={q}
              value={answers[q.id] ?? ""}
              onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
            />
          ),
        )}
      </div>

      <div className="sticky bottom-3 bg-background/80 backdrop-blur border rounded-lg p-3 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          تمّت الإجابة على {Object.keys(answers).length} / {quiz.questions.length}
        </div>
        <Button onClick={submit} disabled={submitting}>
          إرسال الاختبار
        </Button>
      </div>
    </div>
  );
}
