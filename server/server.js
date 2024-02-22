const express = require('express');
const path = require('path');

const app = express();

// Указываем путь к статическим файлам (HTML, CSS, изображения и т. д.)
app.use(express.static(path.join(__dirname, '../')));

// Обработка запросов на корневой URL
app.get('*', (req, res) => {
    console.log()
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

// Порт, на котором будет работать сервер
const port = process.env.PORT || 3000;

// Запускаем сервер
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});