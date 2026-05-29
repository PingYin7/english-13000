# 13000 English Pass Trainer

面向四川自考 `13000 英语（专升本）` 的轻量 PWA 学习工具。

## 本地预览

```powershell
cd D:\EnglishStudy\app
node server.js
```

电脑访问：

```text
http://127.0.0.1:5173
```

手机和电脑在同一个 Wi-Fi 时，用电脑 WLAN 地址访问，例如：

```text
http://192.168.0.58:5173
```

## GitHub Pages 部署

本仓库已包含 GitHub Pages Actions 工作流：

```text
.github/workflows/deploy-pages.yml
```

把代码推送到 GitHub 的 `main` 分支后，在仓库 Settings -> Pages 中把 Source 设为 GitHub Actions，即可自动部署 `app/` 目录。
