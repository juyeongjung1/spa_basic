const express = require('express');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

app.get('/currenttime', (req, res) => {
  const now = new Date();

  res.json({
    time: now.toLocaleString('ja-JP')
  });
});

app.listen(port, () => {
  console.log(`Current time API is running at http://localhost:${port}`);
});
