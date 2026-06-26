const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const puppeteer = require("puppeteer");

const root = path.resolve(__dirname, "..");
const input = path.join(root, "SPA開発入門_演習ガイド.md");
const tmpDir = path.join(root, "tmp", "pdfs");
const outDir = path.join(root, "output", "pdf");
const cssPath = path.join(tmpDir, "guide.css");
const htmlPath = path.join(tmpDir, "SPA開発入門_演習ガイド.html");
const pdfPath = path.join(outDir, "SPA開発入門_演習ガイド.pdf");
const previewPath = path.join(tmpDir, "SPA開発入門_演習ガイド_preview.png");
const logoPath = path.join(tmpDir, "trainocate_logo.png");
const logoUrl = "https://www.trainocate.co.jp/top_common/images/trainocate_logo.png";

const css = String.raw`
:root {
    --ink: #232323;
    --muted: #666f7d;
    --line: #ead8d2;
    --soft: #fff8f5;
    --brand: #e94b22;
    --brand-dark: #b9361c;
    --brand-soft: #fff1ec;
    --accent: #1d3994;
    --accent-soft: #eef3ff;
    --code-bg: #fffaf7;
    --guide-logo: none;
}

html {
    font-family: "Noto Sans JP", "Yu Gothic", "YuGothic", "Meiryo", sans-serif;
    color: var(--ink);
    font-size: 10.5pt;
    line-height: 1.78;
}

body {
    max-width: none;
    margin: 0;
    padding: 0;
    word-break: normal;
    overflow-wrap: anywhere;
}

#title-block-header {
    min-height: 210mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 10px solid var(--brand);
    padding-left: 18mm;
    break-after: page;
    position: relative;
}

#title-block-header::before {
    content: "";
    position: absolute;
    top: 10mm;
    left: 18mm;
    width: 52mm;
    height: 8mm;
    background: var(--guide-logo) left center / contain no-repeat;
}

#title-block-header .title {
    margin: 0;
    font-size: 30pt;
    line-height: 1.35;
    letter-spacing: 0;
    color: var(--brand);
}

#title-block-header .date {
    display: none;
}

body > h1:first-of-type {
    margin-top: 0;
    color: var(--brand);
    border-bottom: 2px solid var(--brand);
}

body > h1:first-of-type + p strong {
    display: block;
    margin: 2mm 0 8mm;
    color: var(--accent);
    font-size: 13pt;
}

h2#目次 {
    break-before: page;
    background: var(--brand);
    color: #ffffff;
    border-left: 0;
    border-radius: 6px 6px 0 0;
    margin-bottom: 0;
}

h2#目次 + ol {
    list-style: none;
    margin: 0 0 10mm;
    padding: 5mm;
    background: #ffffff;
    border: 1px solid var(--line);
    border-top: 0;
    border-radius: 0 0 6px 6px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3mm;
}

h2#目次 + ol li {
    margin: 0;
    padding: 4mm;
    background: var(--brand-soft);
    border-left: 4px solid var(--brand);
    border-radius: 4px;
    font-weight: 700;
}

a {
    color: var(--accent);
    text-decoration: none;
}

h1, h2, h3, h4 {
    color: var(--brand-dark);
    line-height: 1.35;
    break-after: avoid;
}

h1 {
    font-size: 21pt;
    margin: 12mm 0 9mm;
    padding-bottom: 4mm;
    border-bottom: 2px solid var(--brand);
}

h1[id^="演習"] {
    break-before: page;
    min-height: 22mm;
    padding: 12mm 8mm 6mm;
    margin: 0 0 8mm;
    color: #ffffff;
    background: linear-gradient(90deg, var(--brand) 0%, var(--brand-dark) 72%, var(--accent) 72%, var(--accent) 100%);
    border-bottom: 0;
    border-radius: 8px;
}

h2 {
    font-size: 15.5pt;
    margin: 8mm 0 5mm;
    padding: 2.5mm 4mm;
    background: var(--brand-soft);
    border-left: 5px solid var(--brand);
}

h1 + h2 {
    break-before: auto;
    margin-top: 0;
}

h2#演習の概要,
h2#予想所要時間 {
    break-before: avoid;
}

h2#演習の概要 + p,
h2#予想所要時間 + p {
    break-inside: avoid;
}

h2[id^="演習11"],
h2[id^="演習22"],
h2[id^="演習32"],
h2[id^="演習42"] {
    break-before: page;
}

h3 {
    font-size: 13.2pt;
    margin: 9mm 0 4mm;
    padding-bottom: 1.5mm;
    border-bottom: 1px solid var(--line);
}

h4 {
    font-size: 11.2pt;
    margin: 6mm 0 2.5mm;
    color: var(--brand-dark);
}

p {
    margin: 2.5mm 0 4mm;
}

strong {
    color: var(--brand-dark);
    font-weight: 700;
}

ul, ol {
    margin: 2.5mm 0 5mm 7mm;
    padding-left: 5mm;
}

li {
    margin: 1.7mm 0;
}

blockquote {
    margin: 5mm 0;
    padding: 3.5mm 5mm;
    background: var(--brand-soft);
    border-left: 5px solid var(--brand);
    color: #562313;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 4mm 0 7mm;
    font-size: 9.4pt;
    break-inside: avoid;
}

thead {
    display: table-header-group;
}

th {
    background: var(--brand);
    color: #ffffff;
    font-weight: 700;
}

th, td {
    border: 1px solid var(--line);
    padding: 2mm 2.5mm;
    vertical-align: top;
}

code {
    font-family: "Consolas", "BIZ UDGothic", "Meiryo", monospace;
    font-size: 9pt;
    background: var(--brand-soft);
    border-radius: 3px;
    padding: 0.2mm 1mm;
    word-break: break-all;
}

pre {
    margin: 4mm 0 6mm;
    padding: 3.5mm 4mm;
    background: var(--code-bg);
    border: 1px solid var(--line);
    border-left: 4px solid var(--brand);
    border-radius: 5px;
    overflow: visible;
    white-space: pre-wrap;
    break-inside: avoid;
}

pre code {
    display: block;
    background: transparent;
    padding: 0;
    line-height: 1.55;
    word-break: normal;
    overflow-wrap: anywhere;
}

img {
    display: block;
    max-width: 100%;
    max-height: 128mm;
    margin: 4mm auto 8mm;
    border: 1px solid var(--line);
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(29, 57, 148, 0.12);
    object-fit: contain;
    break-inside: avoid;
}

hr {
    border: 0;
    border-top: 1px solid var(--line);
    margin: 8mm 0;
}

.sourceCode {
    background: transparent;
}

.blank-page {
    break-before: page;
    break-after: page;
    min-height: 240mm;
}

@media print {
    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
`;

function logoDataUri() {
    const bytes = fs.readFileSync(logoPath);
    return `url("data:image/png;base64,${bytes.toString("base64")}")`;
}

function downloadLogo() {
    fs.mkdirSync(tmpDir, { recursive: true });
    if (fs.existsSync(logoPath)) {
        return;
    }
    execFileSync(
        "node",
        [
            "-e",
            `fetch(${JSON.stringify(logoUrl)}).then(async r => { if (!r.ok) throw new Error(String(r.status)); const b = Buffer.from(await r.arrayBuffer()); require('fs').writeFileSync(${JSON.stringify(logoPath)}, b); })`,
        ],
        { cwd: root, stdio: "inherit" }
    );
}

function runPandoc() {
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.mkdirSync(outDir, { recursive: true });
    downloadLogo();
    fs.writeFileSync(cssPath, css.replace("--guide-logo: none;", `--guide-logo: ${logoDataUri()};`), "utf8");

    execFileSync(
        "pandoc",
        [
            input,
            "--from=gfm",
            "--to=html5",
            "--standalone",
            "--embed-resources",
            "--resource-path",
            root,
            "--metadata",
            "title=SPA開発入門 演習ガイド",
            "--metadata",
            "lang=ja-JP",
            "--css",
            cssPath,
            "--output",
            htmlPath,
        ],
        { cwd: root, stdio: "inherit" }
    );
}

async function insertBlankPages(page) {
    const pageHeight = 1122.52;
    for (let pass = 0; pass < 8; pass += 1) {
        const inserted = await page.evaluate((pageHeight) => {
            const chapters = [...document.querySelectorAll('h1[id^="演習"]')];
            for (const chapter of chapters) {
                const offset = chapter.getBoundingClientRect().top + window.scrollY;
                const pageNumber = Math.floor(offset / pageHeight) + 1;
                if (pageNumber % 2 === 1) {
                    const blank = document.createElement("div");
                    blank.className = "blank-page";
                    blank.setAttribute("aria-hidden", "true");
                    chapter.before(blank);
                    return true;
                }
            }
            return false;
        }, pageHeight);
        if (!inserted) {
            return;
        }
        await page.evaluate(() => document.body.offsetHeight);
    }
}

async function insertFixedBlankPages(page) {
    await page.evaluate(() => {
        const chapter = document.getElementById("演習4-spa開発");
        if (!chapter) {
            return;
        }
        const blank = document.createElement("div");
        blank.className = "blank-page";
        blank.setAttribute("aria-hidden", "true");
        chapter.before(blank);
    });
}

async function renderPdf() {
    const browser = await puppeteer.launch({ headless: "new" });
    try {
        const page = await browser.newPage();
        await page.goto(`file://${htmlPath.replace(/\\/g, "/")}`, {
            waitUntil: "networkidle0",
        });
        await page.emulateMediaType("print");
        await insertBlankPages(page);
        await insertFixedBlankPages(page);

        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            preferCSSPageSize: false,
            margin: {
                top: "15mm",
                right: "16mm",
                bottom: "18mm",
                left: "16mm",
            },
            headerTemplate: "<div></div>",
            footerTemplate: `
                <div style="width:100%; font-family:'Noto Sans JP','Yu Gothic','Meiryo',sans-serif; font-size:8px; color:#6b7280; padding:0 16mm; display:flex; justify-content:space-between;">
                    <span>SPA開発入門 演習ガイド</span>
                    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
                </div>
            `,
        });

        await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
        await page.screenshot({ path: previewPath, fullPage: false });
    } finally {
        await browser.close();
    }
}

function inspectPdf() {
    const bytes = fs.readFileSync(pdfPath);
    const text = bytes.toString("latin1");
    const pageCount = (text.match(/\/Type\s*\/Page\b/g) || []).length;
    const sizeMb = (bytes.length / 1024 / 1024).toFixed(2);
    console.log(`PDF: ${pdfPath}`);
    console.log(`Preview: ${previewPath}`);
    console.log(`Pages: ${pageCount}`);
    console.log(`Size: ${sizeMb} MB`);
}

(async () => {
    runPandoc();
    await renderPdf();
    inspectPdf();
})();
