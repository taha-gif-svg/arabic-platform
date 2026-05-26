import nextDynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const LessonViewer = nextDynamic(
  () => import("@/components/writing/LessonViewer").then((m) => m.LessonViewer),
  { loading: () => <p className="text-muted-foreground">جاري تحميل الدرس…</p> },
);

export async function generateMetadata({ params }: { params: { chapter: string } }) {
  return {
    title: `الإنشاء والإملاء - ${decodeURIComponent(params.chapter)} | منصة اللغة العربية`,
  };
}

export default async function WritingChapterPage({ params }: { params: { chapter: string } }) {
  const section = await prisma.section.findUnique({
    where: { slug: "writing" },
    include: { chapters: { where: { isPublished: true }, orderBy: { order: "asc" } } },
  });
  if (!section) notFound();

  const chapter = section.chapters.find((c) => c.slug === params.chapter);
  if (!chapter) notFound();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>فنون الإنشاء والإملاء</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {section.chapters.map((c) => (
            <Link
              key={c.id}
              href={`/learning/writing/${c.slug}`}
              className={`text-sm underline ${c.id === chapter.id ? "font-bold" : ""}`}
            >
              {c.title}
            </Link>
          ))}
        </CardContent>
      </Card>

      <LessonViewer chapterId={chapter.id} title={chapter.title} content={chapter.content} />
    </div>
  );
}
