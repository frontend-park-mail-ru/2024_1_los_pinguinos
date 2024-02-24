const express = require('express');
const path = require('path');

const app = express();

// Указываем путь к статическим файлам (HTML, CSS, изображения и т. д.)
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../dist')));

// Обработка запросов на корневой URL
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '/dist/index.html'));
});

// Порт, на котором будет работать сервер
const port = process.env.PORT || 3000;

// Запускаем сервер
app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
