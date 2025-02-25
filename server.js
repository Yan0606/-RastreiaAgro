const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://172.16.100.98:${port}`);
});
