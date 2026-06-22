DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  salary INTEGER NOT NULL,
  location_name TEXT NOT NULL,
  image_path TEXT
);
INSERT INTO employee VALUES
  ('E001', 'pass001', '山田 太郎', 320000, '東京本社', 'images/e001.png'),
  ('E002', 'pass002', '佐藤 花子', 295000, '大阪支社', 'images/e002.png'),
  ('E003', 'pass003', '鈴木 一郎', 350000, '名古屋支社', 'images/e003.png');
