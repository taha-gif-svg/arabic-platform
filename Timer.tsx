"use client";

import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function Timer({
  seconds,
  onExpire,
}: {
  seconds: number;
  onExpire: () => void;
}) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (left <= 0) return;
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [left]);

  useEffect(() => {
    if (left === 0) onExpire();
  }, [left, onExpire]);

  const mmss = useMemo(() => {
    const m = Math.floor(left / 60);
    const s = left % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }, [left]);

  const pct = seconds === 0 ? 0 : (left / seconds) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">المتبقي</span>
        <span className="font-semibold tabular-nums">{mmss}</span>
      </div>
      <Progress value={pct} />
    </div>
  );
}

