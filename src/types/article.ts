import type { MicroCMSImage, MicroCMSDate } from "microcms-js-sdk";

/**
 * microCMS 記事スキーマの型定義
 *
 * microCMS 管理画面で作成する API スキーマ (api名: "articles"):
 *   - title        : テキストフィールド
 *   - body         : リッチエディタ
 *   - description  : テキストエリア (任意)
 *   - coverImage   : 画像
 *   - tags         : 複数コンテンツ参照 → Tag API、またはセレクトフィールド(リスト)
 *
 * ※ id / createdAt / updatedAt / publishedAt / revisedAt は
 *   microCMS が自動付与するため MicroCMSDate で取得できます。
 *   slug として microCMS の「コンテンツID (id)」をそのまま使用します。
 */

/** タグ (別 API で管理する場合) */
export type Tag = {
  /** microCMS コンテンツ ID */
  id: string;
  /** タグ名 */
  name: string;
} & MicroCMSDate;

/** 記事データ */
export type Article = {
  /** microCMS コンテンツ ID — URL スラッグとして使用 */
  id: string;
  /** 記事タイトル */
  title: string;
  /** 記事本文 (HTML 文字列) — リッチエディタ出力 */
  body: string;
  /** アイキャッチ画像 */
  coverImage?: MicroCMSImage;
  /** タグ一覧 (コンテンツ参照の場合) */
  tags?: Tag[];
  /** 記事の要約 / description (SEO 用) */
  description?: string;
} & MicroCMSDate;
