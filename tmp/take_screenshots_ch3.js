const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn, execSync } = require('child_process');

const BASE_DIR = path.resolve(__dirname, '../exercise_sample');
const OUT_DIR = path.resolve(__dirname, 'images');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// データベースを初期状態にリセット
function resetDatabases() {
  console.log('Resetting databases via Git...');
  const paths = [
    'Ex3-3/db/employees.db',
    'Ex3-4/db/employees.db',
    'Ex3-5/db/employees.db',
    'Ex3-6/db/employees.db'
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

const confirmOverrideShow = `
  window.confirm = function(msg) {
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.style.marginTop = '15px';
    div.style.marginBottom = '5px';
    div.style.backgroundColor = 'white';
    div.style.border = '2px solid #ff4d4f';
    div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    div.style.padding = '15px';
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '14px';
    div.style.borderRadius = '6px';
    div.style.minWidth = '250px';
    div.innerHTML = '<strong style="color:#ff4d4f;">[Confirm Dialog]</strong><br><span style="display:inline-block;margin-top:5px;">' + msg + '</span><br>' +
                    '<button style="margin-top:10px;float:right;padding:4px 12px;background:#ff4d4f;color:white;border:none;border-radius:4px;margin-left:10px;">OK</button>' +
                    '<button style="margin-top:10px;float:right;padding:4px 12px;background:#ccc;color:#333;border:none;border-radius:4px;">Cancel</button>' +
                    '<div style="clear:both;"></div>';
    document.body.appendChild(div);
    return false;
  };
`;

const confirmOverrideTrue = `
  window.confirm = function(msg) {
    return true;
  };
`;

(async () => {
  resetDatabases();
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const injectStyles = async (page) => {
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
              table {
                border-collapse: collapse !important;
                margin-top: 10px !important;
                margin-bottom: 10px !important;
              }
              th, td {
                padding: 6px 12px !important;
                border: 1px solid #ccc !important;
              }
            `;
            document.head.appendChild(style);
        });
    });
  };

  // ==========================================
  // Task 1: Ex3-3 (一覧) & Ex3-3 (検索)
  // ==========================================
  let server3 = await startServer(path.join(BASE_DIR, 'Ex3-3/api/server.js'), 3005);
  try {
    // 3-3-1: 一覧表示
    let page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await injectStyles(page);
    let fileUrl = 'file:///' + path.join(BASE_DIR, 'Ex3-3/list.html').replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    await (await page.$('body')).screenshot({ path: path.join(OUT_DIR, '3-3-1_list.png') });
    console.log('Saved 3-3-1_list.png');
    await page.close();

    // 3-3-2: キーワード検索
    page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await injectStyles(page);
    fileUrl = 'file:///' + path.join(BASE_DIR, 'Ex3-3/search_keyword.html').replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // 「山田」を入力して検索
    await page.focus('input[type="text"]');
    await page.keyboard.type('山田');
    await page.click('button'); // 検索ボタンをクリック
    await new Promise(r => setTimeout(r, 500));
    
    await (await page.$('body')).screenshot({ path: path.join(OUT_DIR, '3-3-2_search_keyword.png') });
    console.log('Saved 3-3-2_search_keyword.png');
    await page.close();
  } finally {
    server3.kill();
    await new Promise(r => setTimeout(r, 1500)); // ポート解放待ち
  }

  // ==========================================
  // Task 2: Ex3-4 (登録)
  // ==========================================
  let server4 = await startServer(path.join(BASE_DIR, 'Ex3-4/api/server.js'), 3005);
  try {
    let page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await injectStyles(page);
    let fileUrl = 'file:///' + path.join(BASE_DIR, 'Ex3-4/add_data.html').replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // 入力フォームに値を入力
    await page.focus('#password');
    await page.keyboard.type('pass123');
    await page.focus('#name');
    await page.keyboard.type('鈴木花子');
    await page.focus('#salary');
    await page.keyboard.type('250000');
    await page.focus('#locationName');
    await page.keyboard.type('大阪');
    await page.focus('#imagePath');
    await page.keyboard.type('/images/1002.png');
    
    await page.click('#registerBtn');
    await new Promise(r => setTimeout(r, 500));
    
    await (await page.$('body')).screenshot({ path: path.join(OUT_DIR, '3-4_add_data.png') });
    console.log('Saved 3-4_add_data.png');
    await page.close();
  } finally {
    server4.kill();
    await new Promise(r => setTimeout(r, 1500)); // ポート解放待ち
  }

  // ==========================================
  // Task 3: Ex3-5 (削除)
  // ==========================================
  let server5 = await startServer(path.join(BASE_DIR, 'Ex3-5/api/server.js'), 3005);
  try {
    // 3-5: 削除確認ダイアログの表示
    let page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await injectStyles(page);
    await page.evaluateOnNewDocument(confirmOverrideShow);
    let fileUrl = 'file:///' + path.join(BASE_DIR, 'Ex3-5/delete.html').replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // 最初の行の「削除」ボタンをクリック
    await page.click('tbody tr:first-child button');
    await new Promise(r => setTimeout(r, 300));
    
    await (await page.$('body')).screenshot({ path: path.join(OUT_DIR, '3-5_delete_dialog.png') });
    console.log('Saved 3-5_delete_dialog.png');
    await page.close();

    // 3-5: 実際に削除した結果
    page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await injectStyles(page);
    await page.evaluateOnNewDocument(confirmOverrideTrue);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // 最初の行の「削除」ボタンをクリック
    await page.click('tbody tr:first-child button');
    await new Promise(r => setTimeout(r, 500));
    
    await (await page.$('body')).screenshot({ path: path.join(OUT_DIR, '3-5_delete_result.png') });
    console.log('Saved 3-5_delete_result.png');
    await page.close();
  } finally {
    server5.kill();
    await new Promise(r => setTimeout(r, 1500)); // ポート解放待ち
  }

  // ==========================================
  // Task 4: Ex3-6 (更新)
  // ==========================================
  let server6 = await startServer(path.join(BASE_DIR, 'Ex3-6/api/server.js'), 3005);
  try {
    let page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    await injectStyles(page);
    let fileUrl = 'file:///' + path.join(BASE_DIR, 'Ex3-6/update.html').replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // 最初の行の「更新」ボタンをクリックしてフォームに値を呼び出す
    await page.click('tbody tr:first-child button');
    await new Promise(r => setTimeout(r, 200));
    
    // パスワード入力
    await page.focus('#updatePassword');
    await page.keyboard.type('newpass');
    
    // 勤務地を「北海道」に変更
    await page.focus('#updateLocationName');
    await page.evaluate(() => {
      document.querySelector('#updateLocationName').value = '';
    });
    await page.keyboard.type('北海道');
    
    // 更新ボタンをクリック
    await page.click('#updateBtn');
    await new Promise(r => setTimeout(r, 500));
    
    await (await page.$('body')).screenshot({ path: path.join(OUT_DIR, '3-6_update.png') });
    console.log('Saved 3-6_update.png');
    await page.close();
  } finally {
    server6.kill();
    await new Promise(r => setTimeout(r, 1500)); // ポート解放待ち
  }

  await browser.close();
  console.log('All Chapter 3 screenshots completed.');
})();
