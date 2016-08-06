import path from 'path';
import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const indexFilePath = path.resolve(__dirname, './index.html');
  res.sendFile(indexFilePath);
});

app.listen(8080);
