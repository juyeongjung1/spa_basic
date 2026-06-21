DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (name, price, category) VALUES
('ノートパソコン', 120000, '電子機器'),
('スマートフォン', 90000, '電子機器'),
('オフィスチェア', 25000, '家具'),
('ボールペンセット', 800, '文房具');
