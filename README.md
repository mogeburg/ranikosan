# ranikosan

GitHub Pages 向けの静的サイトです。

## 公開方法

1. GitHub リポジトリの `Settings > Pages > Build and deployment` を開く
2. `Source` を `GitHub Actions` にする
3. `main` ブランチへ push する

これで GitHub Actions が `npm ci` と `npm run build` を実行し、`dist/` を GitHub Pages に自動デプロイします。
