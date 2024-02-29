import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!.*\.(css|js|img|png|webp|webm|svg)).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const port = 3000;

app.listen(port, () => {
    console.info(`Сервер запущен на порту ${port}`);
});