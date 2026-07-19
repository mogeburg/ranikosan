# Continuity

## Current Goal
Astro + TypeScript で個人ホームページを構築し、GitHub Pages（https://mogeburg.github.io/ranikosan/）へ公開する。

## Current State
- Astro 7.0.9 でプロジェクトをゼロから構築済み。
- TOP(`/`) と おてがき(`/otegaki`) の2ページが完成（2026-07-19 おてがきギャラリー実装）。
- `npm run build` と `npm run check` がエラー0で通ることを確認済み（2026-07-19）。

## Decisions
- スタック: Astro 7 + TypeScript（strict プリセット継承）。[CODE]
- スタイリング: Scoped CSS ＋ `src/styles/global.css` の CSS変数トークン。[CODE]
- コンポーネント: `BaseLayout` 単独構成（Header/Footer は削除済み、相互リンクは各ページ本文に配置）。[CODE]
- 公開設定: `base: '/ranikosan'`、`site: 'https://mogeburg.github.io'`。[CODE]
- 内部リンクは `import.meta.env.BASE_URL` を使用。[CODE]
- デプロイ: `.github/workflows/deploy.yml`（push main で自動ビルド＋Pages 公開）。[CODE]
- フォント: システムゴシックスタック。SP/PC はメディアクエリ(768px)。ダークテーマは `prefers-color-scheme`。[CODE]
- おてがきギャラリー: `src/data/fanarts.ts` をデータソースとし、`FanartCard` + `FanartGrid` の2コンポーネント構成。画像は `public/images/fanart/` に格納。タグフィルター・センシティブ切替（localStorage永続化）を実装。[CODE]

## Open Issues
- GitHub Actions の初回実行後、リポジトリの Pages 設定を "GitHub Actions" ソースに切り替える必要がある（ユーザー作業）。
- 実名表記「らにこさん」は仮のまま（要確認）。
- `/images/` ディレクトリに元画像が残っている。整理する場合は手動削除。
