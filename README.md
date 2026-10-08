# 知らないと損する、日本の暮らし。

### くらしの判断帖 — Japan Life Playbook

[![知らないと損する、日本の暮らし。](docs/share-cover.png)](https://gerrygao1995-coder.github.io/japan-life-playbook/)

**知って、選んで、少しよく。**

日本で暮らす人のための、根拠と手順が見える生活ガイド。48テーマ・768件の実践ガイド・24の場面別行動プランを、日本の公的機関などの一次資料をもとにまとめました。

第2版：2026年10月9日。本文・UIともに日本語。アカウント登録、サーバー、外部サービスへの接続は不要です。

> AIを使って調査・編集した第2版です。独立した専門家による全件監修は未実施です。制度の金額・要件・期限は、利用時に原資料と窓口で確認してください。公式情報の自動監視は行っていません。

## 読む

**[ブラウザーで読む →](https://gerrygao1995-coder.github.io/japan-life-playbook/)**

役に立ったら、Starで手元に。誰かに渡すなら、必要な記事のリンクを。原資料を添えた訂正・追加も歓迎します。

- [章ごとに全文を読む](book/README.md)
- [電子書籍（EPUB）をダウンロード](https://gerrygao1995-coder.github.io/japan-life-playbook/kurashi.epub)
- [全編Markdownをダウンロード](https://gerrygao1995-coder.github.io/japan-life-playbook/GUIDE.md)
- [場面別の行動プラン](docs/SCENARIOS.md)
- [出典一覧](docs/SOURCES.md)
- [編集方針・確認方法](docs/EDITORIAL.md)
- [第2版の検証記録と確認範囲](docs/QUALITY.md)
- [変更履歴](CHANGELOG.md)
- [紹介文・共有素材の使い方](docs/SHARE.md)
- オフラインで読む：`dist/kurashi-offline.html` をブラウザーで開く
- 印刷・PDF保存：サイトの「全編を印刷・PDFに」から、印刷先をPDFに設定

## 特徴

- **最初の一歩を選べる：** 関心・時間・費用から候補を探す「暮らしの点検」と「今日の一手」。
- **人に渡せる：** 記事ごとの独立ページ、1200×630の共有カード、EPUB電子書籍。
- **具体的な行動へ：** 要点、対象、費用、着手時間、便益、3段階以上の手順、注意点、原資料、確認日を各記事に掲載。
- **根拠を取り違えない：** 公的制度・公的推奨・編集提案を区別。「おすすめ順」は編集判断であり、科学的な証拠ランクとは別。
- **困りごとから探せる：** 48テーマ、全文検索、費用・時間・根拠・対象による絞り込み、場面別の行動順。
- **自分の手帳にできる：** しおり、完了チェック、個人メモを端末内に保存。JSONで書き出し・取り込み。
- **持ち運べる：** 全機能を含むオフライン単一HTML、逐章Markdown、全編Markdown、印刷用レイアウト。
- **読みやすく：** スマートフォン対応、明暗切替、キーボード操作、カード・一覧表示、記事への直接リンク。

## GitHubへアップロードして公開する

1. このフォルダーの中身をGitHubリポジトリのルートへアップロードします。ZIPファイルのまま置くのではなく、解凍した中身を置いてください。`.github` も含めます。
2. リポジトリの **Settings → Pages → Build and deployment → Source** で **GitHub Actions** を選択します。
3. **Actions → Deploy guide to GitHub Pages → Run workflow** を実行します。`main` または `master` への以降のpushでも更新されます。
4. ワークフローが成功したら、Pagesに表示されるURLを開きます。一般的には `https://ユーザー名.github.io/リポジトリ名/` です。

この配布版には生成済みの `dist/` も含みます。公開は `dist/` をそのまま配信する構成です。GitHubアカウント・リポジトリの設定によってPagesを利用できる条件は異なります。詳細は[GitHub公式ドキュメント](https://docs.github.com/ja/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)を参照してください。

このリポジトリの管理用に、ルートの `kurashi-no-handancho-github.zip` を更新すると原稿とコードを検証・展開する補助ワークフローも含めています。通常の編集はJSONとコードを変更してコミットしてください。ZIP内のワークフローファイル自体は自動で上書きせず、GitHub上で別途レビューして更新する構成です。

## ローカルで編集する

Node.js 22以降を使用します。外部パッケージのインストールはありません。

```sh
npm run build
npm run check
npm run preview
```

`http://127.0.0.1:4173` を開きます。終了は `Ctrl+C`。

公開先URLは `site.config.json` に設定します。フォークして別の場所で公開するときは、このURLも変更してください。

本文は `content/health.json`、`content/money.json`、`content/life.json` で編集します。見た目は `style.css`、挙動は `app.js` と `enhancements.js`、骨格は `index.template.html`。ビルドするとウェブ版、独立した記事ページ、オフライン版、EPUB、逐章Markdown、全編Markdown、出典一覧が同じデータから生成されます。本文の訂正はMarkdownだけでなくJSONに反映し、ビルドを実行してください。

配布ZIPは、ビルドとチェックの後に `node scripts/package.mjs` で作成します。既定の出力先は `release/`。ZIPとEPUBの作成にも外部パッケージは不要です。

## ファイル構成

```text
GUIDE.md                 全編の日本語ガイド
book/                    48章のMarkdown
content/                 構造化された原稿データ
docs/                    出典・場面別ガイド・編集方針
dist/                    公開用サイト・オフライン版・データ
scripts/                 ビルド・整合性チェック・プレビュー
.github/workflows/       GitHub Pages公開設定
.github/ISSUE_TEMPLATE/  訂正・追加提案テンプレート
index.template.html      ページの骨格
style.css                デザイン
app.js                   ブラウザー内の機能
```

## 内容の訂正・追加

制度変更や誤りを見つけた場合は、記事ID、根拠となる公式URL、変更内容を添えてIssueまたはPull Requestで知らせてください。[CONTRIBUTING.md](CONTRIBUTING.md)に確認基準と更新手順をまとめています。給付金額・期限・健康効果を、出典なしに追加しないでください。

## 着想元とライセンス

生活上の行動をコスト・便益・根拠から見直す構成は、eternity4719氏の [HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) から着想を得ています。日本向けの本文と実装は独自に作成しており、原文やコードの複製・翻訳ではありません。原プロジェクトの本文はCC BY 4.0で公開されています。

- このプロジェクトの独自本文：**CC BY 4.0**（[LICENSE-CONTENT](LICENSE-CONTENT)）
- このプロジェクトの独自コード：**MIT**（[LICENSE-CODE](LICENSE-CODE)）
- 参照先の公式文書：各発行元の権利・利用条件に従います。

企画：Gerry。調査・構成・本文・実装：AIを用いた制作。政府機関による公式発行物ではありません。
