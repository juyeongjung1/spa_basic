const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.resolve(__dirname, '../exercise_sample');
const OUT_DIR = path.resolve(__dirname, 'images');

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
    div.style.position = 'absolute';
    div.style.top = '20px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.backgroundColor = 'white';
    div.style.border = '2px solid #333';
    div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '14px';
    div.style.borderRadius = '6px';
    div.innerHTML = msg + '<br><button style="margin-top:15px;float:right;padding:4px 12px;">OK</button>';
    document.body.appendChild(div);
  };
`;

const consoleOverride = `
  const origLog = console.log;
  let consoleDiv = null;
  
  document.addEventListener('DOMContentLoaded', () => {
    consoleDiv = document.createElement('div');
    consoleDiv.style.backgroundColor = '#222';
    consoleDiv.style.color = '#0f0';
    consoleDiv.style.fontFamily = 'monospace';
    consoleDiv.style.padding = '10px';
    consoleDiv.style.marginTop = '20px';
    consoleDiv.style.borderRadius = '5px';
    consoleDiv.style.whiteSpace = 'pre-wrap';
    consoleDiv.innerHTML = '=== Console Output ===<br>';
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

const styleOverride = `
  body {
    border: 1px solid #aaa;
    padding: 20px;
    margin: 10px;
    display: inline-block;
    border-radius: 4px;
    min-width: 300px;
    min-height: 80px;
    position: relative;
  }
`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const t of tasks) {
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });
    
    await page.evaluateOnNewDocument(alertOverride);
    if (t.consoleOut) {
      await page.evaluateOnNewDocument(consoleOverride);
    }
    await page.evaluateOnNewDocument(() => {
        document.addEventListener('DOMContentLoaded', () => {
            const style = document.createElement('style');
            style.textContent = `
              body {
                border: 1px solid #aaa !important;
                padding: 20px !important;
                margin: 10px !important;
                display: inline-block !important;
                border-radius: 4px !important;
                min-width: 300px !important;
                min-height: 80px !important;
                position: relative !important;
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
})();
