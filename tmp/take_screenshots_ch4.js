const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn, execSync } = require('child_process');

const BASE_DIR = path.resolve(__dirname, '../exercise_sample');
const OUT_DIR = path.resolve(__dirname, 'images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// データベースをリセット
function resetDatabases() {
  console.log('Resetting databases via Git...');
  const paths = [
    'Ex4-2-1/db/employees.db',
    'Ex4-2-2/db/employees.db',
    'Ex4-2-3/db/employees.db',
    'Ex4-4/db/employees.db'
  ];
  for (const p of paths) {
    const fullPath = path.join(BASE_DIR, p);
    try {
      execSync(`git checkout -- "${fullPath}"`);
      console.log(`Reset: ${p}`);
    } catch (e) {
      console.error(`Failed to reset database: ${p}`, e);
    }
  }
}

// APIサーバー起動
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

// 簡易静的ファイルサーバー起動
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
};

function createStaticServer(baseDir, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      console.log(`[Static Server ${port}] Request url: ${req.url}, reqPath: ${reqPath}`);
      if (reqPath === '/' || reqPath.endsWith('/')) reqPath = '/index.html';
      
      let filePath = path.join(baseDir, reqPath);
      if (reqPath.startsWith('/images/')) {
        filePath = path.join(BASE_DIR, reqPath);
      }
      console.log(`[Static Server ${port}] filePath resolved to: ${filePath}`);
      if (!fs.existsSync(filePath)) {
        const ext = path.extname(reqPath);
        if (ext === '' || ext === '.html') {
          console.log(`[Static Server ${port}] File not found, fallback to index.html`);
          filePath = path.join(baseDir, '/index.html');
        } else {
          console.log(`[Static Server ${port}] File not found, returning 404 for ext ${ext}`);
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Not Found');
          return;
        }
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Not Found');
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });
    
    server.listen(port, () => {
      console.log(`Static server started at http://localhost:${port} for ${baseDir}`);
      resolve(server);
    });
  });
}

(async () => {
  resetDatabases();
  
  const browser = await puppeteer.launch({ headless: 'new' });

  // CSSスタイルの注入関数
  const injectStyles = async (page) => {
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        /* モーダルの外枠を強化 */
        .modal-content {
          border: 2px solid #333333 !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
          border-radius: 8px !important;
        }
        /* 通常のフォームの外枠を強化 */
        form {
          border: 2px solid #333333 !important;
          border-radius: 8px !important;
          padding: 20px !important;
          background-color: #ffffff !important;
          display: inline-block !important;
          min-width: 340px !important;
          box-sizing: border-box !important;
        }
      `;
      document.head.appendChild(style);
    });
  };

  // ==========================================
  // Task 0: Ex4-2-1 (詳細Modal)
  // ==========================================
  let apiServer1 = await startServer(path.join(BASE_DIR, 'Ex4-2-1/api/server.js'), 3005);
  let staticServer1 = await createStaticServer(path.join(BASE_DIR, 'Ex4-2-1'), 8080);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
    
    // 最初の社員リンクをクリックして詳細Modalを開く
    await page.click('#employeeList tr:first-child a');
    await page.waitForSelector('#detailModal .modal-content', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 300));
    
    await injectStyles(page);
    
    const modalContent = await page.$('#detailModal .modal-content');
    await modalContent.screenshot({ path: path.join(OUT_DIR, '4-2-1_detail_modal.png') });
    console.log('Saved 4-2-1_detail_modal.png');
    
    await page.close();
  } finally {
    apiServer1.kill();
    staticServer1.close();
    await new Promise(r => setTimeout(r, 1500));
  }

  // ==========================================
  // Task 1: Ex4-2-2 (登録Modal)
  // ==========================================
  let apiServer2 = await startServer(path.join(BASE_DIR, 'Ex4-2-2/api/server.js'), 3005);
  let staticServer2 = await createStaticServer(path.join(BASE_DIR, 'Ex4-2-2'), 8080);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
    
    // [新規社員登録]ボタンをクリックしてモーダルを開く
    await page.click('button.btn-success');
    await page.waitForSelector('#registerModal .modal-content', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 300));
    
    await injectStyles(page);
    
    // モーダルの入力欄に値を入力
    await page.focus('#password');
    await page.keyboard.type('pass422');
    await page.focus('#name');
    await page.keyboard.type('佐藤花子');
    await page.focus('#salary');
    await page.keyboard.type('270000');
    await page.focus('#locationName');
    await page.keyboard.type('名古屋');
    await page.focus('#imagePath');
    await page.keyboard.type('/images/1003.png');
    
    const modalContent = await page.$('#registerModal .modal-content');
    await modalContent.screenshot({ path: path.join(OUT_DIR, '4-2-2_register_modal.png') });
    console.log('Saved 4-2-2_register_modal.png');
    
    await page.close();
  } finally {
    apiServer2.kill();
    staticServer2.close();
    await new Promise(r => setTimeout(r, 1500));
  }

  // ==========================================
  // Task 2: Ex4-2-3 (更新Modal)
  // ==========================================
  let apiServer3 = await startServer(path.join(BASE_DIR, 'Ex4-2-3/api/server.js'), 3005);
  let staticServer3 = await createStaticServer(path.join(BASE_DIR, 'Ex4-2-3'), 8080);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
    
    // 最初の社員リンクをクリックして詳細Modalを開く
    await page.click('#employeeList tr:first-child a');
    await page.waitForSelector('#detailModal .modal-content', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 300));
    
    // 詳細Modalの「編集」ボタンをクリックして編集Modalを開く
    await page.click('#detailModal button.btn-primary');
    await page.waitForSelector('#updateModal .modal-content', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 300));
    
    await injectStyles(page);
    
    // パスワードを入力
    await page.focus('#updatePassword');
    await page.keyboard.type('updatepass');
    
    const modalContent = await page.$('#updateModal .modal-content');
    await modalContent.screenshot({ path: path.join(OUT_DIR, '4-2-3_update_modal.png') });
    console.log('Saved 4-2-3_update_modal.png');
    
    await page.close();
  } finally {
    apiServer3.kill();
    staticServer3.close();
    await new Promise(r => setTimeout(r, 1500));
  }

  // ==========================================
  // Task 3: Ex4-4 (SPA登録・更新部品)
  // ==========================================
  let apiServer4 = await startServer(path.join(BASE_DIR, 'Ex4-4/api/server.js'), 3005);
  let staticServer4 = await createStaticServer(path.join(BASE_DIR, 'Ex4-4'), 8080);
  
  let page;
  try {
    // 4-4-1: 登録画面
    page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
    
    // 「新規登録」メニューリンクをクリック
    await page.click('nav a[href="/employees/new"]');
    await page.waitForSelector('#id', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 300));
    
    await injectStyles(page);
    
    // 登録フォームに入力
    await page.focus('#id');
    await page.keyboard.type('1006');
    await page.focus('#password');
    await page.keyboard.type('spapass');
    await page.focus('#name');
    await page.keyboard.type('渡辺隆');
    await page.focus('#salary');
    await page.keyboard.type('290000');
    await page.focus('#location_name');
    await page.keyboard.type('福岡');
    await page.focus('#image_path');
    await page.keyboard.type('/images/1006.png');
    
    const formElement = await page.$('form');
    await formElement.screenshot({ path: path.join(OUT_DIR, '4-4_register.png') });
    console.log('Saved 4-4_register.png');
    await page.close();

    // 4-4-2: 更新モーダル
    page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    console.log('Navigating to index.html...');
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
    console.log('Navigated to index.html. Current URL:', page.url());
    
    // 「社員一覧」メニューリンクをクリック
    console.log('Clicking "社員一覧" link...');
    await page.click('nav a[href="/employees"]');
    console.log('Clicked "社員一覧" link. Current URL:', page.url());
    console.log('Waiting for tbody tr:first-child a...');
    await page.waitForSelector('tbody tr:first-child a', { timeout: 5000 });
    console.log('Found tbody tr:first-child a. Current URL:', page.url());
    await new Promise(r => setTimeout(r, 300));
    
    // 最初の社員リンクをクリックして詳細表示
    console.log('Clicking first employee link...');
    await page.click('tbody tr:first-child a');
    console.log('Clicked first employee link. Current URL:', page.url());
    console.log('Waiting for #editBtn...');
    await page.waitForSelector('#editBtn', { timeout: 5000 });
    console.log('Found #editBtn. Current URL:', page.url());
    await new Promise(r => setTimeout(r, 300));
    
    // 「編集」ボタンをクリック
    console.log('Clicking #editBtn...');
    await page.click('#editBtn');
    console.log('Clicked #editBtn. Current URL:', page.url());
    console.log('Waiting for #update-modal .modal-content...');
    await page.waitForSelector('#update-modal .modal-content', { timeout: 5000 });
    console.log('Found #update-modal .modal-content. Current URL:', page.url());
    await new Promise(r => setTimeout(r, 300));
    
    await injectStyles(page);
    
    // 編集Modalを撮影
    const modalContent = await page.$('#update-modal .modal-content');
    await modalContent.screenshot({ path: path.join(OUT_DIR, '4-4_update.png') });
    console.log('Saved 4-4_update.png');
    await page.close();
  } catch (err) {
    console.error('Error occurred in SPA screenshots:', err);
    if (page) {
      const debugPath = path.join(OUT_DIR, 'error_debug.png');
      await page.screenshot({ path: debugPath });
      console.log('Saved debug screenshot to:', debugPath);
    }
  } finally {
    apiServer4.kill();
    staticServer4.close();
    await new Promise(r => setTimeout(r, 1500));
  }

  await browser.close();
  console.log('All Chapter 4 screenshots completed.');
})();
