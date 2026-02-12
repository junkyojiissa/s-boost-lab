import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Bot, Users, ArrowRight } from "lucide-react";
import { getAllArticles } from "@/lib/articles";

/* ─── ISR: 60 秒ごとに再検証 ─── */
export const revalidate = 60;

export default async function Home() {
  const { contents: articles } = await getAllArticles({ limit: 9 });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ─── Navigation ─── */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="text-2xl font-bold tracking-tighter text-blue-600">
          S-Boost{" "}
          <span className="text-slate-400 text-sm font-normal">Lab</span>
        </div>
        <div className="space-x-8 text-sm font-medium">
          <a href="#articles" className="hover:text-blue-600 transition">
            Articles
          </a>
          <a href="#services" className="hover:text-blue-600 transition">
            Services
          </a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-600/25">
            公式LINEで相談
          </button>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <header className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />
        <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

        <div className="relative px-8 py-24 md:py-32 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            採用支援 × 公式LINE × AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              次世代の採用DX
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            労働力不足の時代に、自動化で「勝てる採用」を実現する。
            <br className="hidden md:block" />
            実務経験に基づいた最新のノウハウを公開中。
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#articles"
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-900/25"
            >
              記事を読む <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* ─── Services Section ─── */}
      <section id="services" className="px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <Users className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">採用支援 (RPO)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              戦略設計から実行まで。現場に即した泥臭い支援で母集団形成を加速させます。
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <MessageSquare className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">公式LINE運用</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              応募者とのコミュニケーションをLステップ等で自動化。歩留まりを劇的に改善します。
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <Bot className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">AIチャットボット</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Claude/GPTを活用したカスタムボット構築。24時間365日の一次対応を実現。
            </p>
          </div>
        </div>
      </section>

      {/* ─── Article Grid Preview ─── */}
      <section id="articles" className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const date = new Date(article.publishedAt ?? article.createdAt)
                .toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replaceAll("/", ".");

              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className="group rounded-2xl bg-white border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition duration-300"
                >
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage.url}
                        alt={article.title}
                        width={article.coverImage.width ?? 600}
                        height={article.coverImage.height ?? 338}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 group-hover:scale-105 transition duration-300" />
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold group-hover:text-blue-600 transition leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-slate-500 text-sm mt-3">
                      {date}
                      {article.tags &&
                        article.tags.length > 0 &&
                        ` | ${article.tags.map((t) => `#${t.name}`).join(" ")}`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
