import { createClient } from "microcms-js-sdk";

/**
 * microCMS クライアント
 *
 * 必要な環境変数 (.env.local):
 *   MICROCMS_SERVICE_DOMAIN=your-service-id   ← https://<ここ>.microcms.io
 *   MICROCMS_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
