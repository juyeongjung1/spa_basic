const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const BASE_DIR = path.resolve(__dirname, '../exercise_sample');
const OUT_DIR = path.resolve(__dirname, 'images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// APIサーバー起動 (Express経由で静的HTMLも配信される)
function startServer(serverPath, port) {
  return new Promise((resolve, reject) => {
    console.log(`Starting API server: ${serverPath} on port ${port}...`);
    const proc = spawn('node', [serverPath], {
      cwd: path.dirname(serverPath),
      stdio: 'pipe'
    });
    
    proc.stdout.on('data', (data) => {
      const msg = data.toString();
      console.log(`[API Server ${port}] ${msg.trim()}`);
      if (msg.includes('起動') || msg.includes('listen') || msg.includes('running') || msg.includes('300')) {
        resolve(proc);
      }
    });

    proc.stderr.on('data', (data) => {
      console.error(`[API Server ${port} Error] ${data.toString()}`);
    });

    proc.on('error', (err) => {
      reject(err);
    });

    setTimeout(() => resolve(proc), 3000);
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  // CSSスタイルの注入関数 (外枠を設定し、余白をなくす)
  const injectStyles = async (page) => {
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          border: 2px solid #333333 !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          height: 100% !important;
        }
      `;
      document.head.appendChild(style);
    });
  };

  let apiServer = await startServer(path.join(BASE_DIR, 'Ex4-3/api/server.js'), 3005);
  try {
    const page = await browser.newPage();
    // 余白を抑えるためにビューポートを高さを抑えめにする
    await page.setViewport({ width: 800, height: 400, deviceScaleFactor: 2 });

    // 1. 404画面
    await page.goto('http://localhost:3005/invalid_path_test', { waitUntil: 'networkidle0' });
    await injectStyles(page);
    await page.screenshot({ path: path.join(OUT_DIR, '4-3-2_not_found.png') });
    console.log('Saved 4-3-2_not_found.png');

    // 2. about画面
    await page.goto('http://localhost:3005/about', { waitUntil: 'networkidle0' });
    await injectStyles(page);
    await page.screenshot({ path: path.join(OUT_DIR, '4-3-3_about.png') });
    console.log('Saved 4-3-3_about.png');

    await page.close();
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    apiServer.kill();
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();
  console.log('Extra screenshots completed.');
})();
