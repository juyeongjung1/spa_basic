DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  salary INTEGER NOT NULL,
  location_name TEXT,
  image_path TEXT
);

INSERT INTO
  employee (
    id,
    password,
    name,
    salary,
    location_name,
    image_path
  )
VALUES
  (1001, 'password', '山田太郎', 230000, '東京', '../images/1001.png'),
  (1002, 'password', '鈴木一郎', 260000, '大阪', '../images/1002.png'),
  (1003, 'password', '田中花子', 300000, '福岡', '../images/1003.png');
