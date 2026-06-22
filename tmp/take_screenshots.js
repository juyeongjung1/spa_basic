const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.resolve(__dirname, '../exercise_sample');
const OUT_DIR = path.resolve(__dirname, 'images');

// フォルダがない場合は作成
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const tasks = [
  { name: '1-1-1_function_basic', file: 'Ex1-1/function_basic.html' },
  { name: '1-1-2_function_return', file: 'Ex1-1/function_return.html' },
  { name: '1-1-3_function_arrow', file: 'Ex1-1/function_arrow.html' },
  { name: '1-2_dom_select', file: 'Ex1-2/dom_select.html', consoleOut: true },
  { name: '1-3-1_event_listener1', file: 'Ex1-3/event_listener1.html', action: async (page) => {
    await page.click('button');
  }},
  { name: '1-3-2_event_listener2', file: 'Ex1-3/event_listener2.html', action: async (page) => {
    await page.click('#workEndBtn');
  }},
  { name: '1-4-1_innerHTML_before', file: 'Ex1-4/innerHTML.html' },
  { name: '1-4-1_innerHTML_after', file: 'Ex1-4/innerHTML.html', action: async (page) => {
    await page.click('#loadButton');
  }},
  { name: '1-4-2_insertAdjacentHTML', file: 'Ex1-4/insertAdjacentHTML.html', action: async (page) => {
    await page.click('#addEmployeeBtn');
    await new Promise(r => setTimeout(r, 100));
    await page.click('#addEmployeeBtn');
  }},
  { name: '1-4-3_class_list', file: 'Ex1-4/class_list.html', action: async (page) => {
    await page.click('#workStartBtn');
  }}
];

const alertOverride = `
  window.alert = function(msg) {
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
    div.innerHTML = '<strong style="color:#ff4d4f;">[Alert Dialog]</strong><br><span style="display:inline-block;margin-top:5px;">' + msg + '</span><br><button style="margin-top:10px;float:right;padding:4px 12px;background:#ff4d4f;color:white;border:none;border-radius:4px;cursor:pointer;">OK</button><div style="clear:both;"></div>';
    document.body.appendChild(div);
  };
`;

const consoleOverride = `
  const origLog = console.log;
  let consoleDiv = null;
  
  document.addEventListener('DOMContentLoaded', () => {
    consoleDiv = document.createElement('div');
    consoleDiv.style.backgroundColor = '#1e1e1e';
    consoleDiv.style.color = '#00ff00';
    consoleDiv.style.fontFamily = 'Consolas, Monaco, monospace';
    consoleDiv.style.padding = '12px';
    consoleDiv.style.marginTop = '15px';
    consoleDiv.style.borderRadius = '6px';
    consoleDiv.style.whiteSpace = 'pre-wrap';
    consoleDiv.style.border = '1px solid #444';
    consoleDiv.innerHTML = '<span style="color:#aaa;font-weight:bold;">=== Console Output ===</span><br>';
    document.body.appendChild(consoleDiv);
  });
  
  console.log = function(...args) {
    origLog.apply(console, args);
    const msg = args.map(a => {
        if (a && a.outerHTML) return a.tagName + (a.id ? '#'+a.id : '') + (a.className ? '.'+a.className.replace(/ /g, '.') : '');
        return typeof a === 'object' ? JSON.stringify(a) : a;
    }).join(' ');
    
    if (consoleDiv) {
        consoleDiv.innerHTML += '> ' + msg + '<br>';
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            consoleDiv.innerHTML += '> ' + msg + '<br>';
        });
    }
  };
`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const t of tasks) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 2 });
    
    await page.evaluateOnNewDocument(alertOverride);
    if (t.consoleOut) {
      await page.evaluateOnNewDocument(consoleOverride);
    }
    
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
                border: 2px solid #333333 !important; /* 太くてはっきり見える境界線 */
                border-radius: 6px !important;
                padding: 20px !important;
                margin: 0 !important; /* 余計な外側余白を排除 */
                background-color: #ffffff !important;
                min-width: 280px !important;
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
    
    // bodyタグ自体のスクリーンショットを撮る
    await bodyHandle.screenshot({ path: outPath });
    console.log('Saved', outPath);
    await page.close();
  }
  await browser.close();
})();
