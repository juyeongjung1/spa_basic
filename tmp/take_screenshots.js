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
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.backgroundColor = 'white';
    div.style.border = '1px solid #ccc';
    div.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.fontFamily = 'sans-serif';
    div.style.fontSize = '14px';
    div.innerHTML = msg + '<br><button style="margin-top:10px;float:right">OK</button>';
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

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const t of tasks) {
    const page = await browser.newPage();
    await page.setViewport({ width: 500, height: 350, deviceScaleFactor: 2 });
    
    await page.evaluateOnNewDocument(alertOverride);
    if (t.consoleOut) {
      await page.evaluateOnNewDocument(consoleOverride);
    }

    const fileUrl = 'file:///' + path.join(BASE_DIR, t.file).replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    if (t.action) {
      await t.action(page);
    }
    
    await new Promise(r => setTimeout(r, 500));
    
    const outPath = path.join(OUT_DIR, t.name + '.png');
    await page.screenshot({ path: outPath });
    console.log('Saved', outPath);
    await page.close();
  }
  await browser.close();
})();
