# AI 開發流程全紀錄與隱私安全檢查指南

本文件記錄了 AI 助理 (Antigravity) 在本專案中的所有重構與修改歷程，並制定了「推送前隱私與個人資訊檢查規範」，以確保專案程式碼的安全性。

---

## 🛡️ 推送前隱私與安全檢查規範 (Pre-push Privacy Checklist)

為避免將個人隱私資訊（例如：Twitch 金鑰、Cookie、個人電腦路徑、帳號密碼等）誤推送到公開的 GitHub 倉庫，每次執行 `git push` 前，AI 助理與開發者必須進行以下檢查：

### 1. 檢查清單 (Checklist)
- [ ] **無 Cookie / Auth Token 殘留**：特別是 `tool/twitch_auto_comment.html` 與 `twitch_auto_sign.html` 等涉及 Twitch 聊天室發言的工具，必須確認 `<input id="TACmyid">` 等輸入框的 `value` 屬性中，**沒有預填任何實體 token 或密碼**。
- [ ] **無硬編碼個人帳號**：檢查是否包含實體 Twitch 帳號、Gmail 帳號或其他個人社群 ID。
- [ ] **無本機絕對路徑**：檢查程式碼與設定檔中是否殘留如 `C:\Users\user\...` 或 `Y:\GitHub\...` 等本地端實體路徑。所有路徑必須為相對路徑（如 `./` 或 `../`）或動態解析路徑。
- [ ] **無敏感設定檔被追蹤**：確認 `.env`、個人測試用的 `.txt`、`.json` 檔案均在 `.gitignore` 中被正確忽略，未被 staged 進 Git。

### 2. 檢查方法 (How We Check)
在每次 push 之前，AI 助理會透過 `git diff --cached` 或是 grep 搜尋，掃描是否有包含敏感詞彙（例如 `auth-token`、`cookie`、`user.DESKTOP`、`password` 等），確認無誤後始執行推送。

---

## 📜 專案重構與開發流程全紀錄 (Development History)

### 🗓️ 2026-05-23 | 專案底層現代化重構 (方案二：Vite 多網頁打包)
*   **目標**：將傳統純靜態的專案，導入現代化前端打包機制，以支援高效率的開發伺服器（熱更新）與 GitHub Actions 自動化部署，同時不破壞現有的網址路徑（Root-level MPA）。
*   **新增與修改檔案**：
    *   [package.json](file:///y:/GitHub/empiretactics.github.io/package.json)：定義專案依賴（`vite`）與指令（`dev`、`build`、`preview`）。
    *   [vite.config.js](file:///y:/GitHub/empiretactics.github.io/vite.config.js)：
        *   編寫遞迴演算法，自動搜尋專案內所有 `.html` 作為打包進入點。
        *   設計 `copy-static-assets` 自訂插件，解決動態 fetch 資源（如音效檔 `5MA.mp3`、`sound_test.txt`）不會被 Vite 自動打包的痛點。
    *   [.github/workflows/deploy.yml](file:///y:/GitHub/empiretactics.github.io/.github/workflows/deploy.yml)：設定 CI/CD 工作流。當 `main` 或開發分支 push 時，GitHub 會自動打包 `dist` 並部署至 `gh-pages` 分支。
    *   [.gitignore](file:///y:/GitHub/empiretactics.github.io/.gitignore)：忽略 `node_modules/` 與 `dist/`。

### 🗓️ 2026-05-23 | 統一全站網頁頁尾 (Footer) 模組化
*   **目標**：將專案中所有小工具與遊戲頁面的靜態 HTML 頁尾，統一為由 `footer.js` 動態產生的標準化頁尾。
*   **重大重構點**：
    *   **改良路徑解析**：修改 [src/js/footer.js](file:///y:/GitHub/empiretactics.github.io/src/js/footer.js)，改用 `document.currentScript.src` 動態偵測載入腳本的絕對網址，藉此替換載入 `footer.css` 的路徑。這樣做能讓 **任何層級深度** 的網頁都共用同一個 `footer.js` 而不發生樣式斷裂。
    *   **批量更新 26 個 HTML**：
        將所有 HTML 的 `<div id="footer">...</div>` 統一為清空標籤，並在 `</body>` 前依據各檔案的目錄深度，引入對應相對路徑的 `footer.js`（例如 `src/js/footer.js`、`../src/js/footer.js` 等）。
*   **變更分支**：推送到本地與遠端的 `ai` 分支。

---

## 📂 文件目錄結構說明 (Docs Folder)
專案的 `docs/` 目錄下存放著所有 AI 與您的溝通紀錄與設計手冊：
*   [deploy_guide.md](file:///y:/GitHub/empiretactics.github.io/docs/deploy_guide.md) — Node.js 安裝與 GitHub Pages 部署指南。
*   [vibe_log.md](file:///y:/GitHub/empiretactics.github.io/docs/vibe_log.md) — 專案視覺風格、元件化規範與歷史設定。
*   [implementation_plan.md](file:///y:/GitHub/empiretactics.github.io/docs/implementation_plan.md) — 方案二重構評估計畫書。
*   [task.md](file:///y:/GitHub/empiretactics.github.io/docs/task.md) — 重構任務進度清單。
*   [ai_development_log.md](file:///y:/GitHub/empiretactics.github.io/docs/ai_development_log.md) — **本文件**，隱私檢查與流程紀錄。
