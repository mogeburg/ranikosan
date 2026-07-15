# Current Goal
- 2026-07-15T16:20:00+09:00 [USER] GitHub Pages 向けの React + TypeScript 静的サイトを作成し、`/` と `/otegaki` を要件どおり実装する

# Current State
- 2026-07-15T16:20:00+09:00 [CODE] リポジトリには `otegaki` 画像のみ存在し、アプリ基盤は未作成
- 2026-07-15T16:29:00+09:00 [TOOL] React + TypeScript + Vite の multi-page 構成を追加し、`npm run build` が成功
- 2026-07-15T21:55:00+09:00 [CODE] GitHub Pages を `main` push で自動公開する GitHub Actions workflow を追加

# Decisions
- 2026-07-15T16:20:00+09:00 [USER] GitHub Pages 向けに SPA ではなく multi-page の静的構成にする
- 2026-07-15T16:20:00+09:00 [USER] メタデータは単一ファイルで管理する
- 2026-07-15T16:20:00+09:00 [USER] URL 判定は YouTube / X のみ特別扱いする
- 2026-07-15T16:20:00+09:00 [USER] タグ絞り込み状態は URL に持たない
- 2026-07-15T16:20:00+09:00 [USER] 関連URLがある場合、キャプションの `◯◯` 部分はリンクにする
- 2026-07-15T21:55:00+09:00 [USER] 一番楽な公開方法として GitHub Actions で GitHub Pages へ自動デプロイする

# Open Issues
- 2026-07-15T16:20:00+09:00 [UNCONFIRMED] 各ファンアートの author / relatedUrl / tags の実データが未提供
