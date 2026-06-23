# SPA開発入門 演習ガイド

**～Vue・Reactを学ぶ前に！素のJavaScriptで理解するSPA～**

教材コード: WSC0135G-T1-01

---

## この演習ガイドについて

この演習ガイドでは、講義資料「SPA開発入門」で学習する第1章から第4章までの内容を、「人事管理システム」の作成を通して定着させます。第1章で社員情報を画面に表示し、第2章で非同期通信を学び、第3章で社員情報を管理するREST APIを作成し、第4章でSPAへ発展させます。

演習では、次の3フォルダを使用します。受講者は `sample` を参照しながら `exercise_question` の問題を解き、動作確認後に `exercise_sample` と比較してください。

```text
sample/             メインテキストで使用する参照サンプル
exercise_question/  受講者が編集する問題ファイル
exercise_sample/    コメントで詳しく解説した演習の完成解答
```

`exercise_question` と `exercise_sample` は同じ相対パス・ファイル名で対応させます。例えば、問題が `exercise_question\Ex1-4\innerHTML.html` の場合、完成解答は `exercise_sample\Ex1-4\innerHTML.html` です。

各問題は、参照サンプルの題材・データ・関数名を人事管理向けに変更しています。ただし、解答に必要な構文やAPIは、記載された参照テキストと参照ファイルで学習した範囲に限定しています。

### 演習を始める前の注意

- HTMLファイルは、VS CodeのLive Serverなど、ローカルWebサーバーから開いてください。
- APIを使用する演習では、先に対象の `api` フォルダで `npm install` を実行してください。
- APIサーバーは `npm start` で起動できます。`npm run dev` を使用する場合は、`npm install` により開発用依存関係のnodemonもインストールされます。
- APIサーバーを起動したターミナルは、演習中に閉じないでください。
- ブラウザの開発者ツールを開き、ConsoleとNetworkを確認しながら進めてください。
- データベースを使用する演習では、必要に応じて演習前の `employees.db` を複製しておいてください。
- 問題文にない機能は追加せず、指定された動作を一つずつ確認してください。

### この演習で使用するデータ

第3章と第4章では、SQLiteの `employee` テーブルを使用します。第1章と第2章も社員情報や人事業務を題材とし、4章を通して人事管理システムを段階的に作成します。

| 列名 | 内容 | 例 |
|---|---|---|
| `id` | 社員番号 | `1001` |
| `password` | パスワード | `password` |
| `name` | 氏名 | `山田太郎` |
| `salary` | 給与 | `230000` |
| `location_name` | 勤務地 | `東京` |
| `image_path` | 社員画像のパス | `/images/1001.png` |

> **注意:** パスワードは演習用の簡易データです。実際のシステムでは平文で保存しません。

## 目次

1. [演習1 JavaScriptのDOMプログラミング](#演習1-javascriptのdomプログラミング)
2. [演習2 非同期通信](#演習2-非同期通信)
3. [演習3 REST API](#演習3-rest-api)
4. [演習4 SPA開発](#演習4-spa開発)

---

# 演習1 JavaScriptのDOMプログラミング

## 演習の目標

- 関数宣言、関数式、アロー関数を使い分けられる
- 引数と戻り値を持つ関数を記述できる
- id、class、タグ名を使ってDOM要素を選択できる
- HTML属性と `addEventListener` を使ってイベント処理を実装できる
- `innerHTML`、`insertAdjacentHTML`、`classList` を使って画面を動的に変更できる

## 演習の概要

第1章で学習したJavaScriptの関数、DOM選択、イベント処理、動的レンダリングを、社員情報の表示や勤務状態の切り替えを題材に確認します。最後に「ユーザー操作をきっかけに社員情報の表示を更新する」一連の流れを説明できる状態を目指します。

## 予想所要時間

約60分

## 演習1.1 関数の定義と呼び出し

### 演習1.1.1 関数宣言と関数式

**参照テキスト**  
1.1.1. 関数の定義と呼び出し方法

**参照ファイル**  
`sample\Ex1-1\function_basic.html`

**演習ファイル**  
`exercise_question\Ex1-1\function_basic.html`

1. `showSystemName` 関数を関数宣言で定義してください。
2. 関数内で `document.write` を使用し、「人事管理システム」と表示してください。
3. 定義した `showSystemName` 関数を呼び出してください。
4. `showOperationGuide` 関数を関数式で定義してください。
5. 関数内で「社員メニューを選択してください」と表示してください。
6. 定義した `showOperationGuide` 関数を呼び出してください。

#### 動作確認

![演習1.1.1 動作確認](./images/1-1-1_function_basic.png)

- ブラウザに2種類のメッセージが表示されること
- Consoleにエラーが表示されていないこと
- 関数宣言と関数式の記述位置を入れ替えた場合の違いを説明できること

### 演習1.1.2 引数と戻り値を持つ関数

**参照テキスト**  
1.1.2. 引数と戻り値を持つ関数

**参照ファイル**  
`sample\Ex1-1\function_return.html`

**演習ファイル**  
`exercise_question\Ex1-1\function_return.html`

1. 月給と賞与を受け取る `calculateAnnualIncome` 関数を定義してください。
2. 「月給×12＋賞与」の計算結果を `return` で返してください。
3. 月給230,000円、賞与400,000円を渡し、戻り値を変数 `annualIncome` に代入してください。
4. 年収見込額を画面へ表示してください。

#### 動作確認

![演習1.1.2 動作確認](./images/1-1-2_function_return.png)

- ブラウザに「年収見込額：3160000円」と表示されること
- 月給または賞与を変更すると、表示される年収見込額も変わること

### 演習1.1.3 アロー関数

**参照テキスト**  
1.1.3. アロー関数(ラムダ式)

**参照ファイル**  
`sample\Ex1-1\function_arrow.html`

**演習ファイル**  
`exercise_question\Ex1-1\function_arrow.html`

1. 社員番号と氏名を受け取り、「1001：山田太郎」の形式で返す関数式を確認してください。
2. 同じ処理を行う `formatEmployee` をアロー関数で定義してください。
3. `formatEmployee(1001, '山田太郎')` の結果を画面に表示してください。

#### 動作確認

![演習1.1.3 動作確認](./images/1-1-3_function_arrow.png)

- ブラウザに「1001：山田太郎」と表示されること
- `function` を使う関数式とアロー関数の構文上の違いを説明できること

## 演習1.2 DOMの選択

**参照テキスト**  
1.2. DOM の選択

**参照ファイル**  
`sample\Ex1-2\dom_select.html`

**演習ファイル**  
`exercise_question\Ex1-2\dom_select.html`

1. idが `employeeName` の社員名要素を選択してください。
2. classが `work-location` の勤務地要素をCSSセレクターで選択してください。
3. classが `operation-button` のすべてのボタンを選択してください。
4. 既存の `console.log` と `forEach` を使い、選択した要素の文字列を確認してください。

#### 動作確認

![演習1.2 動作確認](./images/1-2_dom_select.png)

- Consoleに社員名、勤務地、各操作ボタンの文字列が表示されること
- 1件を選択するメソッドと複数件を選択するメソッドの戻り値の違いを説明できること

## 演習1.3 イベントハンドリング

### 演習1.3.1 HTML属性でイベントを割り当てる

**参照テキスト**  
1.3. イベントハンドリング

**参照ファイル**  
`sample\Ex1-3\event_listener1.html`

**演習ファイル**  
`exercise_question\Ex1-3\event_listener1.html`

1. [出勤する]ボタンにクリック時のイベント属性を追加してください。
2. クリック時に `showWorkStartMessage()` が呼び出されるようにしてください。
3. 関数内で「出勤を受け付けました」とアラート表示してください。

#### 動作確認

![演習1.3.1 動作確認](./images/1-3-1_event_listener1.png)

- [クリック]ボタンを押すとアラートが1回表示されること

### 演習1.3.2 addEventListenerでイベントを割り当てる

**参照テキスト**  
1.3.1. addEventListener

**参照ファイル**  
`sample\Ex1-3\event_listener2.html`

**演習ファイル**  
`exercise_question\Ex1-3\event_listener2.html`

1. [退勤する]ボタンにid `workEndBtn` を指定してください。
2. idを使ってボタンをDOMから選択し、変数 `btn` に代入してください。
3. `btn.addEventListener` を使ってclickイベントを登録してください。
4. イベント発生時に「退勤を受け付けました」とアラート表示してください。

#### 動作確認

![演習1.3.2 動作確認](./images/1-3-2_event_listener2.png)

- [クリック]ボタンを押すとアラートが1回表示されること
- HTML属性方式と `addEventListener` 方式の違いを説明できること

## 演習1.4 DOM操作とJavaScriptからのレンダリング

### 演習1.4.1 innerHTMLによる置き換え

**参照テキスト**  
1.4.1. innerHTML プロパティ

**参照ファイル**  
`sample\Ex1-4\innerHTML.html`

**演習ファイル**  
`exercise_question\Ex1-4\innerHTML.html`

1. idが `changeButton` の要素を選択し、変数 `btn` に代入してください。
2. ボタンのclickイベント内で、idが `content` の要素を選択してください。
3. `innerHTML` を使用し、「社員情報を読み込みました」という見出しと社員名を含むHTMLへ置き換えてください。

#### 動作確認

![演習1.4.1 動作確認 (前)](./images/1-4-1_innerHTML_before.png)
![演習1.4.1 動作確認 (後)](./images/1-4-1_innerHTML_after.png)

- ボタンを押す前は「ここが変更されます。」と表示されること
- ボタンを押すと、指定したHTMLへ置き換わること

### 演習1.4.2 insertAdjacentHTMLによる追加

**参照テキスト**  
1.4.2. insertAdjacentHTML メソッド

**参照ファイル**  
`sample\Ex1-4\insertAdjacentHTML.html`

**演習ファイル**  
`exercise_question\Ex1-4\insertAdjacentHTML.html`

1. 既存の社員一覧テーブル、[社員を追加]ボタン、社員番号を管理する変数の役割を確認してください。
2. ボタンのclickイベント内で、社員一覧の末尾に新しい社員行を追加してください。
3. 挿入位置には `beforeend` を指定してください。
4. 追加する行には社員番号、氏名、勤務地を表示してください。社員番号には `rowCount` を利用してください。
5. 行追加後に `rowCount` が1増えることを確認してください。

#### 動作確認

![演習1.4.2 動作確認](./images/1-4-2_insertAdjacentHTML.png)

- ボタンを押すたびに、既存の見出し行を消さずにデータ行が1行ずつ追加されること
- 社員番号が1001、1002、1003の順に増えること
- `innerHTML` による置き換えとの違いを説明できること

### 演習1.4.3 classListによるスタイル変更

**参照テキスト**  
1.4.3. classList によるスタイルクラスの動的適用

**参照ファイル**  
`sample\Ex1-4\class_list.html`

**演習ファイル**  
`exercise_question\Ex1-4\class_list.html`

1. 在席中を表すCSSクラス `.working` を完成させてください。
2. 勤務状態の表示要素にid `workStatus` と初期表示用classを指定してください。
3. [出勤]、[退勤]、[状態切替]に、それぞれ識別できるidを指定してください。
4. idが `workStatus` の要素を選択し、変数 `target` に代入してください。
5. [出勤]のclickイベントで `working` クラスを追加してください。
6. [退勤]のclickイベントで `working` クラスを削除してください。
7. [状態切替]のclickイベントで `working` クラスを付け外ししてください。

#### 動作確認

![演習1.4.3 動作確認](./images/1-4-3_class_list.png)

- [出勤]で在席中の表示になること
- [退勤]で離席中の表示へ戻ること
- [状態切替]を押すたびに表示が交互に切り替わること

---

# 演習2 非同期通信

## 演習の目標

- 非同期通信が必要な理由を説明できる
- Fetch APIを使ってGETリクエストを送信できる
- JSON形式のレスポンスをJavaScriptのオブジェクトとして利用できる
- Axiosを使ってURLパラメータを送信できる
- 非同期通信の成功時と失敗時の処理を記述できる

## 演習の概要

人事管理システムの「打刻時刻の取得」と「給与計算」を題材に、ブラウザからExpressのAPIへリクエストを送り、受信したJSONを画面へ表示します。Fetch APIとAxiosの両方を使用し、共通点と記述方法の違いを確認します。

## 予想所要時間

約45分

## 演習2.2 Fetch APIで出勤時刻を取得する

**参照テキスト**  
2.2. Fetch API と、サーバーからの応答

**参照ファイル**  
`sample\Ex2-2\fetch.html`

**演習ファイル**  
`exercise_question\Ex2-2\fetch.html`
- 使用するAPI: `exercise_question\Ex2-2\currenttime-api`

### APIの準備

1. ターミナルで `exercise_question/Ex2-2/currenttime-api` を開いてください。
2. 初回のみ `npm install` を実行してください。
3. `npm start` または `npm run dev` を実行してください。
4. ブラウザで `http://localhost:3002/currenttime` を開き、`time` プロパティを持つJSONが返ることを確認してください。

### フロントエンドの実装

1. clickイベント内で、時刻の表示先 `showTime` が選択されていることを確認してください。
2. `fetch` の送信先に `http://localhost:3002/currenttime` を指定してください。
3. 受信した `data` をConsoleへ出力してください。
4. Consoleでレスポンスのプロパティ名を確認してください。
5. `data` の時刻を「出勤時刻」として、変数 `result` が参照する要素へ表示してください。
6. 失敗時に `catch` が実行されることを確認してください。

#### 動作確認

![演習2.2 動作確認](./images/2-2_fetch.png)

- [出勤する]を押すとAPIから取得した現在時刻が出勤時刻として表示されること
- NetworkでGETリクエストと200レスポンスを確認できること
- APIサーバーを停止した状態ではConsoleにエラーが表示されること

## 演習2.3 Axiosで手取り見込額を取得する

**参照テキスト**  
2.3. axios ライブラリを用いたデータ送信

**参照ファイル**  
`sample\Ex2-2\axios.html`

**演習ファイル**  
`exercise_question\Ex2-2\axios.html`
- 使用するAPI: `exercise_question\Ex2-2\payroll-api`

### APIの準備

1. 給与計算APIのフォルダをターミナルで開いてください。
2. 初回のみ `npm install` を実行してください。
3. `npm start` を実行してください。
4. ブラウザで `http://localhost:3003/payroll/230000` を開き、`salary`、`tax`、`net_salary` を含むJSONが返ることを確認してください。

### フロントエンドの実装

1. 給与入力欄から値を取得してください。
2. AxiosのGETメソッドを使用し、`http://localhost:3003/payroll/${salary}` へリクエストを送信してください。
3. `response.data` をConsoleへ出力してください。
4. レスポンス内の給与、控除額、手取り見込額を画面へ表示してください。

#### 動作確認

![演習2.3 動作確認](./images/2-3_axios.png)

- 給与230,000円を入力すると、給与、控除額、手取り見込額が表示されること
- 別の給与額でもAPIの計算結果が表示されること
- `response` と `response.data` の違いを説明できること

## 演習2.4 Fetch APIとAxiosの比較

**参照テキスト**  
2.2. Fetch API と、サーバーからの応答／2.3. axios ライブラリを用いたデータ送信

**参照ファイル**  
`sample\Ex2-2\fetch.html`、`sample\Ex2-2\axios.html`

次の観点で、演習2.2と演習2.3のコードを比較してください。

- ライブラリの読み込みが必要か
- JSON変換を明示的に記述しているか
- レスポンス本体へどのようにアクセスするか
- エラー処理をどこに記述しているか

自分の言葉で、Fetch APIとAxiosの共通点を1つ、相違点を2つ記述してください。

---

# 演習3 REST API

## 演習の目標

- REST APIとHTTPメソッドの対応を説明できる
- ExpressからSQLiteの `employee` テーブルを操作できる
- GET、POST、DELETE、PUTを使って社員情報のCRUD処理を実装できる
- URLパラメータ、クエリパラメータ、リクエストボディを使い分けられる
- APIのレスポンスを使って社員一覧を再描画できる

## 演習の概要

人事管理システムを題材に、ブラウザ、Express、SQLiteを連携させます。社員一覧から始め、氏名検索、登録、削除、更新へ段階的に機能を追加します。

## 予想所要時間

約150分（参考演習を含む）

## 演習3.2 REST APIの環境構築

**参照テキスト**  
3.2.1. REST APIの環境構築

**参照ファイル**  
`sample\Ex3-2\index.html`、`sample\Ex3-2\api\server.js`

**演習ファイル**  
`exercise_question\Ex3-2\index.html`、`exercise_question\Ex3-2\api\server.js`

1. `employee` テーブルを持つSQLiteデータベースを準備してください。
2. `employee` テーブルに、冒頭のデータ構成に従って社員を3名以上登録してください。
3. APIプロジェクトで `npm install` を実行してください。
4. Express、CORS、JSON受信、SQLite接続を設定してください。
5. GET `/api/test` を作成し、APIサーバーを起動してください。

#### 動作確認

- `/api/test` へアクセスするとJSONが返ること
- SQLiteで `SELECT * FROM employee` を実行すると初期データが表示されること
- CORSと `express.json()` の役割を説明できること

## 演習3.3 社員の検索

### 演習3.3.1 社員一覧の表示

**参照テキスト**  
3.3.1. 初期画面実装(一覧表示)

**参照ファイル**  
`sample\Ex3-3\list.html`、`sample\Ex3-3\api\server.js`

**演習ファイル**  
`exercise_question\Ex3-3\list.html`、`exercise_question\Ex3-3\api\server.js`

#### フロントエンド

1. 社員一覧用のtableを作り、社員番号、氏名、給与、勤務地の見出しを配置してください。
2. `DOMContentLoaded` でGET `/api/employees` を呼び出してください。
3. 成功時に `response.data` を社員一覧表示関数へ渡してください。
4. `forEach` とテンプレートリテラルで社員を1名ずつ行に変換してください。
5. `insertAdjacentHTML` でtbodyへ行を追加してください。

#### API

1. GET `/api/employees` を定義してください。
2. `SELECT * FROM employee` を `db.all` で実行してください。
3. 検索結果の配列をJSON形式で返してください。

#### 動作確認

![演習3.3.1 動作確認](./images/3-3-1_list.png)

- 初期表示時に全社員が表示されること
- 社員番号、氏名、給与、勤務地が列ずれせず表示されること
- `password` は一覧に表示しないこと

### 演習3.3.2 氏名によるキーワード検索

**参照テキスト**  
3.3.2. キーワード検索機能実装

**参照ファイル**  
`sample\Ex3-3\search_keyword.html`、`sample\Ex3-3\api\server.js`

**演習ファイル**  
`exercise_question\Ex3-3\search_keyword.html`、`exercise_question\Ex3-3\api\server.js`

#### フロントエンド

1. 氏名入力欄と[検索]、[一覧表示]ボタンを作成してください。
2. [検索]では `/api/employees?keyword={入力値}` を呼び出してください。
3. [一覧表示]では、キーワードなしで同じAPIを呼び出してください。
4. どちらのレスポンスも共通の社員一覧表示関数へ渡してください。

#### API

1. `req.query.keyword` を取得してください。
2. キーワードがない場合は全件検索を実行してください。
3. キーワードがある場合は `name LIKE ?` による部分一致検索へ切り替えてください。
4. プレースホルダーに渡す値の前後へ `%` を付けてください。

#### 動作確認

![演習3.3.2 動作確認](./images/3-3-2_search_keyword.png)

- 「山田」など氏名の一部で検索できること
- [一覧表示]を押すと全社員へ戻ること
- SQL文字列へ入力値を直接連結していないこと

## 演習3.4 新規社員の登録

**参照テキスト**  
3.4. 新規データ登録

**参照ファイル**  
`sample\Ex3-4\add_data.html`、`sample\Ex3-4\api\server.js`

**演習ファイル**  
`exercise_question\Ex3-4\add_data.html`、`exercise_question\Ex3-4\api\server.js`

### フロントエンド

1. パスワード、氏名、給与、勤務地、画像パスの入力欄を作成してください。
2. パスワード、氏名、給与のいずれかが未入力なら、エラーを表示して処理を終了してください。
3. AxiosのPOSTメソッドで `/api/employees` を呼び出してください。
4. 5項目をリクエストボディへ設定してください。
5. 登録成功後、社員一覧を再取得してください。

### API

1. POST `/api/employees` を定義してください。
2. `req.body` から5項目を取得してください。
3. 必須項目が不足している場合は400 Bad Requestを返してください。
4. 次のSQLをプレースホルダー付きで実行してください。

```sql
INSERT INTO employee (password, name, salary, location_name, image_path)
VALUES (?, ?, ?, ?, ?)
```

5. 登録後に社員一覧を取得し、最新の一覧をJSON形式で返してください。

#### 動作確認

![演習3.4 動作確認](./images/3-4_add_data.png)

- 正しい値で新しい社員が登録されること
- 未入力では登録されず、エラーが表示されること
- 登録後の一覧に新しい社員が表示されること

## 演習3.5 社員情報の削除

**参照テキスト**  
3.5. データの削除機能の実装

**参照ファイル**  
`sample\Ex3-5\delete.html`、`sample\Ex3-5\api\server.js`

**演習ファイル**  
`exercise_question\Ex3-5\delete.html`、`exercise_question\Ex3-5\api\server.js`

### フロントエンド

1. 各社員に[削除]ボタンを表示してください。
2. ボタンから削除対象の社員番号を削除関数へ渡してください。
3. 確認ダイアログで承認された場合だけDELETE `/api/employees/{id}` を呼び出してください。
4. 削除成功後に社員一覧を再取得してください。

### API

1. DELETE `/api/employees/:id` を定義してください。
2. `req.params.id` から社員番号を取得してください。
3. `DELETE FROM employee WHERE id = ?` を実行してください。
4. 削除後に社員一覧を取得し、最新の一覧をJSON形式で返してください。

#### 動作確認

![演習3.5 動作確認 (確認ダイアログ)](./images/3-5_delete_dialog.png)
![演習3.5 動作確認 (削除結果)](./images/3-5_delete_result.png)

- 選択した社員だけが削除されること
- キャンセルした場合は削除されないこと
- 削除後に返された社員一覧を再描画できること

## 演習3.6 【参考】社員情報の更新

**参照テキスト**  
3.6. 【参考】更新機能の実装

**参照ファイル**  
`sample\Ex3-6\update.html`、`sample\Ex3-6\api\server.js`

**演習ファイル**  
`exercise_question\Ex3-6\update.html`、`exercise_question\Ex3-6\api\server.js`

### フロントエンド

1. [更新]ボタンから社員番号を更新フォーム設定関数へ渡してください。
2. 対象社員のパスワード以外の現在値をフォームへ表示してください。
3. 更新時はパスワードを含む5項目を取得してください。
4. PUT `/api/employees/{id}` を呼び出してください。
5. 更新成功後に社員一覧を再取得してください。

### API

1. PUT `/api/employees/:id` を定義してください。
2. URLから社員番号、bodyから5項目を取得してください。
3. 次のSQLをプレースホルダー付きで実行してください。

```sql
UPDATE employee
SET password = ?, name = ?, salary = ?, location_name = ?, image_path = ?
WHERE id = ?
```

4. 更新後に社員一覧を取得し、最新の一覧をJSON形式で返してください。

#### 動作確認

![演習3.6 動作確認](./images/3-6_update.png)

- 選択した社員の現在値がフォームへ表示されること
- 更新後に一覧とデータベースへ変更が反映されること
- 別の社員が誤って更新されないこと

---

# 演習4 SPA開発

## 演習の目標

- SPAと従来型Webページの違いを説明できる
- Bootstrap Modalへ社員情報を表示できる
- 画面を再読み込みせずに詳細、登録、更新、削除を操作できる
- Navigation APIでURLと表示内容を連動させられる
- JavaScriptモジュールを使って画面表示処理を分割できる

## 演習の概要

第3章の人事管理機能をSPAへ発展させます。共通のヘッダー、サイドメニュー、フッターを残したまま、社員一覧、社員詳細、新規登録などのメイン画面だけを切り替えます。

## 予想所要時間

約120分（参考演習を含む）

## 演習4.2 Modalを使った画面表示

### 演習4.2.1 社員詳細をModalに表示する

**参照テキスト**  
4.2.1. 商品詳細を Modal に表示する

**参照ファイル**  
`sample\Ex4-2-1\index.html`、`sample\Ex4-2-1\api\server.js`

**演習ファイル**  
`exercise_question\Ex4-2-1\index.html`、`exercise_question\Ex4-2-1\api\server.js`

> 参照テキストは商品情報を扱っていますが、本演習では社員情報へ置き換えます。使用する仕組みは、APIで1件を取得してModalへ表示する点で同じです。

1. 社員詳細Modalへid `detailModal` を指定してください。
2. 社員番号、氏名、給与、勤務地、社員画像の表示先にidを指定してください。
3. 一覧の氏名をリンクにし、クリック時に社員番号を詳細表示関数へ渡してください。
4. GET `/api/employees/{id}` を呼び出してください。
5. 取得した社員情報をModalへ表示してください。
6. `image_path` がある場合だけ社員画像を表示してください。
7. BootstrapのModalインスタンスを作成し、表示してください。

#### API

1. GET `/api/employees/:id` を定義してください。
2. `SELECT * FROM employee WHERE id = ?` を `db.get` で実行してください。
3. 対象がない場合は404、見つかった場合は社員1名を返してください。

#### 動作確認

- 氏名をクリックしてもページ全体が再読み込みされないこと
- クリックした社員とModalの内容が一致すること
- パスワードがModalへ表示されないこと

### 演習4.2.2 【参考】社員登録をModal化する

**参照テキスト**  
4.2.2. 【参考】登録機能の Modal 化

**参照ファイル**  
`sample\Ex4-2-2\index.html`、`sample\Ex4-2-2\api\server.js`

**演習ファイル**  
`exercise_question\Ex4-2-2\index.html`、`exercise_question\Ex4-2-2\api\server.js`

1. [新規社員登録]ボタンと登録Modalを対応させてください。
2. Modal内に5項目の入力欄と[登録]ボタンを配置してください。
3. POST `/api/employees` で社員情報を送信してください。
4. 登録成功後、社員一覧を再取得し、Modalを閉じてください。
5. 入力欄とエラーメッセージを初期状態へ戻してください。

#### 動作確認

- 画面遷移せずに社員を登録できること
- 未入力時はModalを閉じず、エラーを表示すること

### 演習4.2.3 【参考】更新・削除をModal化する

**参照テキスト**  
4.2.3. 【参考】更新・削除機能の Modal 化

**参照ファイル**  
`sample\Ex4-2-3\index.html`、`sample\Ex4-2-3\api\server.js`

**演習ファイル**  
`exercise_question\Ex4-2-3\index.html`、`exercise_question\Ex4-2-3\api\server.js`

1. 社員詳細Modalへ[編集]と[削除]を配置してください。
2. 編集Modalへ現在の社員情報を設定してください。
3. PUT `/api/employees/{id}` で更新してください。
4. DELETE `/api/employees/{id}` で削除してください。
5. 成功後は対象Modalを閉じ、社員一覧を再取得してください。

#### 動作確認

- 編集Modalに選択社員の現在値が表示されること
- 更新・削除後に一覧が正しく更新されること

## 演習4.3 Navigation APIを活用したSPA

### 演習4.3.1 ルートと画面を対応させる

**参照テキスト**  
4.3. Navigation APIを活用した本格 SPA（擬似遷移）

**参照ファイル**  
`sample\Ex4-3\index.html`

**演習ファイル**  
`exercise_question\Ex4-3\index.html`

次のURLと表示内容を `showPage(path)` で対応させてください。

| URL | 表示画面 | 表示関数 |
|---|---|---|
| `/` | ホーム | `showHome` |
| `/employees` | 社員一覧 | `showEmployeeList` |
| `/employees/new` | 新規社員登録 | `showEmployeeRegister` |
| `/employees/{id}` | 社員詳細 | `showEmployeeDetail` |

1. `DOMContentLoaded` で現在のパスに対応する画面を表示してください。
2. `navigation` のnavigateイベントを受け取ってください。
3. 同一オリジンでintercept可能な移動だけを処理してください。
4. `event.intercept` 内で `showPage` を呼び出してください。
5. 社員詳細のURLから正規表現で社員番号を取り出してください。

#### 動作確認

- URLが変わっても共通レイアウトが残ること
- [戻る]と[進む]で画面が正しく切り替わること
- 社員一覧から詳細へ再読み込みなしで移動できること

### 演習4.3.2 404画面を作る

**参照テキスト**  
4.3. Navigation APIを活用した本格 SPA（擬似遷移）

**参照ファイル**  
`sample\Ex4-3\index.html`

**演習ファイル**  
`exercise_question\Ex4-3\index.html`

1. どのルートにも一致しない場合は「ページが見つかりません」と表示してください。
2. 入力されたパスを表示してください。
3. ホームと社員一覧へ戻るリンクを配置してください。

### 演習4.3.3 新しいルートを追加する

**参照テキスト**  
4.3. Navigation APIを活用した本格 SPA（擬似遷移）

**参照ファイル**  
`sample\Ex4-3\index.html`

**演習ファイル**  
`exercise_question\Ex4-3\index.html`

次の仕様で「このシステムについて」画面を追加してください。

- URL: `/about`
- メニュー名: このシステムについて
- 表示内容: システム名と使用技術を3つ以上
- 表示関数名: `showAbout`

## 演習4.4 【参考】コンポーネント化

### 演習4.4.1 モジュールへ分割する

**参照テキスト**  
4.4. 【参考】コンポーネント化

**参照ファイル**  
`sample\Ex4-4\index.html`、`sample\Ex4-4\js\app.js`、`sample\Ex4-4\js\components`

**演習ファイル**  
`exercise_question\Ex4-4\index.html`、`exercise_question\Ex4-4\js`

次の構成を参考に、画面表示処理を分割してください。

```text
js/
├─ app.js
└─ components/
   ├─ home.js
   ├─ employee-list.js
   ├─ employee-detail.js
   ├─ employee-register.js
   ├─ employee-update-modal.js
   └─ employee-delete-modal.js
```

1. `index.html` から `app.js` を `type="module"` で読み込んでください。
2. 各表示関数を対応ファイルから `export` してください。
3. `app.js` で必要な関数を `import` してください。
4. `app.js` には画面遷移とルート判定の責務を残してください。

### 演習4.4.2 分割後の構成を確認する

**参照テキスト**  
4.4. 【参考】コンポーネント化

**参照ファイル**  
`sample\Ex4-4\js\app.js`、`sample\Ex4-4\js\components`

**演習ファイル**  
`exercise_question\Ex4-4\js`

| URLまたは操作 | 呼び出される関数 | 定義ファイル |
|---|---|---|
| `/` |  |  |
| `/employees` |  |  |
| `/employees/{id}` |  |  |
| `/employees/new` |  |  |
| 編集Modalを開く |  |  |
| 削除Modalを開く |  |  |

1. `app.js` に残された責務を説明してください。
2. 社員一覧の表示を変更する場合の修正ファイルを答えてください。
3. 削除確認の表示を変更する場合の修正ファイルを答えてください。
4. ファイル分割の利点を2つ、注意点を1つ記述してください。

## 演習4.5 総合確認

**参照テキスト**  
第4章 章のまとめ

**参照ファイル**  
`sample\Ex4-3\index.html`、`sample\Ex4-4`

社員一覧から社員詳細を表示するまでの流れを、次の語句をすべて使って説明してください。

`イベント` / `DOM` / `Axios` / `GET` / `Express` / `employee` / `SQLite` / `JSON` / `レンダリング`

---

## 演習完了チェック

- [ ] 第1章のすべてのHTMLで、Consoleエラーが発生していない
- [ ] Fetch APIとAxiosの両方でAPIレスポンスを画面へ表示できた
- [ ] 社員の一覧、検索、登録、削除を一連の操作として実行できた
- [ ] 参考演習の更新処理を実行できた
- [ ] Modalで社員詳細を表示できた
- [ ] Navigation APIで再読み込みを伴わない画面切り替えを確認できた
- [ ] URL、表示関数、コンポーネントファイルの対応を説明できた
- [ ] ブラウザ、API、データベースの役割を自分の言葉で説明できた
