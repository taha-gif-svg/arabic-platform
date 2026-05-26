"use client";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} منصة اللغة العربية
      </div>
    </footer>
  );
}

