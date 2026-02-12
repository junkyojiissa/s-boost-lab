import { client } from "@/lib/client";
import type { Article } from "@/types/article";
import type { MicroCMSQueries } from "microcms-js-sdk";

/**
 * 記事一覧を取得
 *
 * @param queries - microCMS クエリパラメータ (limit, offset, filters 等)
 *
 * microCMS の list 型 API を使用。
 * デフォルトで公開日の降順ソート。
 */
export async function getAllArticles(queries?: MicroCMSQueries) {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      orders: "-publishedAt",
      ...queries,
    },
  });

  return data;
}

/**
 * slug (= microCMS コンテンツ ID) から記事を1件取得
 *
 * @param slug - microCMS のコンテンツ ID
 */
export async function getArticleBySlug(slug: string) {
  const data = await client.getListDetail<Article>({
    endpoint: "articles",
    contentId: slug,
  });

  return data;
}
