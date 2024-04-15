import template404 from './404.hbs';
/**
 * 404 page class
 * @class
 */
class error404 {
    constructor(offline=false){
        this.offline = offline;
    }
    /**
     * Returns 404 page template
     * @function
     * @returns {Promise<string>}  - template html string
     */
    async render() {
        const templateContext404 = {
            errorMsg: 'Такой страницы нет 😔',
            errorCode: 404,
        };
        const templateContextOffline = {
            errorMsg: 'Для данного действия нужно подключение к сети 😔',
            errorCode: 'Ой...',
        };

        return template404(this.offline ? templateContextOffline : templateContext404);
    }
}

export default error404;
