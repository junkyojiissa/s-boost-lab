import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-slate-50 pb-20">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-blue-600">
          S-Boost <span className="text-slate-400 text-sm font-normal">Lab</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition">
          <ArrowLeft size={16} /> Back to Top
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 pt-16">
        {article.coverImage && (
          <img src={article.coverImage.url} alt={article.title} className="w-full aspect-video object-cover rounded-2xl mb-10 shadow-lg" />
        )}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight text-slate-900">{article.title}</h1>
        <div className="prose prose-slate prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </article>
  );
}