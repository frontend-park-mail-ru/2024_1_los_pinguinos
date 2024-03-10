import template404 from './404.hbs';
/**
 * 404 page class
 * @author roflanpotsan
 * @class
 */
class error404 {
    /**
     * Returns 404 page template
     * @author roflanpotsan
     * @function
     * @returns {Promise<string>}  - template html string
     */
    async render() {
        return template404();
    }
}

export default error404;
