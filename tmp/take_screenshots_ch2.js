const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const BASE_DIR = path.resolve(__dirname, '../exercise_sample');
const OUT_DIR = path.resolve(__dirname, 'images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// APIサーバーの起動
function startServer(serverPath, port) {
  return new Promise((resolve, reject) => {
    console.log(`Starting server: ${serverPath} on port ${port}...`);
    const proc = spawn('node', [serverPath], {
      cwd: path.dirname(serverPath),
      stdio: 'pipe'
    });
    
    proc.stdout.on('data', (data) => {
      const msg = data.toString();
      console.log(`[Server ${port}] ${msg.trim()}`);
      if (msg.includes('起動') || msg.includes('listen') || msg.includes('running') || msg.includes('300')) {
        resolve(proc);
      }
    });

    proc.stderr.on('data', (data) => {
      console.error(`[Server ${port} Error] ${data.toString()}`);
    });

    proc.on('error', (err) => {
      reject(err);
    });

    // 念のため、3秒経ったら起動したものとみなしてresolveする
    setTimeout(() => resolve(proc), 3000);
  });
}

(async () => {
  let apiServer1, apiServer2;
  try {
    // APIサーバーを起動
    apiServer1 = await startServer(path.join(BASE_DIR, 'Ex2-2/currenttime-api/server.js'), 3002);
    apiServer2 = await startServer(path.join(BASE_DIR, 'Ex2-2/payroll-api/server.js'), 3003);

    console.log('Servers started. Starting browser...');
    const browser = await puppeteer.launch({ headless: 'new' });

    const tasks = [
      {
        name: '2-2_fetch',
        file: 'Ex2-2/fetch.html',
        action: async (page) => {
          await page.click('button'); // 「出勤する」ボタンをクリック
          await new Promise(r => setTimeout(r, 800)); // API通信の完了を待つ
        }
      },
      {
        name: '2-3_axios',
        file: 'Ex2-2/axios.html',
        action: async (page) => {
          await page.focus('#salary');
          // 既存の値をクリアして 230000 を入力
          await page.evaluate(() => {
            document.querySelector('#salary').value = '';
          });
          await page.keyboard.type('230000');
          await page.click('button'); // 「計算する」ボタンをクリック
          await new Promise(r => setTimeout(r, 800)); // API通信の完了を待つ
        }
      }
    ];

    for (const t of tasks) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });

      // 余白カット＆黒外枠追加のためのスタイル注入
      await page.evaluateOnNewDocument(() => {
          document.addEventListener('DOMContentLoaded', () => {
              const style = document.createElement('style');
              style.textContent = `
                html {
                  margin: 0 !important;
                  padding: 0 !important;
                  background-color: transparent !important;
                }
                body {
                  display: inline-block !important;
                  box-sizing: border-box !important;
                  border: 2px solid #333333 !important;
                  border-radius: 6px !important;
                  padding: 20px !important;
                  margin: 0 !important;
                  background-color: #ffffff !important;
                  min-width: 320px !important;
                  width: max-content !important;
                  max-width: 95vw !important;
                  overflow: hidden !important;
                  font-family: sans-serif !important;
                }
              `;
              document.head.appendChild(style);
          });
      });

      const fileUrl = 'file:///' + path.join(BASE_DIR, t.file).replace(/\\/g, '/');
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });

      if (t.action) {
        await t.action(page);
      }

      await new Promise(r => setTimeout(r, 500));

      const outPath = path.join(OUT_DIR, t.name + '.png');
      const bodyHandle = await page.$('body');
      await bodyHandle.screenshot({ path: outPath });
      console.log('Saved', outPath);
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // APIサーバーをクリーンアップ
    console.log('Cleaning up servers...');
    if (apiServer1) apiServer1.kill();
    if (apiServer2) apiServer2.kill();
    console.log('Done.');
  }
})();
