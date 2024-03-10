import template404 from './404.hbs';

class error404 {
    async render() {
        return template404();
    }
}

export default error404;
