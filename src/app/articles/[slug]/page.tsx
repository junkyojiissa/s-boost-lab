import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

/* ─── ISR: 60 秒ごとに再検証 ─── */
export const revalidate = 60;

/* ─── 静的パス生成 (SSG) ─── */
export async function generateStaticParams() {
  const { contents } = await getAllArticles({ limit: 100 });
  return contents.map((article) => ({ slug: article.id }));
}

/* ─── 動的 Metadata (SEO) ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    return {
      title: `${article.title} | S-Boost Lab`,
      description: article.description ?? "",
      openGraph: {
        title: article.title,
        description: article.description ?? "",
        images: article.coverImage ? [{ url: article.coverImage.url }] : [],
      },
    };
  } catch {
    return { title: "記事が見つかりません | S-Boost Lab" };
  }
}

/* ─── ページ本体 ─── */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  /** 日付フォーマット: "2026.02.10" */
  const formattedDate = new Date(article.publishedAt ?? article.createdAt)
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", ".");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ─── Navigation ─── */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-blue-600">
          S-Boost <span className="text-slate-400 text-sm font-normal">Lab</span>
        </Link>
        <div className="space-x-8 text-sm font-medium">
          <Link href="/#articles" className="hover:text-blue-600 transition">
            Articles
          </Link>
          <Link href="/#services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-600/25">
            公式LINEで相談
          </button>
        </div>
      </nav>

      {/* ─── Article Header ─── */}
      <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        {/* 戻るリンク */}
        <Link
          href="/#articles"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition mb-8"
        >
          <ArrowLeft size={16} />
          記事一覧に戻る
        </Link>

        {/* タグ */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* タイトル */}
        <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mb-4">
          {article.title}
        </h1>

        {/* 日付 */}
        <time
          dateTime={article.publishedAt}
          className="text-sm text-slate-500"
        >
          {formattedDate}
        </time>

        {/* アイキャッチ画像 */}
        <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-slate-200">
          {article.coverImage ? (
            <Image
              src={article.coverImage.url}
              alt={article.title}
              width={article.coverImage.width ?? 1200}
              height={article.coverImage.height ?? 630}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
          )}
        </div>
      </header>

      {/* ─── Article Body ─── */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        <article
          className="prose prose-slate prose-lg max-w-none
            prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-900 prose-pre:rounded-xl"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </main>

      {/* ─── Footer CTA ─── */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">
            採用DXのご相談はお気軽に
          </h2>
          <p className="text-slate-600 mb-8">
            公式LINEからいつでも無料でご相談いただけます。
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition">
            公式LINEで相談する
          </button>
        </div>
      </section>
    </div>
  );
}
