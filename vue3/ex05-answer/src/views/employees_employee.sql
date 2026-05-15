-- database: ../../../ex05-django-api/db.sqlite3

SELECT * FROM django_session;

DROP TABLE IF EXISTS employees_employee;
CREATE TABLE employees_employee (
id INTEGER PRIMARY KEY AUTOINCREMENT,
password TEXT NOT NULL,
name TEXT NOT NULL,
salary INTEGER NOT NULL,
location_name TEXT,
image_path TEXT
);


INSERT INTO employees_employee (id, password, name, salary, location_name, image_path) VALUES
(1001, 'password', '山田太郎', 230000, '東京', '/images/1001.png'),
(1002, 'password', '鈴木一郎', 230000, '大阪', '/images/1002.png'),
(1003, 'password', '田中花子', 300000, '福岡', '/images/1003.png'),
(1004, 'password', '山田次郎', 400000, '札幌', '/images/1004.png'),
(1005, 'password', '高橋美智子', 500000, '沖縄', '/images/1005.png'),
(1006, 'password', '平恵', 270000, '沖縄', '/images/1006.png'),
(1007, 'password', '佐々木舞', 330000, '札幌', '/images/1007.png'),
(1008, 'password', '中村翔', 350000, '東京', '/images/1008.png');
