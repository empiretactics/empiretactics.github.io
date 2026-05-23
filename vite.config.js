import { defineConfig } from 'vite';
import { resolve, extname, relative, dirname } from 'path';
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 遞迴尋找專案中所有的 HTML 檔案作為 Vite 的進入點
function getHtmlFiles(dir, files = {}) {
  const list = readdirSync(dir);
  for (const file of list) {
    // 忽略開發工具、套件與編譯產物資料夾
    if ([
      'node_modules',
      'dist',
      'dist-ssr',
      '.git',
      '.idea',
      '.github',
      'package.json',
      'package-lock.json',
      'vite.config.js'
    ].includes(file)) {
      continue;
    }
    const filePath = resolve(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, files);
    } else if (stat.isFile() && extname(filePath) === '.html') {
      const relativePath = relative(__dirname, filePath);
      // 產生唯一的 Rollup 入口名稱，例如 "game_sword_of_justice"
      const key = relativePath
        .replace(/\.html$/, '')
        .replace(/\\/g, '_')
        .replace(/\//g, '_');
      files[key] = filePath;
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles(__dirname);

// 自訂 Vite 插件：自動複製未被 Vite 打包的靜態資源 (如 mp3, txt, 圖片等)
function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const destRoot = resolve(__dirname, 'dist');
      
      const copyRecursive = (src, dest) => {
        const list = readdirSync(src);
        for (const item of list) {
          if ([
            'node_modules',
            'dist',
            'dist-ssr',
            '.git',
            '.idea',
            '.github',
            'package.json',
            'package-lock.json',
            'vite.config.js'
          ].includes(item)) {
            continue;
          }
          const srcPath = resolve(src, item);
          const destPath = resolve(dest, item);
          const stat = statSync(srcPath);
          
          if (stat.isDirectory()) {
            copyRecursive(srcPath, destPath);
          } else {
            const ext = extname(srcPath).toLowerCase().replace('.', '');
            // 需要被複製的靜態資源副檔名
            const assetExtensions = [
              'mp3', 'txt', 'png', 'jpg', 'jpeg', 'gif', 'svg', 
              'ttf', 'woff', 'woff2', 'ico', 'json', 'pdf'
            ];
            if (assetExtensions.includes(ext)) {
              const destDir = dirname(destPath);
              if (!existsSync(destDir)) {
                mkdirSync(destDir, { recursive: true });
              }
              copyFileSync(srcPath, destPath);
            }
          }
        }
      };
      
      copyRecursive(__dirname, destRoot);
      console.log('✨ 靜態資源已成功複製到 dist 目錄！');
    }
  };
}

export default defineConfig({
  base: './', // 確保部署到 GitHub Pages 子路徑時，資源路徑解析正確
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: htmlFiles
    }
  },
  plugins: [
    copyStaticAssetsPlugin()
  ]
});
