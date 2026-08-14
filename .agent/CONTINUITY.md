# Continuity

## Current Goal
Astro + TypeScript で個人ホームページを構築し、GitHub Pages（https://mogeburg.github.io/ranikosan/）へ公開する。

## Current State
- Astro 7.0.7 でプロジェクトをゼロから構築済み。
- 単一ページ化完了（2026-08-13）: `/about/` `/otegaki/` を削除し、トップに全機能を統合。
  - hero(top.png 丸アバター 120px) → なにココ(+unnamed.png) → らにこさんとは(+SNSリンク) → 資料集 → おてがき
  - Navbar（ヘッダーナビ）は削除済み（2026-08-14）。`BaseLayout.container` の padding から Navbar 高さ分（3rem）を除去し、ナビ遷移はページ内スクロールのみ。`scroll-margin-top` も削除。
- トップ2カラム化（2026-08-13）: hero〜資料集を `#top` のグリッド（左:右 = 1:3）に再構成。
  - 左 = `ProfileCard.astro`（新規コンポーネント）: icon.png 丸アバター160px + 「らにこさんについて」本文 + SNS丸リンク + unnamed.png（SNS下）。見出しなし。
  - 右 = 資料集のみ（見出しなし）。なにココは削除。資料集グリッドは PC:3列 / SP:1列（現状維持）。
- 資料集3枚化＋シンプル化（2026-08-14）: raniko003「日常」を追加し3枚に。`object-fit: cover` でクリップ、illust-figure の背景・illust-img の背景を削除し枠線のみのシンプル表示。
- 資料集4枚化（2026-08-14）: raniko004「えちえちガールズ」を追加。PC/SP ともグリッド2列2行。
- 資料集コンポーネント化（2026-08-14）: index.astro にインラインだった資料集を `MaterialGrid.astro`（新規）に抽出。props で `{ src, alt, caption }[]` を受けるデータ駆動。モーダル起動JS（旧 `initIllustModal`）はコンポーネント内 `<script>` に移動し、ページスクリプトから削除。
  - デザイン刷新: タイルを surfaceカード（枠線1px・角丸なし・1/1正方形 cover）+ 下部左寄せキャプション。ホバーは brightness(0.85)、`:focus-visible` は accent 枠。角丸は一切不使用。
- 資料集タイルの高さを ProfileCard と合わせる試みは取り下げ（2026-08-14）: CSS Grid は行高 = 両カラムの max で決まるため、右タイルを左基準に一致させる flex 伸張は不安定。方針 A で正方形タイル（aspect-ratio 1/1）＋上部揃え（align-items: start）に回帰。伸張用の flex:1 / height:100% / grid-template-rows 1fr は削除。
  - ※ 以降、コンポーネント化時に 1/1 正方形を維持（3/4 は一時採用後に放棄、下記の Decisions 参照）。
  - SP(768px以下) は縦積み、順 = 画像→らにこさんについて→資料集（DOM順）。
  - `top.png` は削除（未使用化）。LCP は icon.png に `fetchpriority="high"` + `loading="eager"` を引き継ぎ。
- `npm run build` と `npm run check` がエラー0で通ることを確認済み。
- ファンアートデータを JSON に分離し、型定義のみ `.ts` に保持。
- `prefers-reduced-motion` 対応を追加。
- パフォーマンス改善完了:
  - 全画像を `public/` → `src/assets/` に移行し Astro の `<Image />` で自動 WebP 最適化
  - top.png: 112kB → 29kB、raniko002.png: 311kB → 71kB
  - LCP 画像に `fetchpriority="high"` + `loading="eager"` を設定
  - CSS をインライン化（`build.inlineStylesheets: 'always'`）
- おてがきカード複数画像対応（2026-07-26）:
  - `imagePath` → `imagePaths: string[]`、`image` → `images: ImageMetadata[]`
  - カード内に CSS scroll-snap ベースのカルーセルを実装（ボタン＋ドット＋タッチスワイプ）
  - 2枚目以降の画像は遅延読み込み
  - モーダルは全カード全画像をフラット連結して表示

## Decisions
- 単一ページ化: トップに全機能を統合。旧URL(`/about/`, `/otegaki/`)へのリダイレクトなし（404）。[USER]
- top.png: `width:120px` + `aspect-ratio:1/1` + `object-fit:cover` で真円（`border-radius:9999px`）。正方クロップは左右を切る中央寄せ。[USER][CODE]
- 2カラム（2026-08-13）: 左=プロフィールカード（surface背景+border+角丸・中央寄せ）/ 右=コンテンツ。列比 1:3、`#top` アンカーはグリッドのラッパー要素に付与。[USER][CODE]
- 資料集（2026-08-14）: `MaterialGrid.astro` が単一コンポーネントとして所有。グリッドは `repeat(auto-fit, minmax(180px, 1fr))`（SP 768px以下は2列固定）、タイルは 1/1 正方形 `object-fit: cover`。キャプションは画像下部にオーバーレイ（左下寄せ・下部40%の黒グラデーション rgba(0,0,0,0.75)→透明・白文字・`pointer-events:none`）。ホバー brightness(0.85)、`:focus-visible` accent 枠。モーダルは既存 `ImageModal` のグローバルAPIをそのまま利用（全枚フラット閲覧、モーダル内キャプションなし）。[USER][CODE]
  - ※ 当初 3/4 縦長で試したが縦幅が過大（約656px）→ユーザー指摘で 1/1 に回帰（約512px）。[USER]
- Navbar 削除（2026-08-14）: 単一ページ化の完了に伴い `Navbar.astro` を削除。`BaseLayout` の padding から Navbar 高さ分（3rem）を除去。[USER]
- スムーズスクロール: `global.css` に `prefers-reduced-motion: no-preference` 時のみ `scroll-behavior: smooth`。[CODE]
- スタック: Astro 7 + TypeScript（strict プリセット継承）。[CODE]
- スタイリング: Scoped CSS ＋ `src/styles/global.css` の CSS変数トークン。[CODE]
- コンポーネント: `BaseLayout` 単独構成（Header/Footer/Navbar は削除済み、相互リンクは各ページ本文に配置）。[CODE]
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
