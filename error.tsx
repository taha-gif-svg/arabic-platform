"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-10 space-y-3">
      <p className="font-semibold">تعذر تحميل الدرس.</p>
      <Button onClick={reset}>إعادة المحاولة</Button>
    </div>
  );
}

