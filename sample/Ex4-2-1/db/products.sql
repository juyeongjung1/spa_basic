-- SQLiteは軽量な組み込み型データベース管理システムです
-- ログインもパスワードも不要で、dbファイルを作成するだけで使用できます
-- SQLiteでは、整数型：INTEGER、文字列型：TEXTが使われます
-- 自動採番にはAUTOINCREMENTを使用します

CREATE TABLE products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT    NOT NULL,
  price    INTEGER NOT NULL,
  category TEXT    NOT NULL
);

INSERT INTO products (name, price, category) VALUES
('ノートパソコン', 120000, '電子機器'),
('スマートフォン', 90000, '電子機器'),
('オフィスチェア', 25000, '家具'),
('ボールペンセット', 800, '文房具');
