module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
    },
    globals: {
        window: true,
        Promise: true,
    },
    rules: {
        camelcase: 'error',
        semi: ['error', 'always'], //точки с запятой
        'eol-last': ['error', 'always'], // Пустая строка в конце файла
        quotes: ['error', 'single'], // Одинарные кавычки
        'no-console': ['error', { allow: ['error', 'info'] }], // Запрет использования console.log
        'no-unused-vars': 'error', // Запрет неиспользуемых переменных
        'no-undef': 'error', // Запрет использования необъявленных переменных
        'no-multiple-empty-lines': ['error', { max: 1 }], // Запрет множественных пустых строк
        'no-trailing-spaces': 'error', // Запрет завершающих пробелов
        'comma-dangle': ['error', 'always-multiline'], // Запятая в конце массивов и объектов
        //   'space-before-function-paren': ['error', 'never'], // Пробел перед скобками функции
        'no-var': 'error', // Запрет использования var
        'prefer-const': 'error', // Предпочтение const
        //   'no-tabs': 'error', // Запрет использования табуляции
        'newline-before-return': 'error', // Перенос строки перед return
        'no-irregular-whitespace': 'error', // Запрет неправильных пробелов
        'no-multi-spaces': 'error', // Запрет множественных пробелов
        'react/react-in-jsx-scope': 'off',
    },
};
