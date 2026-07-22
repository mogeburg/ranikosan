# Continuity

## Current Goal
Astro + TypeScript で個人ホームページを構築し、GitHub Pages（https://mogeburg.github.io/ranikosan/）へ公開する。

## Current State
- Astro 7.0.9 でプロジェクトをゼロから構築済み。
- TOP(`/`) と おてがき(`/otegaki`) の2ページが完成（2026-07-19 おてがきギャラリー実装）。
- `npm run build` と `npm run check` がエラー0で通ることを確認済み（2026-07-19）。
- ファンアートデータを JSON に分離し、型定義のみ `.ts` に保持（2026-07-19）。
- `prefers-reduced-motion` 対応を追加（2026-07-19）。
- パフォーマンス改善完了（2026-07-22）:
  - 全画像を `public/` → `src/assets/` に移行し Astro の `<Image />` で自動 WebP 最適化
  - top.png: 112kB → 29kB（74%削減）、raniko002.png: 311kB → 71kB（77%削減）
  - LCP 画像に `fetchpriority="high"` + `loading="eager"` を設定
  - CSS をインライン化（`build.inlineStylesheets: 'always'`）

## Decisions
- スタック: Astro 7 + TypeScript（strict プリセット継承）。[CODE]
- スタイリング: Scoped CSS ＋ `src/styles/global.css` の CSS変数トークン。[CODE]
- コンポーネント: `BaseLayout` 単独構成（Header/Footer は削除済み、相互リンクは各ページ本文に配置）。[CODE]
- 公開設定: `base: '/ranikosan'`、`site: 'https://mogeburg.github.io'`。[CODE]
- 内部リンクは `import.meta.env.BASE_URL` を使用。[CODE]
- デプロイ: `.github/workflows/deploy.yml`（push main で自動ビルド＋Pages 公開）。[CODE]
- フォント: システムゴシックスタック。SP/PC はメディアクエリ(768px)。ダークテーマは `prefers-color-scheme`。[CODE]
- おてがきギャラリー: `src/data/fanarts.ts`（型定義＋`import.meta.glob` で画像 import）＋`src/data/fanarts.json`（データ）をデータソースとし、`FanartCard` + `FanartGrid` の2コンポーネント構成。画像は `src/assets/images/fanart/` に格納し `<Image />` で最適化。タグフィルター・センシティブ切替（localStorage永続化）を実装。[CODE]
- `prefers-reduced-motion` 対応: CSS変数 `--transition-fast` を `0s` に上書き。`global.css` に実装。[CODE]
- 画像最適化: Astro 組み込み `<Image />` コンポーネントを使用。静的画像は直接 import、ファンアートは `import.meta.glob` で一括 import。[CODE]
- CSS インライン化: `astro.config.mjs` で `build.inlineStylesheets: 'always'` に設定。[CODE]

## Open Issues
- GitHub Actions の初回実行後、リポジトリの Pages 設定を "GitHub Actions" ソースに切り替える必要がある（ユーザー作業）。
- 実名表記「らにこさん」は仮のまま（要確認）。
- `public/favicon.ico`（185KB）が大きい。ICO→SVG/PNG への変換が望ましい。
