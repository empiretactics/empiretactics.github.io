# Vite 與 GitHub Actions 部署教學指南

我們已經為專案完成了方案二的設定檔建置。本指南將引導您完成 **Node.js 本地安裝**、**GitHub 倉庫權限設定**，以及 **如何提交並自動部署**。

---

## 第一步：在本機安裝 Node.js

要在您的 Windows 電腦上運行本地測試伺服器，需要先安裝 Node.js：

1. 前往 **[Node.js 官方網站](https://nodejs.org/)**。
2. 建議下載 **LTS (長期支援版本)** 檔案（例如 v20.x 或最新 LTS）。
3. 執行安裝檔，一路點擊「下一步 (Next)」直到安裝完成。
4. 安裝完成後，請**重啟您的終端機或 VS Code**。
5. 開啟終端機（PowerShell 或 CMD）輸入以下指令，確認安裝成功：
   ```powershell
   node -v
   npm -v
   ```
   *(如果能顯示版本號，即代表安裝成功！)*

---

## 第二步：設定 GitHub 倉庫的自動部署權限

GitHub Actions 在執行自動部署時，需要擁有向您倉庫寫入檔案的權限（以將打包產物推送到 `gh-pages` 分支）。請依照以下步驟設定：

1. 開啟瀏覽器，前往您的 **GitHub 專案倉庫頁面** (`https://github.com/您的帳號/empiretactics.github.io`)。
2. 點擊上方的 **`Settings`** (設定) 頁籤。
3. 在左側選單中，展開 **`Actions`**，然後點擊 **`General`**。
4. 滾動頁面至最下方的 **`Workflow permissions`** 區塊：
   * 勾選 **`Read and write permissions`**。
5. 點擊 **`Save`** 按鈕儲存設定。

---

## 第三步：將變更推送到 GitHub

設定完成後，您可以將新建立的設定檔提交並推送到 GitHub：

1. 在專案目錄下執行以下 Git 指令：
   ```bash
   git add .
   git commit -m "chore: setup Vite MPA build and GitHub Actions deployment"
   git push origin main
   ```
2. 當您 Push 到 `main` 分支後，GitHub Actions 將會自動啟動！

### 🔍 如何查看部署進度：
1. 前往您的 GitHub 專案倉庫網頁。
2. 點擊上方的 **`Actions`** 頁籤。
3. 您會看到一個正在執行的工作流程 `Deploy to GitHub Pages`。
4. 點擊進去可以看見安裝與打包的日誌。綠色打勾（Success）即代表部署成功！
5. 部署完成後，GitHub 會自動建立（或更新）一個 `gh-pages` 分支，您的網站將會以這個編譯後的版本呈現在網路上。

---

## 第四步：如何在本地端進行開發與預覽

當您安裝好 Node.js並重啟終端機後，您就可以在本地享受 Vite 的高速開發體驗：

1. **安裝套件**：
   在專案目錄下開啟終端機，執行：
   ```bash
   npm install
   ```
2. **開啟本地開發伺服器（隨改即看）**：
   ```bash
   npm run dev
   ```
   畫面會顯示一個本地網址（通常是 `http://localhost:5173/`）。打開瀏覽器造訪該網址，您修改任何程式碼，網頁都會在瞬間自動刷新！
3. **本地編譯測試**：
   如果想在本地測試打包後的靜態檔案：
   ```bash
   npm run build
   ```
   編譯完後，可以使用以下指令在本地預覽打包後的網站：
   ```bash
   npm run preview
   ```
