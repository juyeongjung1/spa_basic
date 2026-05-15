DROP TABLE employee; -- 一旦削除して作り直す場合

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    salary INTEGER NOT NULL,
    location_name TEXT,
    image_path TEXT
);

INSERT INTO employees (id, password, name, salary, location_name, image_path) VALUES
(1001, 'password', '山田太郎', 230000, '東京', '/images/1001.jpg'),
(1002, 'password', '鈴木一郎', 230000, '大阪', '/images/1002.jpg'),
(1003, 'password', '田中花子', 300000, '福岡', '/images/1003.jpg'),
(1004, 'password', '山田次郎', 400000, '札幌', '/images/1004.jpg'),
(1005, 'password', '高橋美智子', 500000, '沖縄', '/images/1005.jpg'),
(1006, 'password', '平恵', 270000, '沖縄', '/images/1006.jpg'),
(1007, 'password', '佐々木舞', 330000, '札幌', '/images/1007.jpg'),
(1008, 'password', '中村翔', 350000, '東京', '/images/1008.jpg');