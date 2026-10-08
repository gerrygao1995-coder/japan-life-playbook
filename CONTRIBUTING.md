# 訂正・追加への参加

## 訂正を提案する

記事ID（例：health-01）、現在の記述、修正案、根拠となる公式URLを記載してください。個人情報をIssueに書かないでください。

## 原稿データ

記事は `content/*.json` 内の `articles` に格納します。記事IDは公開後に変更しません。ブックマークと直接リンクがIDを参照しています。

必須項目：id、category、title、summary、audience、cost、time、evidence、priority、benefit、steps、cautions、sources、checked、tags。

- `cost`：無料 / 費用あり / 条件による
- `time`：5分 / 15分 / 30分 / 継続
- `evidence`：公的制度 / 公的推奨 / 編集提案
- `priority`：1 / 2 / 3（編集順の目安）
- `sources`：title、url、publisherを持つ配列。原資料を実際に確認すること。
- `checked`：実際に確認した日。ビルド時に一律に更新しないこと。

READMEの件数はビルド時に原稿データから更新されます。分野を追加する場合は `enhancements.js` の関心テーマとの対応も見直してください。公開先と版番号は `site.config.json` で管理します。

## 更新手順

1. 原資料と適用時点を確認。
2. JSONに記述を反映し、確認日を更新。
3. `npm run build` → `npm run check`。
4. `npm run preview` で検索、記事表示、公式リンク、スマートフォン表示を確認。
5. `CHANGELOG.md` に変更を記載。
6. 生成された `book/`、`GUIDE.md`、`docs/`、`dist/` も合わせてコミット。

断定が難しい箇所は推測で埋めず、何をどこで確認すべきかを書いてください。個別助言や数値の効果を追加する場合は、その対象者と限界も記載してください。
