# 重構專案為 Vite 靜態多頁面建構系統 (MPA)

此計劃旨在將專案重構為基於 **Vite** 的現代化多網頁建構系統（Multi-Page Application, MPA），同時保持既有的 GitHub Pages 靜態網站功能。

我們會採用 **「根目錄開發模式」**，也就是將 HTML 原始碼保留在根目錄與原先的子資料夾中，不需要大規模修改既有 HTML 中的相對路徑，但透過 `package.json` 與 `vite.config.js` 管理依賴，並藉由 **GitHub Actions** 自動化編譯與部署。

## 使用者審查項目

> [!IMPORTANT]
> 1. **Node.js 環境要求**：您需要在本機電腦上安裝 Node.js (推薦 v18 或更新版本) 以在本地運行開發伺服器。
> 2. **GitHub Actions 權限設定**：本專案需要建立 GitHub Actions 流程，請確保您的 GitHub 專案設定中，`Settings > Actions > General > Workflow permissions` 設定為 `Read and write permissions`，以便自動部署。

## 預期架構

重構後，專案將新增以下開發設定檔，其餘 HTML/JS/CSS 原始碼位置基本保持不變以避免路徑失效：

```text
empiretactics.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml       # [NEW] GitHub Actions 自動編譯與部署設定
├── package.json             # [NEW] 管理 Vite 與專案開發腳本
├── vite.config.js           # [NEW] Vite 多網頁入口與打包配置
├── .gitignore               # [MODIFY] 忽略 node_modules 與 dist 編譯產物
├── dist/                    # [AUTO-GENERATED] 打包後的純靜態網頁 (不提交至 Git)
└── (原有網頁檔案如 game/, tool/, soundweb/ 等保持位置不變)
```

---

## 提案變更

### 1. 專案設定檔

#### [NEW] [package.json](file:///y:/GitHub/empiretactics.github.io/package.json)
*   建立專案依賴管理與開發指令：
    *   `npm run dev`：啟動本地伺服器，支援即時預覽（HMR）。
    *   `npm run build`：將所有多頁面打包至 `dist/`。
    *   `npm run preview`：在本機預覽打包後的 `dist/` 靜態網頁。

#### [NEW] [vite.config.js](file:///y:/GitHub/empiretactics.github.io/vite.config.js)
*   配置 Vite 的 Rollup 打包選項，動態搜尋專案中所有的 `*.html` 檔案作為入口點，免去手動列出幾十個 HTML 的麻煩。
*   配置基底路徑 `base: './'` 以相容 GitHub Pages 的相對路徑解析。

#### [MODIFY] [.gitignore](file:///y:/GitHub/empiretactics.github.io/.gitignore)
*   新增忽略 `node_modules` 與打包生成的 `dist` 目錄。

---

### 2. CI/CD 自動化部署

#### [NEW] [deploy.yml](file:///y:/GitHub/empiretactics.github.io/.github/workflows/deploy.yml)
*   設定 GitHub Actions 自動化工作流：
    1.  當您推動代碼到 `main` 分支時自動觸發。
    2.  安裝 Node.js 與專案依賴。
    3.  執行 `npm run build` 打包。
    4.  自動將 `dist/` 中的產物部署至 `gh-pages` 分支以更新 GitHub Pages。

---

## 驗證與設定教學步驟

我們會教導您完成以下步驟：
1. **本地端初始化**：執行 `npm install` 安裝開發環境。
2. **本地開發測試**：啟動 `npm run dev` 測試本地端各網頁是否正常運行。
3. **本地編譯測試**：執行 `npm run build` 確認打包過程無誤。
4. **GitHub Pages 部署設定**：說明如何在 GitHub 倉庫中啟用 Actions 自動部署。
